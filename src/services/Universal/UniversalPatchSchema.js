import _ from 'lodash';
import { PARAMS_UNIVERSAL } from 'notesalad';
import PatchSchema from '../PatchSchema';

export const NUM_PARAM_MAPS = 4;
export const NUM_LFOS = 2;

const formatPitchOffset = value => {
    const msb = (value >> 7) & 0x7f;
    const lsb = value & 0x7f;
    const floatValue = msb - 64 + lsb / 128;
    const sign = floatValue > 0 ? '+' : '';
    return `${sign}${floatValue.toFixed(2)}`;
};

const formatAdjustAmount = value => {
    return `${value > 8192 ? '+' : ''}${value - 8192}`;
};

const getAdjustAmountDynamicProps = paramMapIndex => (schema, state) => {
    const destParamID = state.paramMaps[paramMapIndex].dest;
    const destParam = schema.paramsByID[destParamID];
    if (destParam) {
        const [minValue, maxValue] = destParam.range;
        const span = maxValue - minValue;
        const range = [Math.max(8192 - span, 0), Math.min(8192 + span, 16383)];
        const dynamicProps = { range };
        if (destParam.diffFormatter) {
            dynamicProps.formatter = destParam.diffFormatter;
        }
        return dynamicProps;
    } else {
        return undefined;
    }
};

const modifiers = {
    pitchOffset: {
        formatter: formatPitchOffset,
        diffFormatter: formatPitchOffset,
    },
    paramMaps: _.times(NUM_PARAM_MAPS, paramMapIndex => ({
        adjustAmount: {
            dynamicProps: getAdjustAmountDynamicProps(paramMapIndex),
            formatter: formatAdjustAmount,
        },
    })),
};

export default class UniversalPatchSchema extends PatchSchema {
    constructor() {
        super();
        this._addParams(PARAMS_UNIVERSAL, modifiers);
    }
}
