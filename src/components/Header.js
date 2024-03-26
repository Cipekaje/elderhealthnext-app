import { Box, styled } from '@mui/material';
import Image from 'next/image';
import emblemIcon from '../../public/Logo.png'; // Adjust the path
import PropTypes from 'prop-types';
import DropDownMenu from './DropDownMenu';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const StyledHeaderBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items at opposite ends
  });

  return (
    <Box display="flex"
         justifyContent="space-between">
      {/* Logo */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, marginRight: '16px' }}>
        <Image src={emblemIcon} alt="ElderHealth Companion Emblem" width={46} height={46} />
      </Box>

      {/* DropDownMenu */}
      <DropDownMenu />
    </Box>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;