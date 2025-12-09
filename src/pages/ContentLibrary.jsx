import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    IconButton,
    TextField,
    InputAdornment,
    Chip,
    Menu,
    MenuItem,
    ToggleButton,
    ToggleButtonGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    ListItemIcon,
    ListItemText,
    Avatar
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    GridView as GridViewIcon,
    ViewList as ViewListIcon,
    Description as FileIcon,
    PictureAsPdf as PdfIcon,
    Image as ImageIcon,
    Slideshow as PptIcon,
    TableChart as XlsIcon,
    Share as ShareIcon,
    Download as DownloadIcon,
    Delete as DeleteIcon,
    FilterList as FilterListIcon
} from '@mui/icons-material';
import { useFiles } from '../context/FileContext';
import UploadModal from '../components/UploadModal';
import ShareModal from '../components/ShareModal';

const FileIconComponent = ({ type }) => {
    switch (type) {
        case 'pdf': return <PdfIcon sx={{ color: '#ef4444' }} />; // Red-500
        case 'image': case 'jpg': case 'png': return <ImageIcon sx={{ color: '#3b82f6' }} />; // Blue-500
        case 'pptx': return <PptIcon sx={{ color: '#f59e0b' }} />; // Amber-500
        case 'xlsx': return <XlsIcon sx={{ color: '#10b981' }} />; // Emerald-500
        default: return <FileIcon sx={{ color: '#94a3b8' }} />; // Slate-400
    }
};

const ContentLibrary = () => {
    const { files, deleteFile, downloadFile } = useFiles();
    const [viewMode, setViewMode] = useState('list'); // Default to list for "CRM" feel
    const [searchTerm, setSearchTerm] = useState('');
    const [uploadOpen, setUploadOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // Menu State
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuFile, setMenuFile] = useState(null);

    const filteredFiles = files.filter(f =>
        f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const isExpired = (dateStr) => {
        if (!dateStr) return false;
        const today = new Date().toISOString().split('T')[0];
        return dateStr < today;
    };

    const handleShare = (file) => {
        setSelectedFile(file);
        setShareOpen(true);
    };

    const handleMenuOpen = (event, file) => {
        setAnchorEl(event.currentTarget);
        setMenuFile(file);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuFile(null);
    };

    const handleDelete = () => {
        if (menuFile) {
            deleteFile(menuFile.id);
            handleMenuClose();
        }
    };

    const handleDownload = (file) => {
        downloadFile(file);
        handleMenuClose();
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                    Content Library
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setUploadOpen(true)}
                    sx={{ px: 3, py: 1 }}
                >
                    Add Content
                </Button>
            </Box>

            {/* Filter Bar */}
            <Box sx={{
                display: 'flex',
                gap: 2,
                mb: 4,
                p: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <TextField
                    placeholder="Search content..."
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        sx: {
                            bgcolor: 'transparent',
                            '& fieldset': { border: 'none' }
                        }
                    }}
                    sx={{ flexGrow: 1 }}
                />
                <Button startIcon={<FilterListIcon />} color="inherit" sx={{ borderLeft: '1px solid rgba(255,255,255,0.1)', borderRadius: 0, px: 3 }}>
                    Filter
                </Button>
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(e, newMode) => newMode && setViewMode(newMode)}
                    size="small"
                    sx={{ ml: 1, border: 'none' }}
                >
                    <ToggleButton value="grid" sx={{ border: 'none', borderRadius: 1 }}><GridViewIcon /></ToggleButton>
                    <ToggleButton value="list" sx={{ border: 'none', borderRadius: 1 }}><ViewListIcon /></ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {viewMode === 'grid' ? (
                <Grid container spacing={3}>
                    {filteredFiles.map((file) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={file.id}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
                                    borderColor: 'primary.main'
                                }
                            }}>
                                <Box sx={{
                                    height: 160,
                                    bgcolor: '#0D0F17',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    overflow: 'hidden'
                                }}>
                                    {file.type === 'image' || file.type === 'png' || file.type === 'jpg' ? (
                                        file.content ? (
                                            <img src={file.content} alt={file.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                                        ) : <FileIconComponent type={file.type} />
                                    ) : (
                                        <FileIconComponent type={file.type} />
                                    )}
                                </Box>
                                <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                        <Typography variant="subtitle1" fontWeight="600" noWrap title={file.title} sx={{ color: 'text.primary', maxWidth: '85%' }}>
                                            {file.title}
                                        </Typography>
                                        <IconButton size="small" onClick={(e) => handleMenuOpen(e, file)} sx={{ mt: -0.5, mr: -1 }}>
                                            <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        v{file.version} • {file.size}
                                        {isExpired(file.expiryDate) && (
                                            <Chip label="Expired" size="small" color="error" sx={{ ml: 1, height: 20, fontSize: '0.65rem' }} />
                                        )}
                                    </Typography>
                                    <Box sx={{ mt: 2, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                        {file.tags.slice(0, 3).map(tag => (
                                            <Chip
                                                key={tag}
                                                label={tag}
                                                size="small"
                                                sx={{
                                                    height: 22,
                                                    fontSize: '0.7rem',
                                                    bgcolor: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    color: 'text.secondary'
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </CardContent>
                                <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        startIcon={<ShareIcon />}
                                        onClick={() => handleShare(file)}
                                        disabled={isExpired(file.expiryDate)}
                                        sx={{ borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }}
                                    >
                                        Share
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Created By</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell>Date Added</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredFiles.map((file) => (
                                <TableRow key={file.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{
                                                p: 1,
                                                borderRadius: 1,
                                                bgcolor: 'rgba(255,255,255,0.03)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <FileIconComponent type={file.type} />
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" fontWeight="600" color="text.primary">{file.title}</Typography>
                                                <Typography variant="caption" color="text.secondary">{file.tags.join(', ')}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: 'primary.dark' }}>
                                                {file.uploadedBy.charAt(0)}
                                            </Avatar>
                                            <Typography variant="body2">{file.uploadedBy}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {isExpired(file.expiryDate) ? (
                                            <Chip label="Expired" size="small" color="error" sx={{ height: 24, fontWeight: 600 }} />
                                        ) : (
                                            <Chip label="Active" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontWeight: 600, height: 24 }} />
                                        )}
                                    </TableCell>
                                    <TableCell>{file.size}</TableCell>
                                    <TableCell>{file.date}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleShare(file)} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                                            <ShareIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" onClick={(e) => handleMenuOpen(e, file)} sx={{ color: 'text.secondary' }}>
                                            <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        bgcolor: '#1E202E',
                        border: '1px solid rgba(255,255,255,0.05)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        minWidth: 160
                    }
                }}
            >
                <MenuItem onClick={() => handleDownload(menuFile)} disabled={menuFile && isExpired(menuFile.expiryDate)}>
                    <ListItemIcon><DownloadIcon fontSize="small" sx={{ color: 'text.secondary' }} /></ListItemIcon>
                    <ListItemText>Download</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => { handleShare(menuFile); handleMenuClose(); }} disabled={menuFile && isExpired(menuFile.expiryDate)}>
                    <ListItemIcon><ShareIcon fontSize="small" sx={{ color: 'text.secondary' }} /></ListItemIcon>
                    <ListItemText>Share</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>

            <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
            <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} file={selectedFile} />
        </Box>
    );
};

export default ContentLibrary;
