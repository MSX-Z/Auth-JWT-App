import { Box, CircularProgress } from "@mui/material";
import { memo } from "react";

function Loading(props) {
    const { isLoading } = props;
    if (!isLoading)
        return (<></>);
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 10,
                backgroundColor: 'rgba(0,0,0,0.3)'
            }}
        >
            <CircularProgress sx={{ color: '#4caf50' }} size={60} />
        </Box>
    )
}
export default memo(Loading);