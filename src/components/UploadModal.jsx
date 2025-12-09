import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    Chip,
    LinearProgress,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useFiles } from '../context/FileContext';

const UploadModal = ({ open, onClose }) => {
    const { addFile } = useFiles();
    const [file, setFile] = useState(null);
    const [metadata, setMetadata] = useState({
        title: '',
        description: '',
        tags: '',
        expiryDate: '',
    });
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setMetadata(prev => ({ ...prev, title: selectedFile.name }));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setMetadata(prev => ({ ...prev, title: droppedFile.name }));
        }
    };

    const handleUpload = () => {
        if (!file) return;

        // Pass real file object and metadata to context
        const fileMetadata = {
            title: metadata.title,
            tags: metadata.tags.split(',').map(t => t.trim()).filter(Boolean),
            expiryDate: metadata.expiryDate || null,
        };

        addFile(file, fileMetadata);

        // Reset local state (closing handled by context success if we wanted, but here we just wait/close)
        setFile(null);
        setMetadata({ title: '', description: '', tags: '', expiryDate: '' });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Upload Content</DialogTitle>
            <DialogContent>
                {!file ? (
                    <Box
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        sx={{
                            border: '2px dashed #475569',
                            borderRadius: 2,
                            p: 5,
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'border-color 0.2s',
                            '&:hover': {
                                borderColor: '#6366f1',
                                bgcolor: 'rgba(99, 102, 241, 0.05)'
                            }
                        }}
                        onClick={() => document.getElementById('file-input').click()}
                    >
                        <input
                            id="file-input"
                            type="file"
                            hidden
                            onChange={handleFileChange}
                        />
                        <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.primary">
                            Drag & Drop or Click to Upload
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Supports PDF, PPTX, DOCX, XLSX, Images
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                            <Typography variant="body1" sx={{ flexGrow: 1, fontWeight: 500 }}>
                                {file.name}
                            </Typography>
                            <Button size="small" color="error" onClick={() => setFile(null)}>
                                Remove
                            </Button>
                        </Box>

                        <TextField
                            fullWidth
                            label="Title"
                            value={metadata.title}
                            onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Tags (comma separated)"
                            placeholder="Sales, Q4, Marketing"
                            value={metadata.tags}
                            onChange={(e) => setMetadata({ ...metadata, tags: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            type="date"
                            label="Expiration Date (Optional)"
                            InputLabelProps={{ shrink: true }}
                            value={metadata.expiryDate}
                            onChange={(e) => setMetadata({ ...metadata, expiryDate: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                    </Box>
                )}
                {uploading && <LinearProgress sx={{ mt: 2 }} />}
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button
                    onClick={handleUpload}
                    variant="contained"
                    disabled={!file || uploading}
                >
                    {uploading ? 'Uploading...' : 'Upload File'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

UploadModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default UploadModal;
