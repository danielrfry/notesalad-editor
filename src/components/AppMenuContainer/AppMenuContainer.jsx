import { useDispatch } from 'react-redux';
import {
    openAboutDialog,
    openExportSysExDialog,
    openSettingsDialog,
} from '../../redux/uiStateSlice';
import AppMenu from '../AppMenu/AppMenu';
import { useCallback } from 'react';

const AppMenuContainer = ({ appController }) => {
    const dispatch = useDispatch();
    const handleSettingsClicked = useCallback(() => {
        dispatch(openSettingsDialog());
    }, [dispatch]);
    const handleExportSysExClicked = useCallback(() => {
        dispatch(openExportSysExDialog());
    }, [dispatch]);
    const handleAboutClicked = useCallback(() => {
        dispatch(openAboutDialog());
    }, [dispatch]);

    return (
        <>
            <AppMenu
                onOpenPatchClick={() => appController.openPatchClicked()}
                onSavePatchClick={() => appController.savePatchClicked()}
                onExportSysExClick={handleExportSysExClicked}
                onReceivePatchClick={() => appController.receivePatchClicked()}
                onSettingsClick={handleSettingsClicked}
                onAboutClick={handleAboutClicked}
            />
        </>
    );
};

export default AppMenuContainer;
