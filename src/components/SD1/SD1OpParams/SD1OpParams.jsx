import React from 'react';
import ColumnTitle from '../../ColumnTitle/ColumnTitle';
import classNames from 'classnames';
import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import TitledGroup from '../../TitledGroup/TitledGroup';
import WaveIcon from '../../WaveIcon/WaveIcon';
import ParamKnob from '../../Knob/ParamKnob';
import ParamButton from '../../Button/ParamButton';
import { Modes } from '../../../types';
import WaveGrid from '../../WaveGrid/WaveGrid';

import './SD1OpParams.css';
import UIGroupEnabledContext from '../../UIGroupEnabledContext/UIGroupEnabledContext';

const WaveButton = props => (
    <ParamButton path={props.path} set={props.shape}>
        <WaveIcon shape={props.shape} />
    </ParamButton>
);

const SD1OpEditor = props => {
    const { opIndex, enabled } = props;
    const pathBase = `${Modes.SD1}.operators[${opIndex}]`;

    return (
        <UIGroupEnabledContext.Provider value={enabled}>
            <div
                className={classNames('sd1-op-editor', {
                    'ui-element--enabled': enabled,
                    'ui-element--disabled': !enabled,
                })}
            >
                <ColumnTitle>OPERATOR {opIndex + 1}</ColumnTitle>
                <TitledGroup title="FLAGS" extraStyles={{ flexGrow: 2 }}>
                    <ColumnsLayout stretchH>
                        <ParamButton path={`${pathBase}.xof`} toggle>
                            XOF
                        </ParamButton>
                        <ParamButton path={`${pathBase}.ksr`} toggle>
                            KSR
                        </ParamButton>
                        <ParamButton path={`${pathBase}.eam`} toggle>
                            EAM
                        </ParamButton>
                        <ParamButton path={`${pathBase}.evb`} toggle>
                            EVB
                        </ParamButton>
                    </ColumnsLayout>
                </TitledGroup>
                <TitledGroup title="KSL (dB/oct)" extraStyles={{ flexGrow: 5 }}>
                    <ColumnsLayout stretchH>
                        <ParamButton path={`${pathBase}.ksl`} set={0}>
                            0
                        </ParamButton>
                        <ParamButton path={`${pathBase}.ksl`} set={2}>
                            1.5
                        </ParamButton>
                        <ParamButton path={`${pathBase}.ksl`} set={1}>
                            3
                        </ParamButton>
                        <ParamButton path={`${pathBase}.ksl`} set={3}>
                            6
                        </ParamButton>
                    </ColumnsLayout>
                </TitledGroup>
                <ColumnsLayout stretchH>
                    <TitledGroup title="MULT">
                        <ParamKnob path={`${pathBase}.multi`} size={55} />
                    </TitledGroup>
                    <TitledGroup title="DT">
                        <ParamKnob path={`${pathBase}.dt`} size={55} />
                    </TitledGroup>
                    <TitledGroup title="FB">
                        <ParamKnob path={`${pathBase}.fb`} size={55} />
                    </TitledGroup>
                </ColumnsLayout>
                <ColumnsLayout stretchH>
                    <TitledGroup title="TL">
                        <ParamKnob path={`${pathBase}.tl`} size={55} />
                    </TitledGroup>
                    <TitledGroup title="AR">
                        <ParamKnob path={`${pathBase}.ar`} size={55} />
                    </TitledGroup>
                    <TitledGroup title="DR">
                        <ParamKnob path={`${pathBase}.dr`} size={55} />
                    </TitledGroup>
                </ColumnsLayout>
                <ColumnsLayout stretchH>
                    <TitledGroup title="SR">
                        <ParamKnob path={`${pathBase}.sr`} size={55} />
                    </TitledGroup>
                    <TitledGroup title="RR">
                        <ParamKnob path={`${pathBase}.rr`} size={55} />
                    </TitledGroup>
                    <TitledGroup title="SL">
                        <ParamKnob path={`${pathBase}.sl`} size={55} />
                    </TitledGroup>
                </ColumnsLayout>
                <ColumnsLayout stretchH>
                    <TitledGroup title="DAM">
                        <ParamKnob path={`${pathBase}.dam`} size={55} />
                    </TitledGroup>
                    <TitledGroup title="DVB">
                        <ParamKnob path={`${pathBase}.dvb`} size={55} />
                    </TitledGroup>
                </ColumnsLayout>
                <TitledGroup title="WAVE" withMargin={false}>
                    <div className="sd1-op-editor__waves">
                        <WaveGrid columnCount={4}>
                            <WaveButton path={`${pathBase}.ws`} shape={0} />
                            <WaveButton path={`${pathBase}.ws`} shape={1} />
                            <WaveButton path={`${pathBase}.ws`} shape={2} />
                            <WaveButton path={`${pathBase}.ws`} shape={3} />
                            <WaveButton path={`${pathBase}.ws`} shape={4} />
                            <WaveButton path={`${pathBase}.ws`} shape={5} />
                            <WaveButton path={`${pathBase}.ws`} shape={6} />
                            <WaveButton path={`${pathBase}.ws`} shape={7} />
                            <WaveButton path={`${pathBase}.ws`} shape={8} />
                            <WaveButton path={`${pathBase}.ws`} shape={9} />
                            <WaveButton path={`${pathBase}.ws`} shape={10} />
                            <WaveButton path={`${pathBase}.ws`} shape={11} />
                            <WaveButton path={`${pathBase}.ws`} shape={12} />
                            <WaveButton path={`${pathBase}.ws`} shape={13} />
                            <WaveButton path={`${pathBase}.ws`} shape={14} />
                            <WaveButton path={`${pathBase}.ws`} shape={16} />
                            <WaveButton path={`${pathBase}.ws`} shape={17} />
                            <WaveButton path={`${pathBase}.ws`} shape={18} />
                            <WaveButton path={`${pathBase}.ws`} shape={19} />
                            <WaveButton path={`${pathBase}.ws`} shape={20} />
                            <WaveButton path={`${pathBase}.ws`} shape={21} />
                            <WaveButton path={`${pathBase}.ws`} shape={22} />
                            <WaveButton path={`${pathBase}.ws`} shape={24} />
                            <WaveButton path={`${pathBase}.ws`} shape={25} />
                            <WaveButton path={`${pathBase}.ws`} shape={26} />
                            <WaveButton path={`${pathBase}.ws`} shape={28} />
                            <WaveButton path={`${pathBase}.ws`} shape={29} />
                            <WaveButton path={`${pathBase}.ws`} shape={30} />
                        </WaveGrid>
                    </div>
                </TitledGroup>
            </div>
        </UIGroupEnabledContext.Provider>
    );
};

export default SD1OpEditor;
