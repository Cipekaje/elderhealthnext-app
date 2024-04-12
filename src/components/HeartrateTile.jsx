import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import HeartIcon from '@mui/icons-material/MonitorHeart';

const HeartrateTile = ({ color, isLastInRow, userId }) => {
    const [viewMode, setViewMode] = useState('daily');
    const [averageHeartrateDaily, setAverageHeartrateDaily] = useState(null);
    const [averageHeartrateWeekly, setAverageHeartrateWeekly] = useState(null);

    const toggleViewMode = () => {
        setViewMode((prevMode) => (prevMode === 'daily' ? 'weekly' : 'daily'));
    };

    //const tileWidth = 'calc(100% / 3 - 14px)';
    const tileWidth = '100%';
    const tileHeight = 'auto';

    const marginRight = isLastInRow ? '0px' : '20px';

    useEffect(() => {
        const fetchAverageHeartrate = async () => {
            try {
                const response = await fetch('/api/heartrate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userId })
                });

                if (response.ok) {
                    const data = await response.json();
                    setAverageHeartrateDaily(data.averageHeartrateToday);
                    setAverageHeartrateWeekly(data.averageHeartrateWeek);
                } else {
                    console.error('Nepavyko apskaičiuoti vidutinio širdies ritmo:', response.status);
                }
            } catch (error) {
                console.error('Nepavyko apskaičiuoti vidutinio širdies ritmo:', error);
            }
        };

        fetchAverageHeartrate();
    }, [viewMode]);

    return (
        <Box
            sx={{
                backgroundColor: color || 'white',
                borderRadius: '16px',
                padding: '20px',
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
                <Grid item xs={6}>
                    <Typography variant="text" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: '#fff' }}>
                        <HeartIcon sx={{ marginRight: '10px' }} /> Širdies Ritmas
                    </Typography>
                    <Typography variant="text" sx={{ color: '#fff' }}>
                        Vidutinis {viewMode === 'daily' ? 'dienos' : 'savaitės'} širdies ritmas:
                        <Typography component="span" variant="text" sx={{ fontWeight: 'bold' }}>
                            {viewMode === 'daily' ? averageHeartrateDaily : averageHeartrateWeekly}
                        </Typography>
                    </Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    {/* Button to toggle between daily and weekly view */}
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={toggleViewMode}
                        sx={{
                            color: '#fff',
                            borderColor: '#fff'
                        }}>
                        {viewMode === 'daily' ? 'Žiūrėti savaitės' : 'Žiūrėti dienos'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HeartrateTile;
