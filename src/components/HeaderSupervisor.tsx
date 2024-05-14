import { Box, Typography, styled, IconButton } from '@mui/material';
import Image from 'next/image';
import emblemIcon from '../../public/Logo.png';
import PropTypes from 'prop-types';
import { Menu as MenuIcon } from '@mui/icons-material';
import ProfileMenu from './ProfileMenu';
import Link from 'next/link';
import { useRouter } from 'next/router';
// ==============================|| HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const router = useRouter();
  const StyledHeaderBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 16px',
    '& > :nth-child(2)': {
      marginLeft: '16px',
    },
  });
  const LogoBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
  });

  const CompanyName = styled(Typography)({
    flexGrow: 1,
    textAlign: 'center',
  });

  return (
    <StyledHeaderBox>
      <LogoBox>
        {/* Logo */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, marginRight: '16px' }}>
          <Link href="/SupervisorDashboard" passHref>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Image src={emblemIcon} alt="ElderHealth Companion Emblem" width={46} height={46} />
              &nbsp;
            </div>
          </Link>
        </Box>

        <IconButton
          color="black"
          aria-label="open drawer"
          edge="start"
          onClick={handleLeftDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
      </LogoBox>

      {/* Text */}
      <CompanyName variant="h6" component="div" color="black">
        ElderHealth Companion
      </CompanyName>

      {/* ProfileMenu */}
      <ProfileMenu />
    </StyledHeaderBox>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;