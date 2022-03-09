"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateZoomMeeting = void 0;
const zoom_details_model_1 = require("../models/zoom_details.model");
const zoom_meeting_model_1 = require("../models/zoom_meeting.model");
const axios_1 = __importDefault(require("axios"));
const CreateZoomMeeting = async (req, res) => {
    try {
        const body = req.body;
        await zoom_meeting_model_1.zoomMeetingPostSchema.create(body);
        const result = await CreateMeetingApi(body, req);
        await zoom_details_model_1.zoomDetailsPostSchema.create(result);
        return res.status(201).json({ data: result });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
exports.CreateZoomMeeting = CreateZoomMeeting;
const CreateMeetingApi = async (body, req) => {
    try {
        const token = req.headers.token;
        const email = "ohoudriyad@gmail.com";
        const result = await axios_1.default.post("https://api.zoom.us/v2/users/" + email + "/meetings", {
            body,
        }, {
            headers: {
                Authorization: "Bearer " + token,
                "User-Agent": "Zoom-api-Jwt-Request",
                "content-type": "application/json",
            },
        });
        return result.data;
    }
    catch (e) {
        throw e;
    }
};
