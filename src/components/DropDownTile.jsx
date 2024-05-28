import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Hidden, Select, MenuItem } from '@mui/material';
import UserIcon from '@mui/icons-material/Person';
import { useSession } from 'next-auth/react';

const DropDownTile = ({ color, isLastInRow, userId, onUserChange }) => {
    const tileWidth = 'calc(100%)';
    const tileHeight = 'auto';
    const [selectedUser, setSelectedUser] = useState('');
    const [apiUsersData, setApiUsersData] = useState([]);
    const marginRight = isLastInRow ? '0px' : '20px';

    // debugger;
    const { data: session, update, status } = useSession();
    // update();
    // console.log('status', status);

    const user = session?.user;
    const userIDLOL = session?.user?.id;
    useEffect(() => {
        const fetchData = async () => {
            try {
                // update();
                console.log('userIDLOL', userIDLOL);
                const dataAPI = { userID: userIDLOL };
                console.log('Sending data:', dataAPI);

                const response = await fetch('/api/user/fetch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataAPI),
                });

                if (response.ok) {
                    const { usersData } = await response.json();
                    console.log('Fetched data:', usersData);
                    setApiUsersData(usersData);

                    if (usersData.length > 0 && !selectedUser) {
                        setSelectedUser(usersData[0].id);
                        onUserChange(usersData[0].id);
                    }
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (status === 'authenticated' && userIDLOL) {
            fetchData();
        }
    }, [status]);

    const handleUserChange = (event) => {
        const selectedUserId = event.target.value;
        setSelectedUser(selectedUserId);
        onUserChange(selectedUserId);
    };

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
                        <UserIcon sx={{ marginRight: '10px' }} /> Prižiūrimo
                        <Select
                            value={selectedUser}
                            onChange={handleUserChange}
                            sx={{ backgroundColor: '#f0f4f4', borderRadius: '4px', padding: '4px 12px', color: 'black', marginLeft: '8px', marginRight: '8px' }}
                        >
                            {apiUsersData.map((userData) => (
                                <MenuItem key={userData.id} value={userData.id}>
                                    {userData.firstName}
                                </MenuItem>
                            ))}
                        </Select>
                        <Hidden smDown>sveikatos duomenys:</Hidden>
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: '#fff' }}>
                        <Hidden smUp>sveikatos duomenys:</Hidden>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DropDownTile;
