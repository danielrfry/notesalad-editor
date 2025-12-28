import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import TitledGroup from '../../TitledGroup/TitledGroup';
import ConnectionButton from '../../ConnectionButton/ConnectionButton';
import classNames from 'classnames';
import ColumnTitle from '../../ColumnTitle/ColumnTitle';
import ParamKnob from '../../Knob/ParamKnob';
import { useDispatch, useSelector } from 'react-redux';
import { Modes } from '../../../types';
import { setOPLPatch4Op } from '../../../redux/patchEditorSlice';
import Button from '../../Button/Button';
import UIGroupEnabledContext from '../../UIGroupEnabledContext/UIGroupEnabledContext';
import { useCallback } from 'react';

import './OPLGlobalParams.css';

const getConnectionButtons = (is4Op) => {
    if (is4Op) {
        return (
            <>
                <ConnectionButton path={`${Modes.OPL}.conn`} set={0} is4Op />
                <ConnectionButton path={`${Modes.OPL}.conn`} set={2} is4Op />
                <ConnectionButton path={`${Modes.OPL}.conn`} set={1} is4Op />
                <ConnectionButton path={`${Modes.OPL}.conn`} set={3} is4Op />
            </>
        );
    } else {
        return (
            <>
                <ConnectionButton path={`${Modes.OPL}.conn`} set={0} />
                <ConnectionButton path={`${Modes.OPL}.conn`} set={1} />
            </>
        );
    }
};

const selectIs4Op = (state) => state.patchEditor.patch[Modes.OPL].is4Op;

const OPLGlobalParams = ({ enabled }) => {
    const is4Op = useSelector(selectIs4Op);

    const dispatch = useDispatch();

    const _handle2OpClicked = useCallback(() => {
        dispatch(setOPLPatch4Op(false));
    }, [dispatch]);

    const _handle4OpClicked = useCallback(() => {
        dispatch(setOPLPatch4Op(true));
    }, [dispatch]);

    return (
        <UIGroupEnabledContext.Provider value={enabled}>
            <div
                className={classNames('opl-patch-params', {
                    'ui-element--enabled': enabled,
                    'ui-element--disabled': !enabled,
                })}
            >
                <ColumnTitle>GLOBAL</ColumnTitle>
                <div>
                    <TitledGroup title="CONNECTION">
                        <ColumnsLayout
                            stretchH
                            extraClasses="opl-patch-params__ops-enabled-row"
                        >
                            <Button
                                highlighted={!is4Op}
                                onClick={_handle2OpClicked}
                            >
                                2-OP
                            </Button>
                            <Button
                                highlighted={is4Op}
                                onClick={_handle4OpClicked}
                            >
                                4-OP
                            </Button>
                        </ColumnsLayout>
                        {getConnectionButtons(is4Op)}
                    </TitledGroup>
                </div>
                <TitledGroup title="FEEDBACK" withMargin={false}>
                    <ParamKnob path={`${Modes.OPL}.fb`} />
                </TitledGroup>
            </div>
        </UIGroupEnabledContext.Provider>
    );
};

export default OPLGlobalParams;
