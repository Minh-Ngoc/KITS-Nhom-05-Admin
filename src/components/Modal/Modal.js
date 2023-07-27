import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function BasicModal({ selectedProduct, title, content }) {
    const [open, setOpen] = React.useState(false);
    
     // Set state `selectedProduct` khi nhận được props `selectedProduct` mới
    React.useEffect(() => {
        if (selectedProduct.modal) {
            setOpen(!open);
        }
    }, [selectedProduct.modal]);

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(!open)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
            variant="outlined"
            sx={{
                maxWidth: "80%",
                borderRadius: 'md',
                p: 3,
                boxShadow: 'lg',
            }}
            >
            <ModalClose
                variant="outlined"
                sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.body',
                }}
            />
            <Typography
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
            >
                {title}
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary" component={'span'} variant={'body2'}>
                {content}
            </Typography>
            </Sheet>
        </Modal>
    );
}