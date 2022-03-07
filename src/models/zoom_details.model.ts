import mongoose, { Schema, Model, Document } from "mongoose";

type Room = Document & {
  name: string;
  participants: string[];
};
type Breakout_room = Document & {
  enable: boolean;
  rooms: Room[];
};
type Global_dial_in_numbers = Document & {
  city: string;
  country: String;
  country_name: String;
  number: String;
  type: String;
};
type Settings = Document & {
  alternative_hosts: String;
  approval_type: Number;
  audio: String;
  auto_recording: String;
  breakout_room: Breakout_room;
  close_registration: { type: Boolean; default: false };
  cn_meeting: { type: Boolean; default: false };
  enforce_login: Boolean;
  enforce_login_domains: String;
  global_dial_in_countries: [String];
  global_dial_in_numbers: [Global_dial_in_numbers];
  start_time: String;
  start_url: String;
  status: String;
  timezone: String;
  topic: String;
  type: Number;
  uuid: String;
};

type zoom_detalisInterface = Document & {
  duration: Number;
  host_id: String;
  join_url: String;
  settings: Settings;
};

interface zoom_detailsDoc extends mongoose.Model<zoom_detalisInterface> {
  duration: zoom_detalisInterface["duration"];
  host_id: zoom_detalisInterface["host_id"];
  join_url: zoom_detalisInterface["join_url"];
  settings: zoom_detalisInterface["settings"];
}

const Rooms = new Schema({
  name: String,
  participants: [String],
});
const Breakout_room = new Schema({
  enable: Boolean,
  rooms: [Rooms],
});
const Global_dial_in_numbers = new Schema({
  city: String,
  country: String,
  country_name: String,
  number: String,
  type: String,
});
const Settings = new Schema({
  alternative_hosts: String,
  approval_type: Number,
  audio: String,
  auto_recording: String,
  breakout_room: Breakout_room,
  close_registration: { type: Boolean, default: false },
  cn_meeting: { type: Boolean, default: false },
  enforce_login: Boolean,
  enforce_login_domains: String,
  global_dial_in_countries: [String],
  global_dial_in_numbers: [Global_dial_in_numbers],
  start_time: String,
  start_url: String,
  status: String,
  timezone: String,
  topic: String,
  type: Number,
  uuid: String,
});
const zoom_detalisSchema = new Schema(
  {
    duration: Number,
    host_id: String,
    join_url: String,
    settings: Settings,
  },
  { strict: true, timestamps: true }
);
const zoomDetailsPostSchema: Model<zoom_detailsDoc> =
  mongoose.model<zoom_detailsDoc>("zoom_details", zoom_detalisSchema);

export { zoomDetailsPostSchema, zoom_detailsDoc };
