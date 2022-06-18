import UniversalPatchSchema from '../Universal/UniversalPatchSchema';
import _ from 'lodash';
import { PARAMS_OPM } from '@danielrfry/notesalad';

const formatMul = mul => {
    if (mul <= 0) {
        return '×½';
    } else {
        return `×${mul}`;
    }
};

const modifiers = {
    operators: _.times(4, _ => ({
        mul: {
            formatter: formatMul,
        },
    })),
};

export default class OPMPatchSchema extends UniversalPatchSchema {
    constructor() {
        super();
        this._addParams(PARAMS_OPM, modifiers);
    }
}
