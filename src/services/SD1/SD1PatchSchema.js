import _ from 'lodash';
import UniversalPatchSchema from '../Universal/UniversalPatchSchema';
import { PARAMS_SD1 } from '@danielrfry/notesalad';

const formatMulti = multi => {
    if (multi <= 0) {
        return '×½';
    } else if (multi >= 0x01 && multi <= 0x0a) {
        return `×${multi}`;
    } else if (multi === 0xb) {
        return '×10';
    } else if (multi >= 0x0c && multi <= 0x0d) {
        return '×12';
    } else {
        return '×15';
    }
};

const modifiers = {
    operators: _.times(4, _ => ({
        multi: {
            formatter: formatMulti,
        },
    })),
};

export const isSD1Patch4Op = patch => patch.alg > 1;

export default class SD1PatchSchema extends UniversalPatchSchema {
    constructor() {
        super();
        this._addParams(PARAMS_SD1, modifiers);
    }
}
