import React, { useCallback, useEffect, useState } from "react"
import * as Styles from "../styles/styles"
import {
    selectWeathIcon,
    // getWeeklyCondition 
} from "../service/service"
import config from "../config/setting"
import { useSelector, useDispatch } from "react-redux";
import { fetchWeeklyWeather } from "../store/slices/weeklyWeatherSlice";

// Material UI compoments
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";

// City images
import TaipeiImage from "../image/taipei.jpg" // Source: https://www.pexels.com/zh-tw/photo/15097207/
import TaichungImage from "../image/taichung.jpg" // Source: https://www.setn.com/news.aspx?newsid=1234640
import KaohsiungImage from "../image/kaohsiung.jpg"  // Source:  https://pixabay.com/photos/kaohsiung-city-harbor-pier-1742613/
import PingtungImage from "../image/pingtung.jpg" // Source: https://media.taiwan.net.tw/zh-tw/portal/media/details/37972
import TaitungImage from "../image/taitung.jpg" // Source: https://tour.taitung.gov.tw/zh-tw/attraction/details/450
import HaulienImage from "../image/haulien.jpg" // Source: https://tour-hualien.hl.gov.tw/TourContent.aspx?n=79&s=297
import ChiayiImage from "../image/chiayi.jpg" // Source: https://media.taiwan.net.tw/zh-tw/portal/media/details/22470
import TaoyuanImage from "../image/taoyuan.jpg" // Source: https://travel.tycg.gov.tw/zh-tw/travel/attraction/351
import HsinchuImage from "../image/hsinchu.jpg" // Source: https://www.taiwan.net.tw/m1.aspx?sNo=0001109&id=C100_408
import MiaoliImage from "../image/miaoli.jpg" // Source: https://ezgo.coa.gov.tw/zh-TW/Front/AgriTheme/Detail/871
import ChanghuaImage from "../image/changhua.jpg" // Source: https://tourism.chcg.gov.tw/AttractionsContent.aspx
import YunlinImage from "../image/yunlin.jpg" // Source: https://www.businesstoday.com.tw/article/category/183031/post/202111190026/
import TainanImage from "../image/tainan.jpg" // Source: https://www.twtainan.net/zh-tw/attractions/detail/608
import YilanImage from "../image/yilan.jpg" // Source: https://media.taiwan.net.tw/zh-tw/portal/media/details/22459
import NantouImage from "../image/nantou.jpg" // Source: https://www.taiwan.net.tw/m1.aspx?sNo=0001016&id=A12-00299
import PenghuImage from "../image/penghu.jpg" // Source: https://www.penghu-nsa.gov.tw/activities/2021penghubicycle/
import KinmenImage from "../image/kinmen.jpg" // Source: https://kinmen.travel/zh-tw/travel/attraction/512
import MatsuImage from "../image/matsu.jpg" // Source: https://www.taiwan.net.tw/m1.aspx?sno=0042654


