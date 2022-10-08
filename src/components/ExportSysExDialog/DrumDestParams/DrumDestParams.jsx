import _ from 'lodash';
import React from 'react';
import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import DropDownList, { DropDownItem } from '../../DropDownList/DropDownList';
import { DRUM_NOTE_NAMES, getNoteName } from '../../../midi';
import { updateExportSysExDestDrumProg } from '../../../redux/uiStateSlice';
import { connect } from 'react-redux';

const DrumDestParams = ({
    bank,
    onSetBank,
    program,
    onSetProgram,
    noteNum,
    onSetNoteNum,
}) => (
    <>
        <p>
            Sending the SysEx message will write the patch to the selected
            bank/program/note:
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
            <DropDownList
                value={program}
                onChange={onSetProgram}
                extraClasses="exportSysExDlg__progSelect"
            >
                {_.range(0, 128).map(p => (
                    <DropDownItem key={p} value={p}>
                        Program {p}
                    </DropDownItem>
                ))}
            </DropDownList>
            <DropDownList value={noteNum} onChange={onSetNoteNum}>
                {_.range(0, 128).map(n => (
                    <DropDownItem key={n} value={n}>
                        {n in DRUM_NOTE_NAMES
                            ? `${getNoteName(n)}: ${DRUM_NOTE_NAMES[n]}`
                            : getNoteName(n)}
                    </DropDownItem>
                ))}
            </DropDownList>
        </ColumnsLayout>
    </>
);

const mapStateToProps = state =>
    state.uiState.exportSysExDialog.destinationAddress.drumProgram;
const mapDispatchToProps = dispatch => ({
    onSetBank: bank =>
        dispatch(updateExportSysExDestDrumProg({ bank: parseInt(bank) })),
    onSetProgram: program =>
        dispatch(updateExportSysExDestDrumProg({ program: parseInt(program) })),
    onSetNoteNum: noteNum =>
        dispatch(updateExportSysExDestDrumProg({ noteNum: parseInt(noteNum) })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrumDestParams);
