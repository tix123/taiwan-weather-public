import {
    WiDaySunny,
    WiDayCloudy,
    WiCloudy,
    WiShowers,
    WiStormShowers,
    WiDayShowers,
    WiDayStormShowers,
    WiRainMix,
    WiDayFog,
    WiFog,
    WiSnowflakeCold,
} from 'weather-icons-react';

// Select weather icon by weather code
export const selectWeathIcon = (weatherCode) => {
    switch (weatherCode) {

        case "1":
            return (
                <div>
                    <WiDaySunny size={50} color="DarkOrange" />
                </div>
            )
        case "2":
        case "3":
            return (
                <div style={{ marginTop: "0.5em" }}>
                    <WiDayCloudy size={50} color="DarkOrange" />
                </div>
            )
        case "4":
        case "5":
        case "6":
        case "7":
            return (
                <div style={{ marginTop: "0.25em" }}>
                    <WiCloudy size={50} color="CornflowerBlue" />
                </div>
            )
        case "8":
        case "9":
        case "10":
        case "11":
        case "12":
        case "13":
        case "14":
        case "20":
        case "29":
        case "30":
        case "31":
        case "32":
        case "38":
        case "39":
            return (
                <div>
                    <WiShowers size={50} color="CornflowerBlue" />
                </div>
            )
        case "15":
        case "16":
        case "17":
        case "18":
        case "33":
        case "34":
        case "35":
        case "36":
        case "41":
            return (
                <div>
                    <WiStormShowers size={50} color="CornflowerBlue" />
                </div>
            )
        case "19":
            return (
                <div style={{ marginTop: "0.25em" }}>
                    <WiDayShowers size={50} color="DarkOrange" />
                </div>
            )
        case "21":
        case "22":
            return (
                <div style={{ marginTop: "0.25em" }}>
                    <WiDayStormShowers size={50} color="DarkOrange" />
                </div>
            )
        case "23":
        case "37":
            return (
                <div>
                    <WiRainMix size={50} color="CornflowerBlue" />
                </div>
            )
        case "24":
        case "25":
        case "26":
            return (
                <div style={{ marginTop: "0.25em" }}>
                    <WiDayFog size={50} color="DarkOrange" />
                </div>
            )
        case "27":
        case "28":
            return (
                <div>
                    <WiFog size={50} color="CornflowerBlue" />
                </div>
            )
        case "42":
            return (
                <div>
                    <WiSnowflakeCold size={50} color="CornflowerBlue" />
                </div>
            )

        default:
            console.log("weatherCode", weatherCode)
            break;
    }
}