const WeeklyWeartherPanel = () => {

    // Redux state setup
    const weeklyWeather = useSelector((state) => state.weeklyWeather.weeklyWeather);
    const apiStatus = useSelector((state) => state.weeklyWeather.status);
    const apiError = useSelector((state) => state.weeklyWeather.error);
    const dispatch = useDispatch();

    const [weeklyCondition, setWeeklyCondition] = useState(null)

    // Handle API response
    useEffect(() => {
        switch (apiStatus) {
            case config.API_IDLE:
                dispatch(fetchWeeklyWeather());
                break;

            case config.API_FAILED:
                console.log(apiError);
                break;

            default:
                break;
        }
    }, [dispatch, apiStatus, apiError]);

    // Control which city information to show
    const [cityIndex, setCityIndex] = useState(0)

    // button function that jump to the next city
    const nextCity = useCallback(() => {
        if (weeklyWeather) {
            if (cityIndex + 1 >= weeklyWeather.length) {
                setCityIndex(0)
            } else {

                setCityIndex(state => state + 1)
            }
        }
    }, [cityIndex, weeklyWeather])

    // button function that jump to the previous city
    const prevCity = useCallback(() => {
        if (weeklyWeather) {
            if (cityIndex - 1 < 0) {
                setCityIndex(weeklyWeather.length - 1)
            } else {
                setCityIndex(state => state - 1)
            }
        }
    }, [cityIndex, weeklyWeather])

    // Auto change to next city 
    useEffect(() => {
        const interval = setInterval(() => {
            nextCity();
        }, config.CHANGE_TIME);
        return () => clearInterval(interval);
    }, [weeklyWeather, cityIndex, nextCity]);

    // Loading pictures
    useEffect(() => {
        const imageList = [
            TaipeiImage,
            TaichungImage,
            KaohsiungImage,
            PingtungImage,
            TaitungImage,
            HaulienImage,
            ChiayiImage,
            TaoyuanImage,
            HsinchuImage,
            MiaoliImage,
            ChanghuaImage,
            YunlinImage,
            TainanImage,
            YilanImage,
            NantouImage,
            PenghuImage,
            KinmenImage,
            MatsuImage,
        ]
        imageList.forEach((image) => {
            new Image().src = image
        });
    }, [])

    // Format data and keep data in state 
    useEffect(() => {
        if (weeklyWeather) {
            const getWeeklyWeatherData = (weatherElement) => {
                let data = {};
                let wx = weatherElement.find(obj => obj.elementName === config.WEATHER_CODE).time.filter(obj => obj.endTime.split(" ")[1] === "18:00:00")
                let avg = weatherElement.find(obj => obj.elementName === config.AVG_TEMP_CODE).time.filter(obj => obj.endTime.split(" ")[1] === "18:00:00")
                data.wx = wx.map((item, index) => ({
                    ...item,
                    elementValue: item.elementValue.concat(avg[index].elementValue[0])
                }))
                return data;
            }

            const getWeeklyCondition = (weatherObj) => {
                let data = {}
                switch (weatherObj.locationName) {
                    case config.TAIPEI_CHINESE:
                        data.name = config.TAIPEI_ENGLISH
                        data.image = TaipeiImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.TAICHUNG_CHINESE:
                        data.name = config.TAICHUNG_ENGLISH
                        data.image = TaichungImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.KAOHSIUNG_CHINESE:
                        data.name = config.KAOHSIUNG_ENGLISH
                        data.image = KaohsiungImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.PINGTUNG_CHINESE:
                        data.name = config.PINGTUNG_ENGLISH
                        data.image = PingtungImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.TAITUNG_CHINESE:
                        data.name = config.TAITUNG_ENGLISH
                        data.image = TaitungImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.HUALIEN_CHINESE:
                        data.name = config.HUALIEN_ENGLISH
                        data.image = HaulienImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.CHIAYI_CHINESE:
                        data.name = config.CHIAYI_ENGLISH
                        data.image = ChiayiImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.TAOYUAN_CHINESE:
                        data.name = config.TAOYUAN_ENGLISH
                        data.image = TaoyuanImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.HSINCHU_CHINESE:
                        data.name = config.HSINCHU_ENGLISH
                        data.image = HsinchuImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.MIAOLI_CHINESE:
                        data.name = config.MIAOLI_ENGLISH
                        data.image = MiaoliImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.CHANGHUA_CHINESE:
                        data.name = config.CHANGHUA_ENGLISH
                        data.image = ChanghuaImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.YUNLIN_CHINESE:
                        data.name = config.YUNLIN_ENGLISH
                        data.image = YunlinImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.TAINAN_CHINESE:
                        data.name = config.TAINAN_ENGLISH
                        data.image = TainanImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.YILAN_CHINESE:
                        data.name = config.YILAN_ENGLISH
                        data.image = YilanImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.NANTOU_CHINESE:
                        data.name = config.NANTOU_ENGLISH
                        data.image = NantouImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.PENGHU_CHINESE:
                        data.name = config.PENGHU_ENGLISH
                        data.image = PenghuImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.KINMEN_CHINESE:
                        data.name = config.KINMEN_ENGLISH
                        data.image = KinmenImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    case config.MATSU_CHINESE:
                        data.name = config.MATSU_ENGLISH
                        data.image = MatsuImage
                        data = { ...data, ...getWeeklyWeatherData(weatherObj.weatherElement) } // Merge data
                        break;

                    default:
                        break;
                }
                return data
            }

            // Transfer weekly weather to weather condition
            if (weeklyWeather) {
                let weeklyData = []
                weeklyWeather.forEach((item) => {
                    let data = getWeeklyCondition(item)
                    weeklyData.push(data)
                })
                setWeeklyCondition(weeklyData)
            }
        }
    }, [weeklyWeather])


    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    // Convert date format
    const dateConvert = (date) => {
        let newDate = weekday[(new Date(date)).getDay()]
        return newDate
    }

    // Remove hover effect of icon button
    const CustomIconButton = styled(IconButton)({
        "&:hover": {
            backgroundColor: "transparent",
        },
    })

    // Panel style
    let weeklyPanelStyle = {
        width: "650px",
        background: "rgba(255,255,255,0.5)",
        borderRadius: "5px",
        overflow: "hidden",
        margin: "auto"
    }

    // Card style
    let weeklyCardStyle = {
        background: "rgba(255,255,255,0.5)",
    }

    // Box style
    let weeklyBoxStyle = {
        padding: "16px"
    }

    // layout adjust for pad screen or phone screen
    const pc_min_width = useMediaQuery("(min-width:1100px)");
    if (!pc_min_width) {
        weeklyPanelStyle = {
            width: "100%",
            overflow: "hidden",
        }

        weeklyCardStyle = {
            boxShadow: "none"
        }

        weeklyBoxStyle = {
            padding: "none"
        }
    }

    return (
        <Box sx={weeklyPanelStyle}>
            {weeklyCondition ? (
                <>
                    {/* City name and switch buttons */}
                    <Box sx={{ width: "100%", position: "relative" }}>
                        <img src={weeklyCondition[cityIndex].image} alt={weeklyCondition[cityIndex].name} style={{ width: "100%" }} />
                        <Stack justifyContent="space-between" direction="row" sx={Styles.panelTitleStyle}>
                            <CustomIconButton color="inherit" size="large" onClick={prevCity}>
                                <ArrowBackIosNewIcon fontSize="inherit" />
                            </CustomIconButton>
                            <Typography variant="h2" align="center" sx={Styles.cityNameStyle}>
                                {weeklyCondition[cityIndex].name}
                            </Typography>
                            <CustomIconButton color="inherit" size="large" onClick={nextCity}>
                                <ArrowForwardIosIcon fontSize="inherit" />
                            </CustomIconButton>
                        </Stack>
                    </Box>

                    <Grid container alignItems="center" justifyContent="space-evenly" mt={1} mb={2}>
                        {weeklyCondition[cityIndex].wx.map((item, index) => {
                            return (
                                <Grid item key={index}>
                                    <Card sx={weeklyCardStyle}>
                                        <Box sx={weeklyBoxStyle}>
                                            <Stack justifyContent="space-between" alignItems="center" sx={{ height: "150px" }}>
                                                <Typography variant="h6">
                                                    {dateConvert(item.startTime.split(" ")[0])}
                                                </Typography>
                                                <Box>
                                                    {selectWeathIcon(item.elementValue[1].value)}
                                                </Box>
                                                <Typography variant="h6">
                                                    {item.elementValue[2].value}{"°C"}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </>
            ) : (
                <></>
            )}

        </Box>
    )
}

export default WeeklyWeartherPanel