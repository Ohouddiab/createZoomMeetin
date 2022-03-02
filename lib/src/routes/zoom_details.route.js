"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoomMeetingRoute = void 0;
const express_1 = require("express");
const zoom_details_controller_1 = require("../controllers/zoom_details.controller");
const zoomMeetingRoute = () => {
    const router = (0, express_1.Router)();
    router.post("/zoom/meeting", zoom_details_controller_1.CreateZoomMeeting);
    return router;
};
exports.zoomMeetingRoute = zoomMeetingRoute;
