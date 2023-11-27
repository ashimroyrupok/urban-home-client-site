import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Container, Fade,  Menu, MenuItem } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import "./Navbar.css"
import useAuth from '../../Hooks/useAuth';

const drawerWidth = 240;
// const navItems = ['Home', 'All Properties', 'Dashboard'];

function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const { user, Logout } = useAuth()

    console.log(user);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                <div id='home' className='flex flex-col gap-4'>
                    <NavLink to='/' className='navItem' > Home </NavLink>
                    <NavLink to='/allProperties' className='navItem'> All Properties </NavLink>
                    <NavLink to='/dashboard/profile' className='navItem'> Dashboard </NavLink>
                </div>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    // drop down
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);

    };

    // logout
    const handleLogout = () => {
        Logout()
            .then(() => {

            })
            .catch(err => {
                console.log(err.message);
            })
        // console.log("hello");
    }


    return (

        <div className='fixed  z-10 bg-opacity-30 max-w-screen-xl mx-auto'>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar sx={{ backgroundColor: 'white', color: 'black' }} component="nav">
                    <Container maxWidth="lg">

                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { sm: 'none' } }}
                            >
                                <MenuIcon sx={{ color: "#F2561B" }} />
                            </IconButton>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1,fontWeight:800, display: { xs: 'none', sm: 'block' } }}
                            >
                                Urban <span className='text-[#F2561B]'>Home</span>
                            </Typography>
                            <Box sx={{ display: { xs: 'none', sm: 'block' }  }}>

                                <div id='home' className='flex gap-4 mr-[80px] lg:mr-[300px]'>
                                    <NavLink to='/' className='navItem' > Home </NavLink>
                                    <NavLink to='/allProperties' className='navItem'> All Properties </NavLink>
                                    <NavLink to='/dashboard/profile' className='navItem'> Dashboard </NavLink>
                                </div>

                            </Box>
                            <div className='flex justify-end w-full md:w-14'>

                                {
                                    user?.email ?
                                        <div> <Avatar
                                            onClick={handleClick}
                                            alt="Remy Sharp"
                                            src={user?.photoURL}
                                            sx={{ width: 56, height: 56 }}
                                        />

                                            <Menu
                                                id="fade-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': 'fade-button',
                                                }}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                TransitionComponent={Fade}
                                            >
                                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                            </Menu>

                                            <div>
                                            </div>
                                        </div> :
                                        <Link to='/login'>  <button className=' border-2 rounded-lg px-3 py-2 hover:text-[#F2561B] border-[#F2561B] mx-8'> Login </button> </Link>

                                }
                            </div>
                        </Toolbar>

                    </Container>
                </AppBar>
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Box>
        </div>

    );
}



export default Navbar;
