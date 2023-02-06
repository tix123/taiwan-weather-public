import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import config from "../../config/setting"
import { StatusCodes } from 'http-status-codes';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { selectWeathIcon } from "../../service/service"
import { WiRaindrop } from 'weather-icons-react';
import Stack from '@mui/material/Stack';

const TaiwanReport = () => {

    const [taipei, setTaipei] = useState(null)
    const [taichung, setTaichung] = useState(null)
    const [kaohsiung, setKaohsiung] = useState(null)

    // Map center position
    const center = {
        lat: 23.8,
        lng: 120.3                                                                                                                  
    };

    // Position of Taipei report card
    const taipei_pos = {
        lat: 25.4,
        lng: 121.4
    }

    // Position of Taichung report card
    const taichung_pos = {
        lat: 24.0,
        lng: 119.3
    }

    // Position of Kaohsiung report card
    const kaohsiung_pos = {
        lat: 21.7,
        lng: 119.2
    }

    // Get weather data
    useEffect(() => {
        fetchWeather()
    }, [])

    const getData = (weather_obj) => {
        let data = {};
        data.wx = weather_obj.find(obj => obj.elementName == config.WEATHER_CODE).time[0].parameter.parameterValue;
        data.max = weather_obj.find(obj => obj.elementName == config.MAX_TEMP_CODE).time[0].parameter.parameterName;
        data.min = weather_obj.find(obj => obj.elementName == config.MIN_TEMP_CODE).time[0].parameter.parameterName;
        data.pop = weather_obj.find(obj => obj.elementName == config.PRECIPITATION_CODE).time[0].parameter.parameterName;
        return data;
    }

    // Fetch Weather data
    async function fetchWeather() {
        const res = await axios
            .get(
                'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?' +
                'Authorization=' + process.env.REACT_APP_WEATHER_AUTHORIZATION
            )
            .catch(function (error) {
                // handle error
                console.log(error);
            })


        if (res.status == StatusCodes.OK) {

            // Set data of Taipei
            let taipie_res = res.data.records.location.find(item =>
                item.locationName == config.TAIPEI_CHINESE
            );
            let taipei_data = getData(taipie_res.weatherElement)
            setTaipei(taipei_data);

            // Set data of Taichung
            let taichung_res = res.data.records.location.find(item =>
                item.locationName == config.TAICHUNG_CHINESE
            );
            let taichung_data = getData(taichung_res.weatherElement)
            setTaichung(taichung_data);

            // Set data of Kaohsiung
            let kaohsiung_res = res.data.records.location.find(item =>
                item.locationName == config.KAOHSIUNG_CHINESE
            );
            let kaohsiung_data = getData(kaohsiung_res.weatherElement)
            setKaohsiung(kaohsiung_data);
        }
    }

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
            }
        ]
    }

    // Generate report HTML
    const report = (data) => {
        return (
            <Grid
                container
                spacing={0}
                justifyContent="center"
                sx={{ flexGrow: 1, height: "50px", overflow: "hidden" }}
            >
                <Grid item >
                    {selectWeathIcon(data.wx)}
                </Grid>
                <Grid item >
                    <Typography variant="body1">
                        {data.min}{" - "}{data.max}{" ℃"}
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <WiRaindrop size={27} color="blue"/>
                        <Typography variant="body1" align="center" sx={{ color: "blue" }}>
                            {data.pop}{"%"}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        )
    }

    // CSS style for the name of report card
    const nameStyle = {
        fontSize: "25px",
        fontWeight: "bold",
        fontStyle: "italic"
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100vh" }}
            center={center}
            zoom={7}
            options={options}
        >

            { /* info windows for Taipei */}
            <InfoWindow position={taipei_pos}>
                {taipei ? (
                    <>
                        <Typography variant="body1" align="center" sx={nameStyle}>
                            Taipei
                        </Typography>
                        <Divider />
                        {report(taipei)}
                    </>
                ) : (
                    <CircularProgress />
                )}
            </InfoWindow>

            { /* info windows for Taichung */}
            <InfoWindow position={taichung_pos}>
                {taichung ? (
                    <>
                        <Typography variant="body1" align="center" sx={nameStyle}>
                            Taichung
                        </Typography>
                        <Divider />
                        {report(taichung)}
                    </>

                ) : (
                    <CircularProgress />
                )}
            </InfoWindow>

            { /* info windows for Kaohsiung */}
            <InfoWindow position={kaohsiung_pos}>
                {kaohsiung ? (
                    <>
                        <Typography variant="body1" align="center" sx={nameStyle}>
                            Kaohsiung
                        </Typography>
                        <Divider />
                        {report(kaohsiung)}
                    </>
                ) : (
                    <CircularProgress />
                )}
            </InfoWindow>

        </GoogleMap>
    ) : (
        <></>
    )
}

export default TaiwanReport