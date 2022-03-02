"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const zoom_details_route_1 = require("./routes/zoom_details.route");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, zoom_details_route_1.zoomMeetingRoute)());
mongoose_1.default.connect("mongodb://localhost:27017/zoom_details", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (err)
        console.log(err);
    console.log("connected to database");
});
app.listen(3000, () => {
    console.log("server is listening on port 3000");
});
exports.default = app;
