import express from "express";
import getGeoLocation from "./src/services/getGeoLocation.js";
import dotenv from "dotenv";
import {
  getCurrentWeather,
  getNextWeekWeather,
} from "./src/services/getWeather.js";
import cors from "cors";
dotenv.config({ path: "./src/configs/.env" });

const app = express();
app.use(cors());

app.get("/weather/current", async (req, res) => {
  const locationInfo = await getGeoLocation("Dallas");
  const currentWeatherInfo = await getCurrentWeather(locationInfo);
  res.send(JSON.stringify(currentWeatherInfo));
});

app.get("/weather/nextweek", async (req, res) => {
  const locationInfo = await getGeoLocation("Dallas");
  const nextWeekWeatherInfo = await getNextWeekWeather(locationInfo);
  res.send(JSON.stringify(nextWeekWeatherInfo));
});

app.listen("4000", () => {
  console.log("server running on port 4000");
});
