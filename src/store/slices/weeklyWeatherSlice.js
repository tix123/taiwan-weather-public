import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/setting"

export const fetchWeeklyWeather = createAsyncThunk(
    "weeklyWeather/fetchWeeklyWeather",
    async () => {
        const res = await axios.get(
            config.WEEKLY_WEATHER_URL + "?Authorization="
            + process.env.REACT_APP_WEATHER_AUTHORIZATION +
            "&locationName=" + config.TAIPEI_CHINESE + "," +
            config.TAICHUNG_CHINESE + "," +
            config.KAOHSIUNG_CHINESE + "," +
            config.PINGTUNG_CHINESE + "," +
            config.TAITUNG_CHINESE + "," +
            config.HUALIEN_CHINESE + "," +
            config.CHIAYI_CHINESE + "," +
            config.TAOYUAN_CHINESE + "," +
            config.HSINCHU_CHINESE + "," +
            config.MIAOLI_CHINESE + "," +
            config.CHANGHUA_CHINESE + "," +
            config.YUNLIN_CHINESE + "," +
            config.TAINAN_CHINESE + "," +
            config.YILAN_CHINESE + "," +
            config.NANTOU_CHINESE + "," +
            config.PENGHU_CHINESE + "," +
            config.KINMEN_CHINESE + "," +
            config.MATSU_CHINESE + "," +
            "&elementName=" + config.WEATHER_CODE + "," +
            config.AVG_TEMP_CODE
        );
        return res.data.records.locations[0].location;
    }
);

export const weeklyWeatherSlice = createSlice({
    name: "weeklyWeather",
    initialState: {
        weeklyWeather: null,
        status: config.API_IDLE,
        error: null,
    },
    extraReducers(builder) {
        builder
            // Status of fetch weekly weather
            .addCase(fetchWeeklyWeather.pending, (state, action) => {
                state.status = config.API_LOADING;
            })
            .addCase(fetchWeeklyWeather.fulfilled, (state, action) => {
                state.status = config.API_SUCCESSED;
                state.weeklyWeather = action.payload;
            })
            .addCase(fetchWeeklyWeather.rejected, (state, action) => {
                state.status = config.API_FAILED;
                state.error = action.error.message;
            });
    },

})

export default weeklyWeatherSlice.reducer;