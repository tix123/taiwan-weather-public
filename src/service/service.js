import config from "../config/setting"

// Weather icons
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
} from "weather-icons-react";


// Select weather icon by weather code
export const selectWeathIcon = (weatherCode) => {
    switch (weatherCode) {

        case "1":
        case "01":
            return (
                <div>
                    <WiDaySunny size={50} color="DarkOrange" />
                </div>
            )
        case "2":
        case "3":
        case "02":
        case "03":
            return (
                <div style={{ marginTop: "0.5em" }}>
                    <WiDayCloudy size={50} color="DarkOrange" />
                </div>
            )
        case "4":
        case "5":
        case "6":
        case "7":
        case "04":
        case "05":
        case "06":
        case "07":
            return (
                <div style={{ marginTop: "0.25em" }}>
                    <WiCloudy size={50} color="CornflowerBlue" />
                </div>
            )
        case "8":
        case "9":
        case "08":
        case "09":
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


export const getCurrentCondition = (weatherObj) => {
    let data = {}
    switch (weatherObj.locationName) {
        case config.TAIPEI_CHINESE:
            data.name = config.TAIPEI_ENGLISH
            data.position = config.TAIPEI_POSITION
            data = { ...data, ...getCurrentWeatherData(weatherObj.weatherElement) } // Merge data
            break;

        case config.TAICHUNG_CHINESE:
            data.name = config.TAICHUNG_ENGLISH
            data.position = config.TAICHUNG_POSITION
            data = { ...data, ...getCurrentWeatherData(weatherObj.weatherElement) } // Merge data
            break;

        case config.KAOHSIUNG_CHINESE:
            data.name = config.KAOHSIUNG_ENGLISH
            data.position = config.KAOHSIUNG_POSITION
            data = { ...data, ...getCurrentWeatherData(weatherObj.weatherElement) } // Merge data
            break;

        case config.PINGTUNG_CHINESE:
            data.name = config.PINGTUNG_ENGLISH
            data.position = config.PINGTUNG_POSITION
            data = { ...data, ...getCurrentWeatherData(weatherObj.weatherElement) } // Merge data
            break;

        case config.TAITUNG_CHINESE:
            data.name = config.TAITUNG_ENGLISH
            data.position = config.TAITUNG_POSITION
            data = { ...data, ...getCurrentWeatherData(weatherObj.weatherElement) } // Merge data
            break;

        case config.HUALIEN_CHINESE:
            data.name = config.HUALIEN_ENGLISH
            data.position = config.HUALIEN_POSITION
            data = { ...data, ...getCurrentWeatherData(weatherObj.weatherElement) } // Merge data
            break;

        case config.CHIAYI_CHINESE:
            data.name = config.CHIAYI_ENGLISH
            data.position = config.CHIAYI_POSITION
            data = { ...data, ...getCurrentWeatherData(weatherObj.weatherElement) } // Merge data
            break;

        default:
            break;
    }

    return data
}

const getCurrentWeatherData = (weatherElement) => {
    let data = {};
    data.wx = weatherElement.find(obj => obj.elementName === config.WEATHER_CODE).time[0].parameter.parameterValue;
    data.max = weatherElement.find(obj => obj.elementName === config.MAX_TEMP_CODE).time[0].parameter.parameterName;
    data.min = weatherElement.find(obj => obj.elementName === config.MIN_TEMP_CODE).time[0].parameter.parameterName;
    data.pop = weatherElement.find(obj => obj.elementName === config.PRECIPITATION_CODE).time[0].parameter.parameterName;
    data.avg = Math.round((Number(data.max) + Number(data.min)) / 2)
    return data;
}

