import _ from 'lodash';
import React from 'react';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import { DropDownItem } from '../DropDownList/DropDownList';
import TitledGroup from '../TitledGroup/TitledGroup';
import ParamDropDownList from '../DropDownList/ParamDropDownList';
import ParamKnob from '../Knob/ParamKnob';
import patchSchemaManager from '../../services/PatchSchemaManager';
import { NUM_LFOS } from '../../services/Universal/UniversalPatchSchema';
import ColumnsLayout from '../ColumnsLayout/ColumnsLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import ParamButton from '../Button/ParamButton';

import './ParamMapEditor.css';

const paramMapSources = [
    { srcID: 255, text: 'None' },
    { srcID: 192, text: 'Velocity' },
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
                <ColumnsLayout stretchH stretchV>
                    <ParamDropDownList path={`${pathBase}.src`}>
                        {paramMapSources.map(item => (
                            <DropDownItem key={item.srcID} value={item.srcID}>
                                {item.text}
                            </DropDownItem>
                        ))}
                    </ParamDropDownList>
                    <ParamButton
                        secondary
                        hover
                        path={`${pathBase}.invertSrc`}
                        toggle
                        extraClasses="parammap-editor__invert-btn"
                    >
                        <FontAwesomeIcon icon={faShuffle} />
                    </ParamButton>
                </ColumnsLayout>
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
