import { Button } from '@mui/material';

const SidebarItem = ({ label, link, selected, onClick }) => {
  return (
    <Button
      fullWidth
      color="inherit"
      variant="text"
      href={link}
      onClick={onClick}
      sx={{
        height: '60px', //
        borderRadius: '10px',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
        ...(selected && {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        }),
      }}
    >
      {label}
    </Button>
  );
};

export default SidebarItem;