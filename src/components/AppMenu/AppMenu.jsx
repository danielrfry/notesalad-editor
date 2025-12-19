import CustomMenu, { CustomMenuItem } from '../CustomMenu/CustomMenu';
import {
    faCog,
    faShare,
    faQuestionCircle,
    faMicrochip,
} from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen, faSave } from '@fortawesome/free-regular-svg-icons';

const AppMenu = (props) => (
    <CustomMenu>
        <CustomMenuItem icon={faFolderOpen} onClick={props.onOpenPatchClick}>
            Open patch
        </CustomMenuItem>
        <CustomMenuItem icon={faSave} onClick={props.onSavePatchClick}>
            Save patch
        </CustomMenuItem>
        <CustomMenuItem icon={faShare} onClick={props.onExportSysExClick}>
            Export as SysEx
        </CustomMenuItem>
        <CustomMenuItem icon={faMicrochip} onClick={props.onReceivePatchClick}>
            Receive patch
        </CustomMenuItem>
        <CustomMenuItem icon={faCog} onClick={props.onSettingsClick}>
            Settings
        </CustomMenuItem>
        <CustomMenuItem icon={faQuestionCircle} onClick={props.onAboutClick}>
            About
        </CustomMenuItem>
    </CustomMenu>
);

export default AppMenu;
