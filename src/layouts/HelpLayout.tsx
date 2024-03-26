import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';

import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';


interface HelpLayoutProps {
    children: React.ReactNode;
  }

const HelpLayout = ({ children }: HelpLayoutProps) => {
    const router = useRouter();
    
}