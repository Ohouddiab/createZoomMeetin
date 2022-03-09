import { Request, Response } from "express";
import {
  zoomDetailsPostSchema,
  zoom_detalisInterface,
} from "../models/zoom_details.model";
import {
  zoomMeetingPostSchema,
  zoom_meetingInterface,
} from "../models/zoom_meeting.model";
import axios from "axios";

export const CreateZoomMeeting = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const body: zoom_meetingInterface = req.body;
    await zoomMeetingPostSchema.create(body);
    const result: zoom_detalisInterface = await CreateMeetingApi(body, req);
    await zoomDetailsPostSchema.create(result);

    return res.status(201).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const CreateMeetingApi: any = async (
  body: zoom_meetingInterface,
  req: string | any
) => {
  try {
    const token: string = req.headers.token;
    const email: string = "ohoudriyad@gmail.com";
    const result: any = await axios.post(
      "https://api.zoom.us/v2/users/" + email + "/meetings",
      {
        body,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "User-Agent": "Zoom-api-Jwt-Request",
          "content-type": "application/json",
        },
      }
    );
    return result.data;
  } catch (e) {
    throw e;
  }
};
