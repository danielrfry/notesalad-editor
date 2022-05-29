import _ from 'lodash';

export default class PatchSchema {
    params = [];
    paramsByID = {};
    paramsByPath = {};

    _addParams(paramsJSON, modifiers = {}) {
        for (const paramJSON of paramsJSON) {
            this.params.push(paramJSON);
            this.paramsByID[paramJSON.id] = paramJSON;
            _.set(this.paramsByPath, paramJSON.path, paramJSON);
        }
        _.merge(this.paramsByPath, modifiers);
    }

    getParamInfo(path, patchState) {
        const paramInfo = _.get(this.paramsByPath, path);
        if (paramInfo.dynamicProps) {
            return {
                ...paramInfo,
                ...paramInfo.dynamicProps(this, patchState),
            };
        } else {
            return paramInfo;
        }
    }

    constrainPatch(patch) {}
}
