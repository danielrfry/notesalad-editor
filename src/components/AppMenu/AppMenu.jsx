import React from 'react';
import Menu, { MenuItem } from '../Menu/Menu';
import {
    faCog,
    faShare,
    faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen, faSave } from '@fortawesome/free-regular-svg-icons';

const AppMenu = props => (
    <Menu>
        <MenuItem icon={faFolderOpen} onClick={props.onOpenPatchClick}>
            Open patch
        </MenuItem>
        <MenuItem icon={faSave} onClick={props.onSavePatchClick}>
            Save patch
        </MenuItem>
        <MenuItem icon={faShare} onClick={props.onExportSysExClick}>
            Export as SysEx
        </MenuItem>
        <MenuItem icon={faCog} onClick={props.onSettingsClick}>
            Settings
        </MenuItem>
        <MenuItem icon={faQuestionCircle} onClick={props.onAboutClick}>
            About
        </MenuItem>
    </Menu>
);

export default AppMenu;
