import { Box, Drawer, Stack, Chip, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Image from 'next/image';
import emblemIcon from '../../public/Logo.png';
import SidebarItem from './SidebarItem'; // Import SidebarItem component
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Sidebar = ({ drawerOpen, drawerToggle, selectedUserId }) => {
  // Define your sidebar items here
  const sidebarItems = [
    { label: 'Prietaisų skydelis', link: '/SupervisorDashboard' },
    { label: 'Dienoraštis', link: `/Journal?userId=${selectedUserId}` },
    // Add more items as needed
  ];
  const { data: session } = useSession();
  const user = session?.user;
  const { role } = user?.userInfo || {};
  // console.log("role", role);
  // console.log("testas ar yra", selectedUserId);
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
          <Link href="/SupervisorDashboard" passHref>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Image src={emblemIcon} alt="ElderHealth Companion Emblem" width={46} height={46} />
              &nbsp;
            </div>
          </Link>
          <Typography variant="h6" sx={{ ml: 1 }}>Meniu</Typography>
        </Box>
        {/* Render the menu items using SidebarItem component */}
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} label={item.label} link={item.link} selected={undefined} onClick={undefined} />
        ))}
        <Stack direction="row" justifyContent="center" sx={{ mt: 'auto', px: 2 }}>
          <Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
        </Stack>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
