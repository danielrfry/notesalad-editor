import { useCallback } from 'react';
import AboutDialog from '../AboutDialog/AboutDialog';
import { useDispatch, useSelector } from 'react-redux';
import { closeAboutDialog } from '../../redux/uiStateSlice';

const selectAboutDialogOpen = (state) => state.uiState.aboutDialogOpen;

const AboutDialogContainer = () => {
    const open = useSelector(selectAboutDialogOpen);
    const dispatch = useDispatch();

    const handleCloseClicked = useCallback(() => dispatch(closeAboutDialog()), [dispatch]);

    return <AboutDialog open={open} onClose={handleCloseClicked} />;
};

export default AboutDialogContainer;
