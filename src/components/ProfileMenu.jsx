import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { getServerSession } from "next-auth";
import { useSession } from 'next-auth/react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Fade,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';

// assets
import { IconLogout, IconSettings, UserCircle, IconHelp, IconQuote } from '@tabler/icons-react';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const { data: session } = useSession();
  const user = session?.user;
  const { firstName, lastName, birthdate } = user?.userInfo || {};

  console.log(firstName);
  console.log(lastName);
  console.log(birthdate);
  //If small screen, makes the popper position different 
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const transformValue = isMobile ? 'translate(45px, 75px)' : 'translate(288%, 80px)';

  //Logout
  const handleLogout = async () => {
    console.log('Logout');
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    switch (index) {
      case 0: // Paskyros Nustatymai (Settings)
        router.push('/login'); // Change '/settings' to the appropriate route
        break;
      case 1: // Pagalba (Help)
        router.push('/Help'); // Change '/help' to the appropriate route
        break;
      case 2: // Atsiliepimai (Review)
        router.push('/login');// Change '/review' to the appropriate route
        break;
      default:
        break;
    }

  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: "#DCDCDC",
          backgroundColor: "#DCDCDC",
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: "lightgray",
            '& svg': {
              stroke: "#DCDCDC"
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            component={UserCircle}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        sx={{
          position: 'absolute',
          transform: transformValue
        }}
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={9}
              sx={{
                borderRadius: '30px',
                overflow: 'hidden',
                transform: 'translate(-20px, 15px)'
              }}>
              <ClickAwayListener onClickAway={handleClose}>
                <Card elevation={16} sx={{ boxShadow: theme.shadows[16] }}>
                  <CardContent>
                    <Box sx={{ p: 2 }}>
                      <Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Typography variant="h4">Sveiki, </Typography>
                          <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                            {user.name}
                          </Typography>
                        </Stack>
                        <Typography variant="subtitle2">{user.role}</Typography>
                      </Stack>
                      <Divider />
                    </Box>
                    <Box sx={{ p: 1 }}>
                      <List>
                        <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0, '#')}>
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Paskyros Nustatymai</Typography>} />
                        </ListItemButton>

                        <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1, '#')}>
                          <ListItemIcon>
                            <IconHelp stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Pagalba</Typography>} />
                        </ListItemButton>

                        <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2, '#')}>
                          <ListItemIcon>
                            <IconQuote stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Atsiliepimai</Typography>} />
                        </ListItemButton>

                        <ListItemButton selected={selectedIndex === 3} onClick={handleLogout}>
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Atsijungti</Typography>} />
                        </ListItemButton>
                      </List>
                    </Box>
                  </CardContent>
                </Card>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;