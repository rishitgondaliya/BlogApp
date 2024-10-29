/* eslint-disable react/prop-types */

import { Avatar, Box, Typography } from '@mui/material';

const ProfilePicture = ({ profileImageUrl, handleImageClick }) => {
    return (
        <Box display="flex" justifyContent="center" mb={4}>
            {profileImageUrl ? (
                <Avatar
                    key={profileImageUrl}
                    alt="Profile Picture"
                    src={profileImageUrl}
                    sx={{ width: 96, height: 96, cursor: 'pointer' }}
                    onClick={handleImageClick}
                />
            ) : (
                <Avatar sx={{ width: 96, height: 96 }}>
                    <Typography>No Profile Picture</Typography>
                </Avatar>
            )}
        </Box>
    );
};

export default ProfilePicture;
