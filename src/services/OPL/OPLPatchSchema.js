import _ from 'lodash';
import UniversalPatchSchema from '../Universal/UniversalPatchSchema';
import { PARAMS_OPL } from 'notesalad';

const formatMult = mult => {
    if (mult <= 0) {
        return '×½';
    } else if (mult >= 0x01 && mult <= 0x0a) {
        return `×${mult}`;
    } else if (mult === 0xb) {
        return '×10';
    } else if (mult >= 0x0c && mult <= 0x0d) {
        return '×12';
    } else {
        return '×15';
    }
};

const modifiers = {
    operators: _.times(4, _ => ({
        mult: {
            formatter: formatMult,
        },
    })),
};

export default class OPLPatchSchema extends UniversalPatchSchema {
    constructor() {
        super();
        this._addParams(PARAMS_OPL, modifiers);
    }

    constrainPatch = patch => {
        if (!patch.is4Op && patch.conn > 1) {
            patch.conn = 0;
        }
    };
}
