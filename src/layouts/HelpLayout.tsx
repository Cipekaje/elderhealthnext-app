import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';

import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';

import TopSection from '@/components/TopSection';
import ContactsMenu from '@/components/ContactsMenu';
import FAQMenu from '@/components/FAQMenu';

interface HelpLayoutProps {
  children: React.ReactNode;
}

const HelpLayout = ({ children }: HelpLayoutProps) => {
  const router = useRouter();

  return (
    <div style={{ height: '100vh', position: 'relative', display: 'flex', flexFlow: 'column' }}>

      <Container style={{ paddingTop: '20px', overflow: 'auto' }}>
        {/* VIRSUTINE SEKCIJA */}
        <Container className='topSectionLayout'>
          <TopSection />
        </Container>

        {/* KONTAKTU SEKCIJA */}
        <ContactsMenu />
        {/* DAZNAI UZDUODAMI KLAUSIMAI */}
        <Container className='FAQSectionLayout'>
          <FAQMenu />
        </Container>
      </Container>
    </div>
  );
};

export default HelpLayout;