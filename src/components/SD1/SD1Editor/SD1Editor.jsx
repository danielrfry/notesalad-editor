import React from 'react';
import { Modes } from '../../../types';
import GenericParamsEditor from '../../GenericParamsEditor/GenericParamsEditor';
import PageControl from '../../PageControl/PageControl';
import SD1ParamsEditor from '../SD1ParamsEditor/SD1ParamsEditor';

const SD1Editor = ({ midi, enabled }) => (
    <PageControl>
        <SD1ParamsEditor midi={midi} enabled={enabled} />
        <GenericParamsEditor mode={Modes.SD1} />
    </PageControl>
);

export default SD1Editor;
