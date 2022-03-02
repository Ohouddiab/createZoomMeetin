import { Router } from "express";
import { CreateZoomMeeting } from "../controllers/zoom_details.controller";

const zoomMeetingRoute = () => {
  const router = Router();
  router.post("/zoom/meeting", CreateZoomMeeting);

  return router;
};

export { zoomMeetingRoute };
