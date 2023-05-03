import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/setting"

export const fetchCurrentWeather = createAsyncThunk(
    "currentWeather/fetchCurrentWeather",
    async () => {
        const res = await axios.get(
            config.CURRENT_WEATHER_URL + "?Authorization="
            + process.env.REACT_APP_WEATHER_AUTHORIZATION +
            "&locationName=" +
            config.TAIPEI_CHINESE + "," +
            config.TAICHUNG_CHINESE + "," +
            config.KAOHSIUNG_CHINESE + "," +
            config.PINGTUNG_CHINESE + "," +
            config.TAITUNG_CHINESE + "," +
            config.HUALIEN_CHINESE + "," +
            config.CHIAYI_CHINESE + "," +
            "&elementName=" + config.WEATHER_CODE + "," +
            config.MAX_TEMP_CODE + "," +
            config.MIN_TEMP_CODE + "," +
            config.PRECIPITATION_CODE
        );
        return res.data.records.location;
    }
);

export const currentWeatherSlice = createSlice({
    name: "currentWeather",
    initialState: {
        currentWeather: null,
        status: config.API_IDLE,
        error: null,
    },
    extraReducers(builder) {
        builder
            // Status of fetch current weather
            .addCase(fetchCurrentWeather.pending, (state, action) => {
                state.status = config.API_LOADING;
            })
            .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
                state.status = config.API_SUCCESSED;
                state.currentWeather = action.payload;
            })
            .addCase(fetchCurrentWeather.rejected, (state, action) => {
                state.status = config.API_FAILED;
                state.error = action.error.message;
            });
    },
})

export default currentWeatherSlice.reducer;