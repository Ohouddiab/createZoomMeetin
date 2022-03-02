import app from "./src/index";
import serverless from "serverless-http";
export const CreateZoomMeeting = serverless(app);
