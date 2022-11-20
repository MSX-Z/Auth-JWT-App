import { Alert, AlertTitle, Collapse, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { memo } from "react";

type Props = {
    title: string;
    error: {
        status: boolean;
        message: string;
    }
    onClose: () => void;
}

function AlertBox(props: Props) {
    const { title, error: { status, message }, onClose } = props;
    return (
        <Collapse in={status} orientation='vertical'>
            <Alert
                severity='error'
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={onClose}
                        sx={{
                            my: 'auto'
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            >
                <AlertTitle>{title}</AlertTitle>
                <Typography>{message}</Typography>
            </Alert>
        </Collapse>
    );
}


export default memo(AlertBox);