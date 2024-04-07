import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import UserIcon from '@mui/icons-material/Person';

const CurrentHrTile = ({ color, isLastInRow, userId }) => {
    const [currentHr, setCurrentHr] = useState(null);

    const tileWidth = 'calc(100%)';
    const tileHeight = 'auto';

    const marginRight = isLastInRow ? '0px' : '20px';

    // useEffect(() => {
    //     const fetchCurrentHeartrate = async () => {
    //         try {
    //             const response = await fetch('/api/current', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({ userId })
    //             });

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setCurrentHr(data.currentHeartrate);
    //             } else {
    //                 console.error('Failed to fetch current heart rate:', response.status);
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch current heart rate:', error);
    //         }
    //     };

    //     fetchCurrentHeartrate();
    // }, [userId]);

    return (
        <Box
            sx={{
                backgroundColor: color || 'white',
                borderRadius: '16px',
                padding: '30px',
                marginBottom: '20px',
                marginRight: marginRight,
                width: tileWidth,
                height: tileHeight,
                display: 'inline-block',
                verticalAlign: 'top',
                flex: '1 0 auto',
            }}
        >
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: '#fff' }}>
                        <UserIcon sx={{ marginRight: '10px' }} /> Naudotojo {userId} sveikatos duomenys:
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CurrentHrTile;
