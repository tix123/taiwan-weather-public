import React, { useEffect, useState } from "react"
import { GoogleMap, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import config from "../config/setting"
import { selectWeathIcon, getCurrentCondition } from "../service/service"
import * as Styles from "../styles/styles"
import WeeklyWeartherPanel from "./WeeklyWeartherPanel"
import LoadingScreen from "./LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentWeather } from "../store/slices/currentWeatherSlice";

// Material UI compoments
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";


const TaiwanWeatherReport = () => {

    // Redux state setup
    const currentWeather = useSelector((state) => state.currentWeather.currentWeather);
    const weeklyWeather = useSelector((state) => state.weeklyWeather.weeklyWeather);
    const apiStatus = useSelector((state) => state.currentWeather.status);
    const apiError = useSelector((state) => state.currentWeather.error);
    const dispatch = useDispatch();

    // Control backdrop open
    const [backdropOpen, setBackdropOpen] = useState(false)

    const handleBackdropClose = () => {
        setBackdropOpen(false);
    };
    const handleBackdropOpen = () => {
        setBackdropOpen(true);
    };

    // Show loading backdrop if no weather data
    useEffect(() => {
        if (currentWeather && weeklyWeather) {
            handleBackdropClose()
        } else {
            handleBackdropOpen()
        }
    }, [currentWeather, weeklyWeather])

    // Handle API response
    useEffect(() => {
        switch (apiStatus) {
            case config.API_IDLE:
                dispatch(fetchCurrentWeather());
                break;

            case config.API_FAILED:
                console.log(apiError);
                break;

            default:
                break;
        }
    }, [dispatch, apiStatus, apiError]);

    // weekly container style
    let weeklyContainer = {
        position: "absolute",
        height: "100vh",
        width: "60vw",
        top: 0,
        left: 0,
    }

    // The center postion of Google map 
    let mapCenter = { lat: 23.6, lng: 119.0 };

    // layout adjust for pad screen or phone screen
    const pc_min_width = useMediaQuery("(min-width:1100px)");
    if (!pc_min_width) {
        weeklyContainer = {
            width: "100%",
        }

        mapCenter = { lat: 23.6, lng: 120.9 };

    }

    // Load google map
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        language: "en",
        region: "US"
    })

    // Google map setup
    const options = {
        gestureHandling: "none",  // The map cannot be moved and zoomed
        disableDefaultUI: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
        styles: [
            {
                "featureType": "road",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "administrative",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels",
                "stylers": [
                    { "visibility": "off" }
                ]
            }
        ]
    }

    // Info window options
    const windowOptions = {
        disableAutoPan: true,
    }

    return isLoaded ? (
        <Stack direction="column-reverse">

            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100vh" }}
                center={mapCenter}
                zoom={8}
                options={options}
            >
                {currentWeather ? (
                    <>
                        {currentWeather.map((item, index) => {
                            let currentCondition = getCurrentCondition(item)
                            return (
                                <InfoWindow position={currentCondition.position} key={index} options={windowOptions}>
                                    <Box sx={{ background: "rgba(255,255,255,0.5)" }}>
                                        <Grid
                                            container
                                            spacing={0}
                                            justifyContent="center"
                                            alignItems="center"
                                            sx={Styles.tempGridStyle}
                                        >
                                            <Grid item >
                                                {selectWeathIcon(currentCondition.wx)}
                                            </Grid>
                                            <Grid item >
                                                <Typography variant="h5" align="center" >
                                                    {currentCondition.avg}{"°C"}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Typography variant="h6" align="center" sx={Styles.nameStyle}>
                                            {currentCondition.name}
                                        </Typography>
                                    </Box>
                                </InfoWindow>
                            )
                        })}
                    </>
                ) : (
                    <></>
                )}
            </GoogleMap>

            {/* weekly panel */}
            <Stack sx={weeklyContainer}>
                <WeeklyWeartherPanel />
            </Stack>

            {/* Loading screen */}
            <LoadingScreen
                backdropOpen={backdropOpen}
            />

        </Stack>
    ) : (
        <></>
    )
}

export default TaiwanWeatherReport