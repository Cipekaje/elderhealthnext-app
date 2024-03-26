// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const myMenuItems = [
        { id: 1, type: 'group', title: 'Group 1', children: [{ title: 'Item 1' }, { title: 'Item 2' }] },
        { id: 2, type: 'group', title: 'Group 2', children: [{ title: 'Item 3' }, { title: 'Item 4' }] }
    
    ];

    const navItems = myMenuItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
