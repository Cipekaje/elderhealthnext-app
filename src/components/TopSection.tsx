import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

import Image from 'next/image';
import emblemIcon from '../../public/Logo.png';


//KODAS SKIRTAS VIRSUTINEI SEKCIJAI
const TopSection = () => {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push('/');
    };
    return (
        <>
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Link href="/" passHref>
                    <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={handleLogoClick}>
                        <Image src={emblemIcon} alt="ElderHealth Companion Emblem" width={46} height={46} />
                        &nbsp; 
                        <Typography variant="h6" component="span">ElderHealth Companion</Typography>
                    </div>
                </Link>
            </Grid>
        </Grid>
        <Box borderBottom="1px solid black" width="100%" marginBottom={2} marginTop={1}></Box>
        </>
    );
}
export default TopSection;
