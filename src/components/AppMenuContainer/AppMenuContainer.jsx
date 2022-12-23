import React from 'react';
import { connect } from 'react-redux';
import {
    openAboutDialog,
    openExportSysExDialog,
    openSettingsDialog,
} from '../../redux/uiStateSlice';
import AppMenu from '../AppMenu/AppMenu';

const AppMenuContainer = ({
    appController,
    onSettingsClick,
    onExportSysExClick,
    onAboutClick,
}) => {
    return (
        <>
            <AppMenu
                onOpenPatchClick={() => appController.openPatchClicked()}
                onSavePatchClick={() => appController.savePatchClicked()}
                onExportSysExClick={onExportSysExClick}
                onReceivePatchClick={() => appController.receivePatchClicked()}
                onSettingsClick={onSettingsClick}
                onAboutClick={onAboutClick}
            />
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    onSettingsClick: () => dispatch(openSettingsDialog()),
    onExportSysExClick: () => dispatch(openExportSysExDialog()),
    onAboutClick: () => dispatch(openAboutDialog()),
});

export default connect(undefined, mapDispatchToProps)(AppMenuContainer);
