import { useParams, useSearchParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Container,
    Paper,
    AppBar,
    Toolbar,
    Chip,
    Alert
} from '@mui/material';
import { CloudDownload as CloudDownloadIcon, Visibility as VisibilityIcon, Error as ErrorIcon } from '@mui/icons-material';
import { useFiles } from '../context/FileContext';

const ExternalViewer = () => {
    const { fileId } = useParams();
    const [searchParams] = useSearchParams();
    const { getFileById, downloadFile } = useFiles();

    const permission = searchParams.get('permission') || 'view';
    const file = getFileById(fileId);

    const canDownload = permission === 'download';

    if (!file) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <ErrorIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
                    <Typography variant="h5">File Not Found</Typography>
                    <Typography color="text.secondary">This file may have been deleted or the link is invalid.</Typography>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{
                        background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                        flexGrow: 1
                    }}>
                        SuperAGI
                    </Typography>
                    {canDownload && (
                        <Button
                            variant="contained"
                            startIcon={<CloudDownloadIcon />}
                            onClick={() => downloadFile(file)}
                        >
                            Download
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ py: 8 }}>
                <Paper sx={{ p: 4, textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                        {file.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 4 }}>
                        <Chip label={`Version ${file.version}`} size="small" />
                        <Chip label={file.size} size="small" variant="outlined" />
                    </Box>

                    <Box sx={{
                        width: '100%',
                        flexGrow: 1,
                        minHeight: 300,
                        bgcolor: 'action.hover',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 4,
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        {['image', 'jpg', 'png', 'jpeg', 'gif'].includes(file.type) && file.content ? (
                            <img src={file.content} alt={file.title} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }} />
                        ) : (
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography color="text.secondary" gutterBottom>
                                    No preview available for this file type.
                                </Typography>
                                {canDownload && (
                                    <Button onClick={() => downloadFile(file)}>Download to view</Button>
                                )}
                            </Box>
                        )}
                    </Box>

                    {!canDownload && (
                        <Alert severity="info" icon={<VisibilityIcon />}>
                            You have <strong>View Only</strong> permission for this file.
                        </Alert>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default ExternalViewer;
