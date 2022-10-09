import _ from 'lodash';
import React from 'react';
import ColumnsLayout from '../ColumnsLayout/ColumnsLayout';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import { DropDownItem } from '../DropDownList/DropDownList';
import ParamDropDownList from '../DropDownList/ParamDropDownList';
import ParamKnob from '../Knob/ParamKnob';
import LFOEditor from '../LFOEditor/LFOEditor';
import ParamMapEditor from '../ParamMapEditor/ParamMapEditor';
import TitledGroup from '../TitledGroup/TitledGroup';
import {
    NUM_LFOS,
    NUM_PARAM_MAPS,
} from '../../services/Universal/UniversalPatchSchema';

const GenericParamsEditor = ({ mode }) => (
    <ColumnsLayout stretchV stretchH>
        <div>
            <ColumnTitle>NOTE</ColumnTitle>
            <div>
                <TitledGroup title="MODE">
                    <ParamDropDownList
                        path={`${mode}.polyMode`}
                        class="drop-down-list"
                    >
                        <DropDownItem value={0}>POLY</DropDownItem>
                        <DropDownItem value={1}>MONO</DropDownItem>
                        <DropDownItem value={2}>MONO+</DropDownItem>
                        <DropDownItem value={3}>LEGATO</DropDownItem>
                        <DropDownItem value={4}>LEGATO+</DropDownItem>
                    </ParamDropDownList>
                </TitledGroup>
                <TitledGroup title="GLIDE (ms)">
                    <ParamKnob path={`${mode}.glideDurationMS`} />
                </TitledGroup>
                <TitledGroup title="PITCH OFFSET">
                    <ParamKnob path={`${mode}.pitchOffset`} />
                </TitledGroup>
                <TitledGroup title="VELOCITY DEPTH">
                    <ParamKnob path={`${mode}.velocityDepth`} />
                </TitledGroup>
            </div>
        </div>
        {_.range(0, NUM_PARAM_MAPS).map(mapNo => (
            <div key={mapNo} style={{ marginLeft: '30px' }}>
                <ParamMapEditor mode={mode} mapNo={mapNo} />
            </div>
        ))}
        {_.range(0, NUM_LFOS).map(lfoNo => (
            <div key={lfoNo} style={{ marginLeft: '30px' }}>
                <LFOEditor mode={mode} lfoNo={lfoNo} />
            </div>
        ))}
    </ColumnsLayout>
);

export default GenericParamsEditor;
