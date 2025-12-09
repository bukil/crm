import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Badge,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Folder as FolderIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon,
    Bolt as BoltIcon
} from '@mui/icons-material';

const drawerWidth = 260; // Slightly wider for premium feel

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', px: 3, mb: 2, mt: 1 }}>
                <BoltIcon sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
                <Typography variant="h5" noWrap component="div" sx={{
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#fff'
                }}>
                    SuperAGI
                </Typography>
            </Toolbar>

            <List sx={{ px: 2 }}>
                {[
                    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
                    { text: 'Content Library', icon: <FolderIcon />, path: '/library' },
                    { text: 'Team', icon: <PeopleIcon />, path: '/team' },
                    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
                ].map((item) => {
                    const isSelected = location.pathname === item.path || (item.path === '/' && location.pathname === '/crm/');
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                selected={isSelected}
                                onClick={() => navigate(item.path === '/dashboard' ? '/' : item.path)}
                                sx={{
                                    borderRadius: '8px',
                                    py: 1.5,
                                    '&.Mui-selected': {
                                        bgcolor: 'rgba(139, 92, 246, 0.12)', // Low opacity violet
                                        color: 'primary.main',
                                        '&:hover': {
                                            bgcolor: 'rgba(139, 92, 246, 0.18)',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'primary.main',
                                        }
                                    },
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{
                                    minWidth: 40,
                                    color: isSelected ? 'primary.main' : 'text.secondary'
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isSelected ? 600 : 500,
                                        fontSize: '0.9rem'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="inherit" sx={{ mr: 2 }}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit" sx={{ mr: 2 }}>
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32, fontSize: '0.875rem' }}>MK</Avatar>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    minHeight: '100vh',
                    bgcolor: 'background.default'
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
