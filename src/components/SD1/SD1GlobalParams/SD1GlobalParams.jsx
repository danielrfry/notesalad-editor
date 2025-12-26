import ColumnTitle from '../../ColumnTitle/ColumnTitle';
import TitledGroup from '../../TitledGroup/TitledGroup';
import classNames from 'classnames';
import ConnectionButton from '../../ConnectionButton/ConnectionButton';
import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import ParamKnob from '../../Knob/ParamKnob';
import { Modes } from '../../../types';
import { isSD1Patch4Op } from '../../../services/SD1/SD1PatchSchema';
import Button from '../../Button/Button';
import UIGroupEnabledContext from '../../UIGroupEnabledContext/UIGroupEnabledContext';

import './SD1GlobalParams.css';

const getConnectionButtons = (is4Op) =>
    is4Op ? (
        <>
            <ConnectionButton path={`${Modes.SD1}.alg`} set={2} />
            <ConnectionButton path={`${Modes.SD1}.alg`} set={3} />
            <ConnectionButton path={`${Modes.SD1}.alg`} set={4} />
            <ConnectionButton path={`${Modes.SD1}.alg`} set={5} />
            <ConnectionButton path={`${Modes.SD1}.alg`} set={6} />
            <ConnectionButton path={`${Modes.SD1}.alg`} set={7} />
        </>
    ) : (
        <>
            <ConnectionButton path={`${Modes.SD1}.alg`} set={0} />
            <ConnectionButton path={`${Modes.SD1}.alg`} set={1} />
        </>
    );

const SD1GlobalParams = ({ enabled, patch, onSet4Op }) => {
    const is4Op = isSD1Patch4Op(patch);
    const _handleSet2OpClicked = () => onSet4Op(false);
    const _handleSet4OpClicked = () => onSet4Op(true);

    return (
        <UIGroupEnabledContext.Provider value={enabled}>
            <div
                className={classNames('sd1-patch-params', {
                    'ui-element--enabled': enabled,
                    'ui-element--disabled': !enabled,
                })}
            >
                <ColumnTitle>GLOBAL</ColumnTitle>
                <TitledGroup title="CONNECTION">
                    <ColumnsLayout
                        stretchH
                        extraClasses="sd1-patch-params__ops-enabled-row"
                    >
                        <Button
                            highlighted={!is4Op}
                            onClick={_handleSet2OpClicked}
                        >
                            2-OP
                        </Button>
                        <Button
                            highlighted={is4Op}
                            onClick={_handleSet4OpClicked}
                        >
                            4-OP
                        </Button>
                    </ColumnsLayout>
                    {getConnectionButtons(is4Op)}
                </TitledGroup>
                <ColumnsLayout stretchH>
                    <TitledGroup title="OCTAVE">
                        <ParamKnob path={`${Modes.SD1}.bo`} size={60} />
                    </TitledGroup>
                    <TitledGroup title="LFO FREQ">
                        <ParamKnob path={`${Modes.SD1}.lfo`} size={60} />
                    </TitledGroup>
                </ColumnsLayout>
            </div>
        </UIGroupEnabledContext.Provider>
    );
};

export default SD1GlobalParams;
