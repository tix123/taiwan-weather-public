import * as React from 'react';
import TaiwanReport from '../pages/taiwanReport'
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';

const Dashboard = () => {

    let iconStyle = {
        color: "#fff",
        fontSize: "60px"
    }

    let titleStyle = {
        fontSize: "70px",
        fontStyle: "italic",
        fontWeight: "bold",
        color: "#fff"
    }

    let titlePos = {
        position: "fixed",
        top: "3vh",
        left: "3vw",
        zIndex: 1,
    }

    let techStackPos = {
        position: "fixed",
        bottom: "5vh",
        right: "10vw",
        zIndex: 1,
        height: "300px",
        width: "300px"
    }

    let techStackStyle = {
        fontSize: "55px",
        fontWeight: "bold",
        color: "#fff"
    }

    // CSS for phone screen
    const pc_min_width = useMediaQuery('(min-width:800px)');
    if (!pc_min_width) {
        titlePos = {
            position: "fixed",
            top: "2vh",
            left: "4vw",
            zIndex: 1,
        }

        titleStyle = {
            fontSize: "40px",
            fontStyle: "italic",
            fontWeight: "bold",
            color: "#fff"
        }

        iconStyle = {
            color: "#fff",
            fontSize: "40px"
        }

        techStackPos = {
            position: "fixed",
            bottom: "1vh",
            right: "10vw",
            zIndex: 1,
            height: "150px",
            width: "300px"
        }

        techStackStyle = {
            fontSize: "40px",
            fontWeight: "bold",
            color: "#fff",
            lineHeight: 1
        }
    }

    return (
        <>
            <div style={titlePos} >
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <Typography sx={titleStyle} >
                            Current Weather
                        </Typography>
                        <Typography sx={titleStyle} >
                            for Taiwan
                        </Typography>
                    </Grid>
                    <Grid item >
                        <a href="https://github.com/tix123/taiwan-weather-public" rel="noreferrer" target="_blank">
                            <IconButton sx={iconStyle}>
                                <GitHubIcon fontSize="inherit" />
                            </IconButton>
                        </a>
                        <a href="https://www.linkedin.com/in/sean-chen-canada/" rel="noreferrer" target="_blank">
                            <IconButton sx={iconStyle}>
                                <LinkedInIcon fontSize="inherit" />
                            </IconButton>
                        </a>
                    </Grid>
                </Grid>
            </div>

            <div
                style={techStackPos}>
                <Grid container spacing={1}>
                    <Grid item>
                        <Typography sx={techStackStyle}>
                            Tech Stack
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Chip
                            label="Taiwan open weather API"
                            size="small"
                            color="primary"
                        />
                    </Grid>
                    <Grid item>
                        <Chip
                            label="Google Map API"
                            size="small"
                            color="primary"
                        />
                    </Grid>
                    <Grid item>
                        <Chip
                            label="React.js"
                            size="small"
                            color="primary"
                        />
                    </Grid>
                    <Grid item>
                        <Chip
                            label="JavaScript"
                            size="small"
                            color="primary"
                        />
                    </Grid>
                    <Grid item>
                        <Chip
                            label="HTML"
                            size="small"
                            color="primary"
                        />
                    </Grid>
                    <Grid item>
                        <Chip
                            label="CSS"
                            size="small"
                            color="primary"
                        />
                    </Grid>
                    <Grid item>
                        <Chip
                            label="Material UI"
                            size="small"
                            color="primary"
                        />
                    </Grid>
                    <Grid item>
                        <Chip
                            label="Axios"
                            size="small"
                            color="primary"
                        />
                    </Grid>


                </Grid>
            </div>
            <TaiwanReport />
        </>

    )
}

export default Dashboard;