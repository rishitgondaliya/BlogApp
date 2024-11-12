/* eslint-disable react/prop-types */
import { ButtonGroup, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImageUpload = ({ handleFileChange, handleUpdateProfilePicture }) => {
  return (
    <Box display="flex" justifyContent="center">
      <ButtonGroup variant="contained" sx={{ mb: 2 }}>
        <Button component="label" startIcon={<CloudUploadIcon />} color="secondary">
          Upload Image
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
        <Button onClick={handleUpdateProfilePicture} color="primary">
          Update Profile Picture
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default ImageUpload;
