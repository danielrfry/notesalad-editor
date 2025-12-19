import { useCallback } from 'react';
import AboutDialog from '../AboutDialog/AboutDialog';
import { connect } from 'react-redux';
import { closeAboutDialog } from '../../redux/uiStateSlice';

const AboutDialogContainer = ({ open, onClose }) => {
    const handleCloseClicked = useCallback(() => onClose(), [onClose]);

    return <AboutDialog open={open} onClose={handleCloseClicked} />;
};

const mapStateToProps = (state) => ({
    open: state.uiState.aboutDialogOpen,
});
const mapDispatchToProps = {
    onClose: closeAboutDialog,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutDialogContainer);
