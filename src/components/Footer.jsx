import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { IconHelp, IconQuote } from '@tabler/icons-react';
import { useRouter } from 'next/router';

const Footer = () => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                color: theme.palette.text.primary,
                padding: '20px',
                textAlign: 'center',
                position: 'relative',
                bottom: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderTop: `1px solid ${theme.palette.grey[300]}`, // Horizontal line
            }}
        >
            <Typography variant="body2" sx={{ marginRight: '20px', color: theme.palette.grey[500] }}>
                {new Date().getFullYear()} &copy; <span style={{ color: theme.palette.grey[500] }}>ElderHealth Companion</span>
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginRight: '10px' }} onClick={() => router.push('/Help')}>
                <IconHelp sx={{ marginRight: '5px' }} /> Pagalba
            </Typography>
            {/* <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginRight: '10px' }} onClick={() => router.push('/')}>
                <IconQuote sx={{ marginRight: '5px' }} /> Atsiliepimai
            </Typography> */}
        </Box>
    );
};

export default Footer;
