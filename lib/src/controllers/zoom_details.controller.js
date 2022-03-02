"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateZoomMeeting = void 0;
const zoom_details_model_1 = require("../models/zoom_details.model");
const CreateZoomMeeting = async (req, res) => {
    try {
        const body = req.body;
        const zoomMeetingInput = body;
        const zoom_detailsD = await zoom_details_model_1.zoomDetailsPostSchema.create(zoomMeetingInput);
        return res.status(201).json({ data: zoom_detailsD });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
exports.CreateZoomMeeting = CreateZoomMeeting;
