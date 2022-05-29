import React from 'react';
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

class OPLGlobalParams extends React.Component {
    getConnectionButtons = () => {
        const { is4Op } = this.props;

        if (is4Op) {
            return (
                <>
                    <ConnectionButton
                        path={`${Modes.OPL}.conn`}
                        set={0}
                        is4Op
                    />
                    <ConnectionButton
                        path={`${Modes.OPL}.conn`}
                        set={2}
                        is4Op
                    />
                    <ConnectionButton
                        path={`${Modes.OPL}.conn`}
                        set={1}
                        is4Op
                    />
                    <ConnectionButton
                        path={`${Modes.OPL}.conn`}
                        set={3}
                        is4Op
                    />
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

    render = () => {
        const { enabled, is4Op } = this.props;

        return (
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
                                onClick={this._handle2OpClicked}
                            >
                                2-OP
                            </Button>
                            <Button
                                highlighted={is4Op}
                                onClick={this._handle4OpClicked}
                            >
                                4-OP
                            </Button>
                        </ColumnsLayout>
                        {this.getConnectionButtons()}
                    </TitledGroup>
                </div>
                <TitledGroup title="FEEDBACK" withMargin={false}>
                    <ParamKnob path={`${Modes.OPL}.fb`} />
                </TitledGroup>
            </div>
        );
    };

    _handle2OpClicked = () => {
        this.props.onSet4Op(false);
    };

    _handle4OpClicked = () => {
        this.props.onSet4Op(true);
    };
}

const mapStateToProps = state => ({
    is4Op: state.patchEditor.patch[Modes.OPL].is4Op,
});

const mapDispatchToProps = dispatch => ({
    onSet4Op: new4OpMode => dispatch(setOPLPatch4Op(new4OpMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OPLGlobalParams);
