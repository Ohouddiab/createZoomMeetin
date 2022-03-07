"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateZoomMeeting = void 0;
const zoom_details_model_1 = require("../models/zoom_details.model");
const zoom_meeting_model_1 = require("../models/zoom_meeting.model");
const CreateZoomMeeting = async (req, res) => {
    try {
        const body = req.body;
        const zoomMeetingInput = body;
        await zoom_meeting_model_1.zoomMeetingPostSchema.create(zoomMeetingInput);
        const zoomDetailsInput = await CreateZoomDetails(body, req);
        const CreateZoomDetailsD = await zoom_details_model_1.zoomDetailsPostSchema.create(zoomDetailsInput);
        return res.status(201).json({ data: CreateZoomDetailsD });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
exports.CreateZoomMeeting = CreateZoomMeeting;
const CreateZoomDetails = async (body, req) => {
    try {
        let result = {
            start_time: Date.now(),
            duration: body.duration,
            host_id: req.headers.userId,
            join_url: `https://zoom.us/j/${req.headers.userid}`,
            settings: {
                alternative_hosts: body.settings.alternative_hosts,
                approval_type: body.settings.approval_type,
                audio: body.settings.audio,
                auto_recording: body.settings.auto_recording,
                breakout_room: body.settings.breakout_room,
                close_registration: body.settings.close_registration,
                cn_meeting: body.settings.cn_meeting,
                enforce_login: false,
                //status from Create a webinar service
                enforce_login_domains: "",
                global_dial_in_countries: body.settings.global_dial_in_countries,
                global_dial_in_numbers: [],
                start_time: body.start_time,
                start_url: `https://zoom.us/s/${req.headers.userid}`,
                //status from Create a recording registrant service
                status: "waiting",
                timezone: body.timezone,
                topic: body.topic,
                type: body.type,
                //genrated in some service
                uuid: "ng1MzyWNQaObxcf3+Gfm6A==",
            },
        };
        return result;
    }
    catch (e) {
        throw e;
    }
};
