import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { PROGRAM_NAMES } from '../../../midi';
import { updateExportSysExDestMelodicProg } from '../../../redux/uiStateSlice';
import ColumnsLayout from '../../ColumnsLayout/ColumnsLayout';
import DropDownList, { DropDownItem } from '../../DropDownList/DropDownList';
import { useCallback } from 'react';

const selectProgram = (state) =>
    state.uiState.exportSysExDialog.destinationAddress.melodicProgram;

const MelodicDestParams = () => {
    const { bank, program } = useSelector(selectProgram);

    const dispatch = useDispatch();
    const handleBankChanged = useCallback(
        (bank) => {
            dispatch(
                updateExportSysExDestMelodicProg({ bank: parseInt(bank) })
            );
        },
        [dispatch]
    );
    const handleProgramChanged = useCallback(
        (program) => {
            dispatch(
                updateExportSysExDestMelodicProg({ program: parseInt(program) })
            );
        },
        [dispatch]
    );

    return (
        <>
            <p>
                Sending the SysEx message will write the patch to the selected
                bank/program:
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
                <DropDownList value={program} onChange={handleProgramChanged}>
                    {_.range(0, 128).map((p) => (
                        <DropDownItem key={p} value={p}>
                            {p}: {PROGRAM_NAMES[p]}
                        </DropDownItem>
                    ))}
                </DropDownList>
            </ColumnsLayout>
        </>
    );
};

export default MelodicDestParams;
