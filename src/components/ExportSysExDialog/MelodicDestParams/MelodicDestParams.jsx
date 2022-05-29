import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { PROGRAM_NAMES } from '../../../midi';
import { updateExportSysExDestMelodicProg } from '../../../redux/uiStateSlice';
import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import DropDownList, { DropDownItem } from '../../DropDownList/DropDownList';

const MelodicDestParams = ({ bank, onSetBank, program, onSetProgram }) => (
    <>
        <p>
            Sending the SysEx message will write the patch to the selected
            bank/program:
        </p>
        <ColumnsLayout extraClasses="exportSysExDlg__dropDownGroup">
            <DropDownList
                value={bank}
                onChange={onSetBank}
                extraClasses="exportSysExDlg__bankSelect"
            >
                {_.range(0, 128).map(b => (
                    <DropDownItem key={b} value={b}>
                        Bank {b}
                    </DropDownItem>
                ))}
            </DropDownList>
            <DropDownList value={program} onChange={onSetProgram}>
                {_.range(0, 128).map(p => (
                    <DropDownItem key={p} value={p}>
                        {p}: {PROGRAM_NAMES[p]}
                    </DropDownItem>
                ))}
            </DropDownList>
        </ColumnsLayout>
    </>
);

const mapStateToProps = state =>
    state.uiState.exportSysExDialog.destinationAddress.melodicProgram;
const mapDispatchToProps = dispatch => ({
    onSetBank: bank => dispatch(updateExportSysExDestMelodicProg({ bank })),
    onSetProgram: program =>
        dispatch(updateExportSysExDestMelodicProg({ program })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MelodicDestParams);
