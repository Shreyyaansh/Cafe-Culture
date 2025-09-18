import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminShortcut = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Only prevent default for Ctrl+Shift+A combination
            if (event.ctrlKey && event.shiftKey && event.code === 'KeyA') {
                event.preventDefault();
                navigate('/admin', { state: { fromShortcut: true } });
                return;
            }

        };

        // Add event listener
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [navigate]);


    return null; // No visible elements - completely hidden
};

export default AdminShortcut;
