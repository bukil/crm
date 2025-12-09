import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FileContext = createContext();

const INITIAL_FILES = [
    {
        id: '1',
        title: 'Q4 2025 Sales Deck',
        type: 'pptx',
        size: '2.5 MB',
        uploadedBy: 'Sarah Jenkins',
        date: '2025-10-15',
        tags: ['Sales', 'Q4'],
        folder: 'Presentations',
        version: 'v1.2',
        content: null // Mock files have no real content in this demo unless uploaded
    },
    {
        id: '2',
        title: 'Competitor Analysis - Enterprise',
        type: 'pdf',
        size: '1.2 MB',
        uploadedBy: 'Mike Ross',
        date: '2025-10-20',
        tags: ['Strategy', 'Competitive'],
        folder: 'Internal',
        version: 'v2.0',
        content: null
    },
    {
        id: '3',
        title: 'Product Pricing Sheet',
        type: 'xlsx',
        size: '45 KB',
        uploadedBy: 'Alice Chen',
        date: '2025-11-01',
        tags: ['Sales', 'Pricing'],
        folder: 'Resources',
        version: 'v1.0',
        content: null
    },
    {
        id: '4',
        title: 'SuperAGI Logo Pack',
        type: 'image',
        size: '15 MB',
        uploadedBy: 'Design Team',
        date: '2025-09-10',
        tags: ['Brand', 'Assets'],
        folder: 'Marketing',
        version: 'v1.0',
        content: null
    },
];

export const FileProvider = ({ children }) => {
    const [files, setFiles] = useState(() => {
        const saved = localStorage.getItem('superagi_files');
        return saved ? JSON.parse(saved) : INITIAL_FILES;
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        localStorage.setItem('superagi_files', JSON.stringify(files));
    }, [files]);

    const addFile = (fileObj, metadata) => {
        setUploading(true);

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;

            // Calculate size roughly
            const sizeInBytes = fileObj.size;
            let sizeStr = sizeInBytes + ' B';
            if (sizeInBytes > 1024 * 1024) sizeStr = (sizeInBytes / (1024 * 1024)).toFixed(1) + ' MB';
            else if (sizeInBytes > 1024) sizeStr = (sizeInBytes / 1024).toFixed(1) + ' KB';

            const newFile = {
                id: Math.random().toString(36).substr(2, 9),
                title: metadata.title || fileObj.name,
                type: fileObj.name.split('.').pop().toLowerCase(),
                size: sizeStr,
                uploadedBy: 'You',
                date: new Date().toISOString().split('T')[0],
                tags: metadata.tags,
                folder: 'Unsorted',
                version: 'v1.0',
                expiryDate: metadata.expiryDate,
                content: content // DataURL
            };

            setFiles((prev) => [newFile, ...prev]);
            setUploading(false);
        };
        reader.readAsDataURL(fileObj);
    };

    const deleteFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const getFileById = (id) => {
        return files.find(f => f.id === id);
    };

    const generateShareLink = (fileId, settings) => {
        const baseUrl = window.location.origin + (import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL);
        // Ensure no double slash
        const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        return `${cleanBase}/view/${fileId}?permission=${settings.permission}`;
    };

    const downloadFile = (file) => {
        if (!file.content) {
            alert("This mock file has no real content to download. Try uploading a real file!");
            return;
        }
        const link = document.createElement('a');
        link.href = file.content;
        link.download = file.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <FileContext.Provider value={{ files, addFile, deleteFile, uploading, getFileById, generateShareLink, downloadFile }}>
            {children}
        </FileContext.Provider>
    );
};

FileProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useFiles = () => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error('useFiles must be used within a FileProvider');
    }
    return context;
};
