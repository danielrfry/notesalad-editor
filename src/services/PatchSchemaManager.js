import _ from 'lodash';
import { Modes } from '../types';
import OPLPatchSchema from './OPL/OPLPatchSchema';
import OPMPatchSchema from './OPM/OPMPatchSchema';
import SD1PatchSchema from './SD1/SD1PatchSchema';

class PatchSchemaManager {
    schemas = {};

    constructor() {
        this.addSchema(Modes.OPL, new OPLPatchSchema());
        this.addSchema(Modes.OPM, new OPMPatchSchema());
        this.addSchema(Modes.SD1, new SD1PatchSchema());
    }

    addSchema(mode, schema) {
        this.schemas[mode] = schema;
    }

    getSchema(path) {
        const modeSeparator = path.indexOf('.');
        const mode = path.substr(0, modeSeparator);
        const subPath = path.substr(modeSeparator + 1);
        return { mode, schema: this.schemas[mode], subPath };
    }

    getParamInfo(path, patchState) {
        const { mode, schema, subPath } = this.getSchema(path);
        if (schema) {
            return schema.getParamInfo(subPath, patchState[mode]);
        } else {
            return undefined;
        }
    }

    getParamValue(path, patchState) {
        return _.get(patchState, path);
    }

    setParamValue(path, patchState, value) {
        _.set(patchState, path, Math.round(value));
        const { mode, schema } = this.getSchema(path);
        schema.constrainPatch(patchState[mode]);
    }

    setParamValueFromCC(path, patchState, ccValue) {
        const paramInfo = this.getParamInfo(path, patchState);
        const [min, max] = paramInfo.range;
        const newValue = Math.floor((ccValue / 127) * (max - min)) + min;
        this.setParamValue(path, patchState, newValue);
    }

    createPatch(mode, initialValues = {}) {
        const schema = this.schemas[mode];
        const patch = {};
        for (const param of schema.params) {
            const value = _.get(initialValues, param.path, param.default);
            _.set(patch, param.path, value);
        }
        schema.constrainPatch(patch);
        return patch;
    }

    constrainPatches(patchState) {
        for (const mode in this.schemas) {
            this.schemas[mode].constrainPatch(patchState[mode]);
        }
    }
}

const patchSchemaManager = new PatchSchemaManager();

export default patchSchemaManager;
