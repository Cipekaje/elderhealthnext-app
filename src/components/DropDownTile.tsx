import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Hidden, Select, MenuItem } from '@mui/material';
import UserIcon from '@mui/icons-material/Person';
import { useSession } from 'next-auth/react';

const DropDownTile = ({ color, isLastInRow, userId, onUserChange }) => {
    const tileWidth = 'calc(100%)';
    const tileHeight = 'auto';
    const [selectedUser, setSelectedUser] = useState('');
    const [apiUsersData, setApiUsersData] = useState<{ id: number; firstName: string; lastName: string; email: string; }[]>([]);
    const marginRight = isLastInRow ? '0px' : '20px';

    const { data: session } = useSession();
    const user = session?.user;

    const name = user?.name || '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataAPI = { userID: userId };
                console.log('Supervisor ID in frontend:', dataAPI);
                const response = await fetch('/api/user/fetch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataAPI),
                });

                if (response.ok) {
                    const { usersData } = await response.json();
                    console.log('Users Data:', usersData);
                    setApiUsersData(usersData); // Update apiUsersData state with fetched users

                    // Set the default selected user to the first user's name in the array
                    if (usersData.length > 0) {
                        setSelectedUser(usersData[0].firstName);
                        onUserChange(usersData[0].id);
                    }
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [userId]);

    const handleUserChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedUser(event.target.value);
        const selectedUserId = event.target.value;
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
                width: 'calc(100%)',
                height: 'auto',
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
                            {/* Actual options */}
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
