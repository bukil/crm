import { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    IconButton,
    Chip
} from '@mui/material';
import {
    CloudUpload as UploadIcon,
    Search as SearchIcon,
    TrendingUp as TrendingUpIcon,
    Visibility as VisibilityIcon,
    GetApp as DownloadIcon,
    Description as FileIcon,
    PictureAsPdf as PdfIcon,
    Image as ImageIcon,
    Slideshow as PptIcon,
    TableChart as XlsIcon,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFiles } from '../context/FileContext';
import UploadModal from '../components/UploadModal';

const FileIconComponent = ({ type }) => {
    switch (type) {
        case 'pdf': return <PdfIcon sx={{ color: '#ef4444' }} />;
        case 'image': case 'jpg': case 'png': return <ImageIcon sx={{ color: '#3b82f6' }} />;
        case 'pptx': return <PptIcon sx={{ color: '#f59e0b' }} />;
        case 'xlsx': return <XlsIcon sx={{ color: '#10b981' }} />;
        default: return <FileIcon sx={{ color: '#94a3b8' }} />;
    }
};

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <Card sx={{ aspectRatio: '1/1', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, width: '100%' }}>
                <Avatar sx={{ bgcolor: `${color}15`, color: color, width: 48, height: 48 }}>
                    <Icon />
                </Avatar>
                {change && (
                    <Chip
                        label={change}
                        size="small"
                        sx={{
                            bgcolor: change.startsWith('+') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            color: change.startsWith('+') ? '#10b981' : '#ef4444',
                            fontWeight: 600
                        }}
                    />
                )}
            </Box>
            <Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }} noWrap>
                    {value}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {title}
                </Typography>
            </Box>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    const { files } = useFiles();
    const navigate = useNavigate();
    const [uploadOpen, setUploadOpen] = useState(false);

    const isExpired = (dateStr) => {
        if (!dateStr) return false;
        const today = new Date().toISOString().split('T')[0];
        return dateStr < today;
    };

    // Get recent files (last 4)
    const recentFiles = [...files].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

    return (
        <Box>
            {/* Header Section */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight="700" sx={{ mb: 1 }}>
                        Welcome back, Mukil
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Here's what's happening with your GTM content today.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<SearchIcon />}
                        onClick={() => navigate('/library')}
                        sx={{ borderColor: 'rgba(255,255,255,0.1)', color: 'text.primary' }}
                    >
                        Search Assets
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<UploadIcon />}
                        onClick={() => setUploadOpen(true)}
                        sx={{ px: 3 }}
                    >
                        Upload Content
                    </Button>
                </Box>
            </Box>


            {/* Unified Dashboard Grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 3 }}>
                <Box sx={{ minWidth: 0 }}>
                    <StatCard
                        title="Total Views"
                        value="2,543"
                        change="+12.5%"
                        icon={VisibilityIcon}
                        color="#3b82f6"
                    />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                    <StatCard
                        title="Downloads"
                        value="856"
                        change="+5.2%"
                        icon={DownloadIcon}
                        color="#10b981"
                    />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                    <StatCard
                        title="Active Assets"
                        value={files.length}
                        change="+2"
                        icon={FileIcon}
                        color="#f59e0b"
                    />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                    <StatCard
                        title="Engagement Rate"
                        value="68%"
                        change="+3.1%"
                        icon={TrendingUpIcon}
                        color="#8b5cf6"
                    />
                </Box>
            </Box>

            {/* Main Content Area */}
            {/* Recent Content */}
            <Grid container spacing={3} alignItems="stretch">
                <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0 }}>
                    <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" fontWeight="600">
                                    Recent Collateral
                                </Typography>
                                <Button
                                    endIcon={<ArrowForwardIcon />}
                                    color="inherit"
                                    onClick={() => navigate('/library')}
                                >
                                    View All
                                </Button>
                            </Box>
                            <List>
                                {recentFiles.map((file, index) => (
                                    <Box key={file.id}>
                                        <ListItem
                                            sx={{
                                                px: 0,
                                                py: 2,
                                                '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }
                                            }}
                                            secondaryAction={
                                                <Typography variant="caption" color="text.secondary">
                                                    {file.date}
                                                </Typography>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}>
                                                    <FileIconComponent type={file.type} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="subtitle2" fontWeight="600">
                                                        {file.title}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                                        <Chip label={file.folder} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
                                                        {isExpired(file.expiryDate) && (
                                                            <Chip label="Expired" size="small" color="error" sx={{ height: 20, fontSize: '0.65rem' }} />
                                                        )}
                                                        <Typography variant="caption" color="text.secondary" sx={{ pt: 0.2 }}>
                                                            v{file.version}
                                                        </Typography>
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                        {index < recentFiles.length - 1 && <Divider component="li" />}
                                    </Box>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Quick Actions / Recommended */}
                <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', minWidth: 0 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                                Quick Actions
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<UploadIcon />}
                                    onClick={() => setUploadOpen(true)}
                                    sx={{ justifyContent: 'flex-start', py: 1.5, borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }}
                                >
                                    Upload New Asset
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<SearchIcon />}
                                    onClick={() => navigate('/library')}
                                    sx={{ justifyContent: 'flex-start', py: 1.5, borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }}
                                >
                                    Find Competitor Decks
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ bgcolor: 'primary.dark', color: 'white', flexGrow: 1 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Monthly Focus
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                                Push the new Q4 Enterprise Deck to all qualified prospects this week.
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: 'white',
                                    color: 'primary.main',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                                }}
                                fullWidth
                                onClick={() => navigate('/library')}
                            >
                                Find Deck
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
        </Box >
    );
};

export default Dashboard;
