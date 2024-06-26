import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Hidden } from '@mui/material';
import UserIcon from '@mui/icons-material/Person';
import { useSession } from 'next-auth/react';

const CurrentHrTile = ({ color, isLastInRow, userId }) => {
    const [currentHr, setCurrentHr] = useState(null);

    const tileWidth = 'calc(100%)';
    const tileHeight = 'auto';

    const marginRight = isLastInRow ? '0px' : '20px';

    const { data: session } = useSession();
    const user = session?.user;

    const name = user?.name || '';

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
                wordWrap: 'break-word',
            }}
        >
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={12}>
                <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#fff',
                            overflowWrap: 'break-word', // Ensures content wraps within its container
                            whiteSpace: 'normal',
                        }}
                    >
                        <UserIcon sx={{ marginRight: '10px' }} /> Naudotojo
                        <Typography
                            component="span"
                            variant="inherit"
                            sx={{
                                backgroundColor: '#f0f4f4',
                                borderRadius: '4px',
                                padding: '4px 12px', // Adjust the padding here to increase/decrease the space on the sides
                                color: 'black',
                                marginLeft: '8px', // Add margin to separate from the icon
                                marginRight: '8px',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {userId || name}

                        </Typography>{' '}
                        <Hidden smDown>sveikatos duomenys:</Hidden>
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: '#fff', whiteSpace: 'normal' }}>
                        <Hidden smUp>sveikatos duomenys:</Hidden>
                    </Typography>
                </Grid>
            </Grid>
        </Box >
    );
};
export default CurrentHrTile;
