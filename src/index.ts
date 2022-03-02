import express from "express";
import mongoose from "mongoose";

import { zoomMeetingRoute } from "./routes/zoom_details.route";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(zoomMeetingRoute());

mongoose.connect(
  "mongodb://localhost:27017/zoom_details",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.log(err);
    console.log("connected to database");
  }
);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
export default app;
