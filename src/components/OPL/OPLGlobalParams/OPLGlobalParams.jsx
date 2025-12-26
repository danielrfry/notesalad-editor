import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import TitledGroup from '../../TitledGroup/TitledGroup';
import ConnectionButton from '../../ConnectionButton/ConnectionButton';
import classNames from 'classnames';
import ColumnTitle from '../../ColumnTitle/ColumnTitle';
import ParamKnob from '../../Knob/ParamKnob';
import { connect } from 'react-redux';
import { Modes } from '../../../types';
import { setOPLPatch4Op } from '../../../redux/patchEditorSlice';
import Button from '../../Button/Button';

import './OPLGlobalParams.css';
import UIGroupEnabledContext from '../../UIGroupEnabledContext/UIGroupEnabledContext';

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

const OPLGlobalParams = ({ enabled, is4Op, onSet4Op }) => {
    const _handle2OpClicked = () => {
        onSet4Op(false);
    };

    const _handle4OpClicked = () => {
        onSet4Op(true);
    };

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

const mapStateToProps = (state) => ({
    is4Op: state.patchEditor.patch[Modes.OPL].is4Op,
});

const mapDispatchToProps = (dispatch) => ({
    onSet4Op: (new4OpMode) => dispatch(setOPLPatch4Op(new4OpMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OPLGlobalParams);
