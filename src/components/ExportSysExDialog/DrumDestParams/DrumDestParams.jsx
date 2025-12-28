import _ from 'lodash';
import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import DropDownList, { DropDownItem } from '../../DropDownList/DropDownList';
import { DRUM_NOTE_NAMES, getNoteName } from '../../../midi';
import { updateExportSysExDestDrumProg } from '../../../redux/uiStateSlice';
import { connect, useDispatch, useSelector } from 'react-redux';

const selectDrumProgram = (state) =>
    state.uiState.exportSysExDialog.destinationAddress.drumProgram;

const DrumDestParams = () => {
    const { bank, program, noteNum } = useSelector(selectDrumProgram);

    const dispatch = useDispatch();
    const handleBankChanged = (bank) => {
        dispatch(updateExportSysExDestDrumProg({ bank: parseInt(bank) }));
    };
    const handleProgramChanged = (program) => {
        dispatch(updateExportSysExDestDrumProg({ program: parseInt(program) }));
    };
    const handleNoteNumChanged = (noteNum) => {
        dispatch(updateExportSysExDestDrumProg({ noteNum: parseInt(noteNum) }));
    };

    return (
        <>
            <p>
                Sending the SysEx message will write the patch to the selected
                bank/program/note:
            </p>
            <ColumnsLayout extraClasses="exportSysExDlg__dropDownGroup">
                <DropDownList
                    value={bank}
                    onChange={handleBankChanged}
                    extraClasses="exportSysExDlg__bankSelect"
                >
                    {_.range(0, 128).map((b) => (
                        <DropDownItem key={b} value={b}>
                            Bank {b}
                        </DropDownItem>
                    ))}
                </DropDownList>
                <DropDownList
                    value={program}
                    onChange={handleProgramChanged}
                    extraClasses="exportSysExDlg__progSelect"
                >
                    {_.range(0, 128).map((p) => (
                        <DropDownItem key={p} value={p}>
                            Program {p}
                        </DropDownItem>
                    ))}
                </DropDownList>
                <DropDownList value={noteNum} onChange={handleNoteNumChanged}>
                    {_.range(0, 128).map((n) => (
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
};

export default DrumDestParams;
