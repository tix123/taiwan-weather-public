const config = {}

// Server URL
config.CURRENT_WEATHER_URL = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001"
config.WEEKLY_WEATHER_URL = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091"

// API status
config.API_IDLE = "idle";
config.API_SUCCESSED = "successed";
config.API_LOADING = "loading";
config.API_FAILED = "fialed";

// Map center position
config.CENTER_POSITION = { lat: 23.6, lng: 119.0 };

// Chinese name of cities
config.TAIPEI_CHINESE = "臺北市";
config.TAOYUAN_CHINESE = "桃園市";
config.HSINCHU_CHINESE = "新竹市";
config.MIAOLI_CHINESE = "苗栗縣";
config.TAICHUNG_CHINESE = "臺中市";
config.CHANGHUA_CHINESE = "彰化縣";
config.YUNLIN_CHINESE = "雲林縣";
config.CHIAYI_CHINESE = "嘉義市";
config.TAINAN_CHINESE = "臺南市";
config.KAOHSIUNG_CHINESE = "高雄市";
config.PINGTUNG_CHINESE = "屏東縣";
config.TAITUNG_CHINESE = "臺東縣";
config.HUALIEN_CHINESE = "花蓮縣";
config.YILAN_CHINESE = "宜蘭縣";
config.NANTOU_CHINESE = "南投縣";
config.PENGHU_CHINESE = "澎湖縣";
config.KINMEN_CHINESE = "金門縣";
config.MATSU_CHINESE = "連江縣";

// English name of cities
config.TAIPEI_ENGLISH = "taipei";
config.TAOYUAN_ENGLISH = "taoyuan";
config.HSINCHU_ENGLISH = "hsinchu";
config.MIAOLI_ENGLISH = "miaoli";
config.TAICHUNG_ENGLISH = "taichung";
config.CHANGHUA_ENGLISH = "changhua";
config.YUNLIN_ENGLISH = "yunlin";
config.CHIAYI_ENGLISH = "chiayi";
config.TAINAN_ENGLISH = "tainan";
config.KAOHSIUNG_ENGLISH = "kaohsiung";
config.PINGTUNG_ENGLISH = "pingtung";
config.TAITUNG_ENGLISH = "taitung";
config.HUALIEN_ENGLISH = "hualien";
config.YILAN_ENGLISH = "yilan";
config.NANTOU_ENGLISH = "nantou";
config.PENGHU_ENGLISH = "penghu";
config.KINMEN_ENGLISH = "kinmen";
config.MATSU_ENGLISH = "matsu";

// City position
config.TAIPEI_POSITION = { lat: 24.7, lng: 121.6 }
config.TAICHUNG_POSITION = { lat: 24.0, lng: 120.7 }
config.KAOHSIUNG_POSITION = { lat: 22.5, lng: 120.3 }
config.PINGTUNG_POSITION = { lat: 21.9, lng: 120.8 }
config.TAITUNG_POSITION = { lat: 22.8, lng: 121.2 }
config.HUALIEN_POSITION = { lat: 23.8, lng: 121.6 }
config.CHIAYI_POSITION = { lat: 23.2, lng: 120.2 }

// Weather API parameters
config.WEATHER_CODE = "Wx"
config.MAX_TEMP_CODE = "MaxT"
config.MIN_TEMP_CODE = "MinT"
config.AVG_TEMP_CODE = "T"
config.PRECIPITATION_CODE = "PoP"
config.WEEKLY_WEATHER_CODE = "天氣現象"
config.WEEKLY_AVG_TEMP_CODE = "平均溫度"

// Time change to next city
config.CHANGE_TIME = 5000

module.exports = config