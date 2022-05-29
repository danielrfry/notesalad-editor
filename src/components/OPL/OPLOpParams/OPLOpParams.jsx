import React from 'react';
import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import TitledGroup from '../../TitledGroup/TitledGroup';
import classNames from 'classnames';
import ColumnTitle from '../../ColumnTitle/ColumnTitle';
import WaveIcon from '../../WaveIcon/WaveIcon';
import ParamButton from '../../Button/ParamButton';
import ParamKnob from '../../Knob/ParamKnob';
import { Modes } from '../../../types';
import WaveGrid from '../../WaveGrid/WaveGrid';

import './OPLOpParams.css';

const WaveButton = props => (
    <ParamButton
        path={`${Modes.OPL}.operators[${props.opIndex}].ws`}
        set={props.shape}
    >
        <WaveIcon shape={props.shape} />
    </ParamButton>
);

const OPLOpParams = ({ opIndex, enabled }) => {
    const pathBase = `${Modes.OPL}.operators[${opIndex}]`;

    return (
        <div
            className={classNames('opl-op-editor', {
                'ui-element--enabled': enabled,
                'ui-element--disabled': !enabled,
            })}
        >
            <ColumnTitle>OPERATOR {opIndex + 1}</ColumnTitle>
            <TitledGroup title="FLAGS">
                <ColumnsLayout stretchH>
                    <ParamButton path={`${pathBase}.am`} toggle>
                        AM
                    </ParamButton>
                    <ParamButton path={`${pathBase}.vib`} toggle>
                        VIB
                    </ParamButton>
                    <ParamButton path={`${pathBase}.egt`} toggle>
                        EGT
                    </ParamButton>
                    <ParamButton path={`${pathBase}.ksr`} toggle>
                        KSR
                    </ParamButton>
                </ColumnsLayout>
            </TitledGroup>
            <TitledGroup title="KSL (dB/oct)">
                <ColumnsLayout stretchH>
                    <ParamButton path={`${pathBase}.ksl`} set={0}>
                        0
                    </ParamButton>
                    <ParamButton path={`${pathBase}.ksl`} set={1}>
                        1.5
                    </ParamButton>
                    <ParamButton path={`${pathBase}.ksl`} set={2}>
                        3
                    </ParamButton>
                    <ParamButton path={`${pathBase}.ksl`} set={3}>
                        6
                    </ParamButton>
                </ColumnsLayout>
            </TitledGroup>
            <ColumnsLayout stretchH>
                <TitledGroup title="MULT">
                    <ParamKnob path={`${pathBase}.mult`} />
                </TitledGroup>
                <TitledGroup title="TL">
                    <ParamKnob path={`${pathBase}.tl`} />
                </TitledGroup>
            </ColumnsLayout>
            <ColumnsLayout stretchH>
                <TitledGroup title="ATTACK">
                    <ParamKnob path={`${pathBase}.ar`} />
                </TitledGroup>
                <TitledGroup title="DECAY">
                    <ParamKnob path={`${pathBase}.dr`} />
                </TitledGroup>
            </ColumnsLayout>
            <ColumnsLayout stretchH>
                <TitledGroup title="SUSTAIN">
                    <ParamKnob path={`${pathBase}.sl`} />
                </TitledGroup>
                <TitledGroup title="RELEASE">
                    <ParamKnob path={`${pathBase}.rr`} />
                </TitledGroup>
            </ColumnsLayout>
            <TitledGroup title="WAVE" withMargin={false}>
                <WaveGrid columnCount={4}>
                    <WaveButton opIndex={opIndex} shape={0} />
                    <WaveButton opIndex={opIndex} shape={1} />
                    <WaveButton opIndex={opIndex} shape={2} />
                    <WaveButton opIndex={opIndex} shape={3} />
                    <WaveButton opIndex={opIndex} shape={4} />
                    <WaveButton opIndex={opIndex} shape={5} />
                    <WaveButton opIndex={opIndex} shape={6} />
                    <WaveButton opIndex={opIndex} shape={7} />
                </WaveGrid>
            </TitledGroup>
        </div>
    );
};

export default OPLOpParams;
