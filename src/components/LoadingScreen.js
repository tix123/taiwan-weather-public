
// Material UI compoments
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const LoadingScreen = (props) => {

    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.backdropOpen}
        >
            <Typography component="span" variant="h4" color="inherit" mr={2}>
                LOADING
            </Typography>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
export default LoadingScreen