import ColumnTitle from '../../ColumnTitle/ColumnTitle';
import TitledGroup from '../../TitledGroup/TitledGroup';
import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import classNames from 'classnames';
import ParamKnob from '../../Knob/ParamKnob';
import ParamButton from '../../Button/ParamButton';
import { Modes } from '../../../types';

import './OPMOpParams.css';
import UIGroupEnabledContext from '../../UIGroupEnabledContext/UIGroupEnabledContext';

const getOperatorToggleBit = (opIndex) => {
    switch (opIndex) {
        case 0:
            return 1;
        case 1:
            return 4;
        case 2:
            return 2;
        case 3:
            return 8;
        default:
            return undefined;
    }
};

const OPMOpParams = ({ opIndex, enabled }) => {
    const pathBase = `${Modes.OPM}.operators[${opIndex}]`;

    return (
        <UIGroupEnabledContext.Provider value={enabled}>
            <div
                className={classNames('opm-op-editor', {
                    'ui-element--enabled': enabled,
                    'ui-element--disabled': !enabled,
                })}
            >
                <ColumnTitle>OPERATOR {opIndex + 1}</ColumnTitle>
                <TitledGroup title="FLAGS">
                    <ColumnsLayout stretchH>
                        <ParamButton
                            path={`${Modes.OPM}.opsEnabled`}
                            toggleBit={getOperatorToggleBit(opIndex)}
                        >
                            ON
                        </ParamButton>
                        <ParamButton path={`${pathBase}.am`} toggle>
                            AM
                        </ParamButton>
                    </ColumnsLayout>
                </TitledGroup>
                <TitledGroup title="KSL">
                    <ColumnsLayout stretchH>
                        <ParamButton path={`${pathBase}.ks`} set={0}>
                            0
                        </ParamButton>
                        <ParamButton path={`${pathBase}.ks`} set={1}>
                            1
                        </ParamButton>
                        <ParamButton path={`${pathBase}.ks`} set={2}>
                            2
                        </ParamButton>
                        <ParamButton path={`${pathBase}.ks`} set={3}>
                            3
                        </ParamButton>
                    </ColumnsLayout>
                </TitledGroup>
                <ColumnsLayout stretchH>
                    <TitledGroup title="MULT">
                        <ParamKnob path={`${pathBase}.mul`} />
                    </TitledGroup>
                    <TitledGroup title="TL">
                        <ParamKnob path={`${pathBase}.tl`} />
                    </TitledGroup>
                </ColumnsLayout>
                <ColumnsLayout stretchH>
                    <TitledGroup title="DETUNE 1">
                        <ParamKnob path={`${pathBase}.dt1`} />
                    </TitledGroup>
                    <TitledGroup title="DETUNE 2">
                        <ParamKnob path={`${pathBase}.dt2`} />
                    </TitledGroup>
                </ColumnsLayout>
                <ColumnsLayout stretchH>
                    <TitledGroup title="ATTACK">
                        <ParamKnob path={`${pathBase}.ar`} />
                    </TitledGroup>
                    <TitledGroup title="RELEASE">
                        <ParamKnob path={`${pathBase}.rr`} />
                    </TitledGroup>
                </ColumnsLayout>
                <ColumnsLayout stretchH>
                    <TitledGroup title="DL" withMargin={false}>
                        <ParamKnob path={`${pathBase}.d1l`} size={55} />
                    </TitledGroup>
                    <TitledGroup title="DR1" withMargin={false}>
                        <ParamKnob path={`${pathBase}.d1r`} size={55} />
                    </TitledGroup>
                    <TitledGroup title="DR2" withMargin={false}>
                        <ParamKnob path={`${pathBase}.d2r`} size={55} />
                    </TitledGroup>
                </ColumnsLayout>
            </div>
        </UIGroupEnabledContext.Provider>
    );
};

export default OPMOpParams;
