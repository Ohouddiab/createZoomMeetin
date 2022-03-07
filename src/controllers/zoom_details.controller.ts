import { Request, Response } from "express";
import { zoomDetailsPostSchema } from "../models/zoom_details.model";
import {
  zoomMeetingPostSchema,
  zoom_meetingDoc,
} from "../models/zoom_meeting.model";

export const CreateZoomMeeting = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const zoomMeetingInput: zoom_meetingDoc = body;
    await zoomMeetingPostSchema.create(zoomMeetingInput);
    const zoomDetailsInput = await CreateZoomDetails(body, req);
    const CreateZoomDetailsD = await zoomDetailsPostSchema.create(
      zoomDetailsInput
    );
    return res.status(201).json({ data: CreateZoomDetailsD });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const CreateZoomDetails = async (body: zoom_meetingDoc, req: Request) => {
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
  } catch (e) {
    throw e;
  }
};
