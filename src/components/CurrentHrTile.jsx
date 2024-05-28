import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import HeartIcon from '@mui/icons-material/Favorite';

const CurrentHrTile = ({ color, isLastInRow, userId, onFetchComplete }) => {
    const [currentHr, setCurrentHr] = useState(null);

    const tileWidth = 'calc(100%)';
    const tileHeight = 'auto';

    const marginRight = isLastInRow ? '0px' : '20px';

    useEffect(() => {
        const fetchCurrentHeartrate = async () => {
            try {
                const response = await fetch('/api/current', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                });

                if (response.ok) {
                    const data = await response.json();
                    setCurrentHr(data.currentHeartrate);
                    if (onFetchComplete) {
                        onFetchComplete();
                    }
                } else {
                    console.error('Failed to fetch current heart rate:', response.status);
                }
            } catch (error) {
                console.error('Failed to fetch current heart rate:', error);
            }
        };

        fetchCurrentHeartrate();

        const intervalId = setInterval(fetchCurrentHeartrate, 60000);
        return () => clearInterval(intervalId);
        
    }, [userId, onFetchComplete]);

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
                        <HeartIcon sx={{ marginRight: '10px' }} /> Dabartinis širdies ritmas:
                        <Typography variant="subtitle" sx={{ color: '#fff', fontWeight: 'bold', marginLeft: '20px' }}>
                            {currentHr} bpm.
                        </Typography>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CurrentHrTile;
