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

    return res.status(201).json({ data: zoom_detailsD });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
