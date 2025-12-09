import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Box,
    Typography,
    InputAdornment,
    IconButton,
    Alert,
} from '@mui/material';
import { ContentCopy as ContentCopyIcon, Check as CheckIcon } from '@mui/icons-material';
import { useFiles } from '../context/FileContext';

const ShareModal = ({ open, onClose, file }) => {
    const { generateShareLink } = useFiles();
    const [shareType, setShareType] = useState('internal');
    const [permission, setPermission] = useState('view');
    const [copied, setCopied] = useState(false);

    const link = file ? generateShareLink(file.id, { type: shareType, permission }) : '';

    const handleCopy = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Share "{file?.title}"</DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 3 }}>
                    <FormControl component="fieldset" sx={{ mb: 3 }}>
                        <FormLabel component="legend">Share with</FormLabel>
                        <RadioGroup row value={shareType} onChange={(e) => setShareType(e.target.value)}>
                            <FormControlLabel value="internal" control={<Radio />} label="Internal Team" />
                            <FormControlLabel value="external" control={<Radio />} label="External Link" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Permissions</FormLabel>
                        <RadioGroup row value={permission} onChange={(e) => setPermission(e.target.value)}>
                            <FormControlLabel value="view" control={<Radio />} label="View Only" />
                            <FormControlLabel value="download" control={<Radio />} label="View & Download" />
                        </RadioGroup>
                    </FormControl>
                </Box>

                <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        SHARE LINK
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={link}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleCopy} edge="end">
                                        {copied ? <CheckIcon color="success" /> : <ContentCopyIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { bgcolor: 'background.default' }
                        }}
                    />
                </Box>

                {shareType === 'external' && (
                    <Alert severity="info" sx={{ mt: 2, bgcolor: 'rgba(2, 136, 209, 0.1)' }}>
                        External users will be able to access this file without logging in.
                    </Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Done</Button>
            </DialogActions>
        </Dialog>
    );
};

ShareModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    file: PropTypes.object,
};

export default ShareModal;
