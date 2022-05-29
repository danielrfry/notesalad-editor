import _ from 'lodash';
import React from 'react';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import { DropDownItem } from '../DropDownList/DropDownList';
import TitledGroup from '../TitledGroup/TitledGroup';
import ParamDropDownList from '../DropDownList/ParamDropDownList';
import ParamKnob from '../Knob/ParamKnob';
import patchSchemaManager from '../../services/PatchSchemaManager';
import { NUM_LFOS } from '../../services/Universal/UniversalPatchSchema';

const paramMapSources = [
    { srcID: 255, text: 'None' },
    ..._.range(0, NUM_LFOS).map(lfo => ({
        srcID: lfo + 128,
        text: `LFO #${lfo + 1}`,
    })),
    ..._.range(0, 128).map(cc => ({
        srcID: cc,
        text: `CC #${cc}`,
    })),
];

const getParamMapDestinations = _.memoize(mode =>
    patchSchemaManager.schemas[mode].params.map(value => (
        <DropDownItem key={value.id} value={value.id}>
            {value.shortDesc}
        </DropDownItem>
    ))
);

const ParamMapEditor = ({ mapNo, mode }) => {
    const pathBase = `${mode}.paramMaps[${mapNo}]`;
    return (
        <>
            <ColumnTitle>MAP {mapNo + 1}</ColumnTitle>
            <TitledGroup title="SOURCE">
                <ParamDropDownList path={`${pathBase}.src`}>
                    {paramMapSources.map(item => (
                        <DropDownItem key={item.srcID} value={item.srcID}>
                            {item.text}
                        </DropDownItem>
                    ))}
                </ParamDropDownList>
            </TitledGroup>
            <TitledGroup title="DESTINATION">
                <ParamDropDownList path={`${pathBase}.dest`}>
                    {getParamMapDestinations(mode)}
                </ParamDropDownList>
            </TitledGroup>
            <TitledGroup title="AMOUNT">
                <ParamKnob path={`${pathBase}.adjustAmount`} />
            </TitledGroup>
        </>
    );
};

export default ParamMapEditor;
