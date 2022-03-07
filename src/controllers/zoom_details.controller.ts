import { Request, Response } from "express";
import {
  zoomDetailsPostSchema,
  zoom_detailsDoc,
} from "../models/zoom_details.model";

export const CreateZoomMeeting = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const zoomMeetingInput: zoom_detailsDoc = body;
    const zoom_detailsD = await zoomDetailsPostSchema.create(zoomMeetingInput);
    await checkBody(body);
    return res.status(201).json({ data: zoom_detailsD });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const checkBody = async (body: zoom_detailsDoc) => {
  try {
    body.recurrence.end_date_time
      ? new Date(body.recurrence.end_date_time).toUTCString()
      : body.recurrence.end_date_time;

    if (body.recurrence.repeat_interval <= 3) {
      body.recurrence.monthly_week = 0;
    } else if (body.recurrence.repeat_interval <= 12) {
      body.recurrence.monthly_day = 0;
    } else {
      body.recurrence.monthly_day = 0;
    }
  } catch (e) {
    throw e;
  }
};
