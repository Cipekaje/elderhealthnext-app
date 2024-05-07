import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Hidden } from '@mui/material';
import UserIcon from '@mui/icons-material/Person';

const ProfileTile = ({ color, isLastInRow, userId }) => {
    const [currentHr, setCurrentHr] = useState(null);

    const tileWidth = 'calc(100%)';
    const tileHeight = 'auto';

    const marginRight = isLastInRow ? '0px' : '10px';

    return (
        <Grid
            
            spacing={1}
            alignItems="center"
            justifyContent="center" // Center the content horizontally
            style={{ height: '100%' }} // Make the Grid container full height
        >
            <Grid item xs={12}>
                <Box
                    sx={{
                        backgroundColor: color || 'white',
                        borderRadius: '16px',
                        padding: '5px',
                        marginBottom: '20px',
                        width: 'calc(95%)',
                        height: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff'
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: '#fff' }}>
                        <UserIcon sx={{ marginRight: '10px' }} /> Mano Paskyra
                    </Typography>
                </Box >
            </Grid>
        </Grid>
    );
};
export default ProfileTile;

