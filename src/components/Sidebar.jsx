import { Box, Drawer, Stack, Chip, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Image from 'next/image';
import emblemIcon from '../../public/Logo.png';
import SidebarItem from './SidebarItem'; // Import SidebarItem component
import Link from 'next/link';

const Sidebar = ({ drawerOpen, drawerToggle, userType }) => {
  // Define default sidebar items
  const defaultSidebarItems = [
    { label: 'Prietaisų skydelis', link: '/UserDashboard' },
    { label: 'Širdies ritmo ataskaitos', link: '/' },
    { label: 'Kiti pranešimai', link: '/settings' },
    { label: 'Dienoraštis', link: '/Journal' },
    // Add more items as needed
  ];

  // Define doctor specific sidebar items (optional)
  const doctorSidebarItems = [
    // Add doctor specific items here
    { label: 'Pagrindinis', link: '/DoctorDashboard' },
    { label: 'Pridėti pacientus', link: '/AssignPatient' },
    // Add more items as needed
  ];

  // Select sidebar items based on userType
  const sidebarItems = userType === 'doctor' ? doctorSidebarItems : defaultSidebarItems;

  return (
    <Box sx={{ position: 'relative', zIndex: 1 }}>
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        ModalProps={{ keepMounted: true, BackdropProps: { invisible: true } }} // Make the backdrop invisible
        elevation={0}
        PaperProps={{
          sx: { width: "235px" },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
          <Link href="/UserDashboard" passHref>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Image src={emblemIcon} alt="ElderHealth Companion Emblem" width={46} height={46} />
              &nbsp;
            </div>
          </Link>
          <Typography variant="h6" sx={{ ml: 1 }}>Meniu</Typography>
        </Box>
        {/* Render the menu items using SidebarItem component */}
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} label={item.label} link={item.link} />
        ))}
        <Stack direction="row" justifyContent="center" sx={{ mt: 'auto', px: 2 }}>
          <Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
        </Stack>
      </Drawer>
    </Box>
  );
};

export default Sidebar;