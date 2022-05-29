import React from 'react';
import TitledGroup from '../../TitledGroup/TitledGroup';
import ConnectionButton from '../../ConnectionButton/ConnectionButton';
import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import ColumnTitle from '../../ColumnTitle/ColumnTitle';
import ScrollArea from '../../ScrollArea/ScrollArea';
import classNames from 'classnames';
import ParamKnob from '../../Knob/ParamKnob';
import { Modes } from '../../../types';

import './OPMGlobalParams.css';

const OPMGlobalParams = ({ enabled }) => (
    <div
        className={classNames('opm-patch-params', {
            'ui-element--enabled': enabled,
            'ui-element--disabled': !enabled,
        })}
    >
        <ColumnTitle>GLOBAL</ColumnTitle>
        <TitledGroup
            title="CONNECTION"
            extraClasses="opm-patch-params__connection"
            fillV
        >
            <ScrollArea scrollV>
                <ConnectionButton path={`${Modes.OPM}.conn`} set={0} />
                <ConnectionButton path={`${Modes.OPM}.conn`} set={1} />
                <ConnectionButton path={`${Modes.OPM}.conn`} set={2} />
                <ConnectionButton path={`${Modes.OPM}.conn`} set={3} />
                <ConnectionButton path={`${Modes.OPM}.conn`} set={4} />
                <ConnectionButton path={`${Modes.OPM}.conn`} set={5} />
                <ConnectionButton path={`${Modes.OPM}.conn`} set={6} />
                <ConnectionButton path={`${Modes.OPM}.conn`} set={7} />
            </ScrollArea>
        </TitledGroup>
        <TitledGroup title="FEEDBACK">
            <ParamKnob path={`${Modes.OPM}.fb`} />
        </TitledGroup>
        <ColumnsLayout stretchH>
            <TitledGroup title="AMS" withMargin={false}>
                <ParamKnob path={`${Modes.OPM}.ams`} size={60} />
            </TitledGroup>
            <TitledGroup title="PMS" withMargin={false}>
                <ParamKnob path={`${Modes.OPM}.pms`} size={60} />
            </TitledGroup>
        </ColumnsLayout>
    </div>
);

export default OPMGlobalParams;
