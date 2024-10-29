/* eslint-disable react/prop-types */
import { TextField, Box, Typography } from '@mui/material';
import { LogoutBtn, Button } from '../index';

const ProfileForm = ({ register, handleSubmit, onSubmit, isEditing, setIsEditing, error }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        fullWidth
        variant="outlined"
        {...register("name", {required: true})}
        margin="normal"
        InputProps={{ readOnly: !isEditing }}
      />
      <TextField
        label="Email"
        fullWidth
        variant="outlined"
        {...register("email", {
          required: true,
          validate: {
            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
              "Email address must be a valid address",
          }
        })}
        margin="normal"
        InputProps={{ readOnly: !isEditing }}
      />

      <Box mt={4} display="flex" justifyContent="center">
        {!isEditing ? (
          <Box mt={4} display="flex" justifyContent="center">
            <Button
              fontSize={'1rem'}
              onClick={() => setIsEditing(true)}
              sx={{ mr: 2 }}
            >
              Edit Profile
            </Button>
            <LogoutBtn />
          </Box>
        ) : (
          <>
            <Button
              color='error'
              onClick={() => setIsEditing(false)}
              fontSize={'1rem'}
              sx={{ mr: 2 }}
              paddingY={1}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              paddingX={2}
              paddingY={1}
              fontSize={'1rem'}
              color="secondary"
              textColor='white'
            >
              Save Changes
            </Button>
          </>
        )}
      </Box>

      {error && (
        <Typography color="error" align="center" mt={2}>
          {typeof error === 'string' ? {error} : JSON.stringify(error)}
        </Typography>
        // alert(JSON.stringify(error))
      )}

    </form>
  );
};

export default ProfileForm;