import { createTheme } from '@mui/material/styles';

const RADIUS = 12; // Standardized Radius for the entire app

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#8b5cf6',
            light: '#a78bfa',
            dark: '#7c3aed',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#10b981',
        },
        background: {
            default: '#0D0F17',
            paper: '#131620',
        },
        text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
        },
        action: {
            hover: 'rgba(139, 92, 246, 0.08)',
            selected: 'rgba(139, 92, 246, 0.16)',
        },
        divider: 'rgba(255, 255, 255, 0.08)',
    },
    typography: {
        fontFamily: '"Outfit", "Inter", "Roboto", sans-serif',
        h4: { fontWeight: 600, letterSpacing: '-0.02em' },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600, letterSpacing: '0.01em' },
        button: { textTransform: 'none', fontWeight: 500, fontSize: '0.95rem' },
    },
    shape: {
        borderRadius: RADIUS,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#0D0F17',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: RADIUS,
                        backgroundColor: '#334155',
                        border: '2px solid #0D0F17',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: RADIUS,
                    boxShadow: 'none',
                    padding: '8px 20px',
                    '&:hover': { boxShadow: 'none' },
                },
                containedPrimary: {
                    backgroundColor: '#7c3aed',
                    '&:hover': { backgroundColor: '#6d28d9' },
                },
                outlined: {
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderWidth: '1px',
                    color: '#e2e8f0',
                    '&:hover': {
                        borderColor: 'rgba(255,255,255,0.3)',
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        borderWidth: '1px',
                    }
                }
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: RADIUS,
                    backgroundImage: 'none',
                    backgroundColor: '#1E202E',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: RADIUS,
                    backgroundImage: 'none',
                    backgroundColor: '#1E202E',
                },
                rounded: {
                    borderRadius: RADIUS,
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderRadius: 0, // Sharp corners for top bar
                    backgroundImage: 'none',
                    backgroundColor: 'rgba(13, 15, 23, 0.8)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRadius: 0, // Sharp corners for sidebar
                    backgroundColor: '#0D0F17', // Seamless look
                    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: RADIUS,
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                    '&.Mui-focused fieldset': { borderColor: '#8b5cf6' },
                },
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: RADIUS,
                    border: '1px solid rgba(255,255,255,0.1)',
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: RADIUS,
                    border: '1px solid rgba(255,255,255,0.1)',
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: { borderRadius: RADIUS }
            }
        },
    },
});

export default theme;
