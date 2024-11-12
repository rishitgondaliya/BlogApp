/* eslint-disable react/prop-types */
import { Dialog, DialogContent } from '@mui/material';

const Modal = ({ isModalOpen, handleCloseModal, profileImageUrl }) => {
  return (
    <Dialog open={isModalOpen} onClose={handleCloseModal}>
      <DialogContent>
        <img
          src={profileImageUrl}
          alt="Profile"
          style={{ width: '100%', height: '50vh' }} // Adjust size as needed
        />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
