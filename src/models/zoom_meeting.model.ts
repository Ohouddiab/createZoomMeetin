import mongoose, { Schema, Model, Document } from "mongoose";

type Recurrence = Document & {
  end_date_time: string;
  end_times: number;
  monthly_day: number;
  monthly_week: number;
  monthly_week_day: number;
  repeat_interval: number;
  type: number;
  weekly_days: string;
};
type Approved_or_denied_countries_or_regions = Document & {
  approved_list: string[];
  denied_list: string[];
  enable: boolean;
  method: string;
};
type Authentication_exception = Document & {
  email: string;
  name: string;
};
type Room = Document & {
  name: string;
  participants: string[];
};
type Breakout_room = Document & {
  enable: boolean;
  rooms: Room[];
};
type Interpreters = Document & {
  email: string;
  languages: string;
};
type Language_interpretation = Document & {
  enable: boolean;
  interpreters: Interpreters[];
};
type Settings = Document & {
  additional_data_center_regions: string[];
  allow_multiple_devices: boolean;
  alternative_hosts: string;
  alternative_hosts_email_notification: boolean;
  approval_type: number;
  approved_or_denied_countries_or_regions: Approved_or_denied_countries_or_regions;
  audio: string;
  authentication_domains: string;
  authentication_exception: Authentication_exception[];
  authentication_option: string;
  auto_recording: string;
  breakout_room: Breakout_room;
  calendar_type: number;
  close_registration: boolean;
  cn_meeting: boolean;
  contact_email: string;
  contact_name: string;
  email_notification: boolean;
  ncryption_type: string;
  focus_mode: boolean;
  global_dial_in_countries: string[];
  host_video: boolean;
  in_meeting: boolean;
  jbh_time: number;
  join_before_host: boolean;
  language_interpretation: Language_interpretation;
  meeting_authentication: boolean;
  meeting_invitees: string[];
  mute_upon_entry: boolean;
  participant_video: boolean;
  private_meeting: boolean;
  registrants_confirmation_email: boolean;
  registrants_email_notification: boolean;
  registration_type: number;
  show_share_button: boolean;
  use_pmi: boolean;
  waiting_room: boolean;
  watermark: boolean;
};
type Tracking_fields = Document & {
  field: string;
  value?: string;
};
// type zoom_meeting = Document & {
//   // [x: string]: any;
//   agenda: string;
//   default_password: boolean;
//   duration: number;
//   password: string;
//   pre_schedule: boolean;
//   recurrence: Recurrence;
//   schedule_for: string;
//   settings: Settings;
//   start_time: string;
//   template_id: string;
//   timezone: string;
//   topic: string;
//   tracking_fields: Tracking_fields[];
//   type: number;
// };

type zoom_meetingInterface = Document & {
  agenda: string;
  default_password: boolean;
  duration: number;
  password: string;
  pre_schedule: boolean;
  recurrence: Recurrence;
  schedule_for: string;
  settings: Settings;
  start_time: string;
  template_id: string;
  timezone: string;
  topic: string;
  tracking_fields: Tracking_fields[];
  type: number;
};

interface zoom_meetingDoc extends mongoose.Model<zoom_meetingInterface> {
  agenda: zoom_meetingInterface["agenda"];
  default_password: zoom_meetingInterface["default_password"];
  duration: zoom_meetingInterface["duration"];
  password: zoom_meetingInterface["password"];
  pre_schedule: zoom_meetingInterface["pre_schedule"];
  recurrence: zoom_meetingInterface["recurrence"];
  schedule_for: zoom_meetingInterface["schedule_for"];
  settings: zoom_meetingInterface["settings"];
  start_time: zoom_meetingInterface["start_time"];
  template_id: zoom_meetingInterface["template_id"];
  timezone: zoom_meetingInterface["timezone"];
  topic: zoom_meetingInterface["topic"];
  tracking_fields: zoom_meetingInterface["tracking_fields"];
  type: zoom_meetingInterface["type"];
}

const Recurrence = new Schema({
  end_date_time: String,
  end_times: {
    type: Number,
    default: 1,
    max: 365,
    required: [true, "end_times is required"],
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  monthly_day: {
    type: Number,
    default: 1,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  monthly_week: { type: Number, enum: [-1, 1, 2, 3, 4] },
  monthly_week_day: { type: Number, enum: [-1, 1, 2, 3, 4, 5, 6, 7] },
  repeat_interval: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  type: { type: Number, enum: [1, 2, 3], required: [true, "type is required"] },
  weekly_days: {
    type: String,
    default: "1",
    // enum: ["1", "2", "3", "4", "5", "6", "7"],
    required: [true, "weekly_days is required"],
    validate: {
      validator: function (VALUE: string) {
        let weekly_days = VALUE.split(",");
        let arr2 = ["1", "2", "3", "4", "5", "6", "7"];
        const containsAll = weekly_days.every((element) => {
          return arr2.includes(element);
        });
        if (!containsAll) throw `invalid weekly_days`;
      },
    },
  },
});
const Approved_or_denied_countries_or_regions = new Schema({
  approved_list: [String],
  denied_list: [String],
  enable: Boolean,
  method: { type: String, enum: ["approve", "deny"] },
});
const Authentication_exception = new Schema({
  email: {
    type: String,
    lowercase: true,
    validate: {
      validator: (email: string) =>
        email.match(
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        ),
      message: " {VALUE} is invalid email address",
    },
  },
  name: String,
});
const Rooms = new Schema({
  name: String,
  participants: [String],
});
const Breakout_room = new Schema({
  enable: Boolean,
  rooms: [Rooms],
});
const Interpreters = new Schema({
  email: {
    type: String,
    lowercase: true,
    validate: {
      validator: (email: string) =>
        email.match(
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        ),
      message: " {VALUE} is invalid email address",
    },
  },
  languages: { type: String },
});
const Language_interpretation = new Schema({
  enable: Boolean,
  interpreters: [Interpreters],
});
const Settings = new Schema({
  additional_data_center_regions: [String],
  allow_multiple_devices: Boolean,
  alternative_hosts: String,
  alternative_hosts_email_notification: { type: Boolean, default: true },
  approval_type: { type: Number, default: 2, enum: [0, 1, 2] },
  approved_or_denied_countries_or_regions:
    Approved_or_denied_countries_or_regions,
  audio: {
    type: String,
    default: "both",
    enum: ["both", "telephony", "voip"],
  },
  authentication_domains: String,
  authentication_exception: [Authentication_exception],
  authentication_option: String,
  auto_recording: {
    type: String,
    default: "none",
    enum: ["local", "cloud", "none"],
  },
  breakout_room: Breakout_room,
  calendar_type: { type: Number, enum: [1, 2] },
  close_registration: { type: Boolean, default: false },
  cn_meeting: { type: Boolean, default: false },
  contact_email: String,
  contact_name: String,
  email_notification: { type: Boolean, default: true },
  encryption_type: { type: String, enum: ["enhanced_encryption", "e2ee"] },
  focus_mode: Boolean,
  global_dial_in_countries: [String],
  host_video: Boolean,
  in_meeting: { type: Boolean, default: false },
  jbh_time: { type: Number, enum: [0, 5, 10] },
  join_before_host: { type: Boolean, default: false },
  language_interpretation: Language_interpretation,
  meeting_authentication: Boolean,
  meeting_invitees: [
    {
      email: {
        type: String,
        lowercase: true,
        validate: {
          validator: (email: string) =>
            email.match(
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
            ),
          message: "invalid email",
        },
      },
    },
  ],
  mute_upon_entry: { type: Boolean, default: false },
  participant_video: Boolean,
  private_meeting: Boolean,
  registrants_confirmation_email: Boolean,
  registrants_email_notification: Boolean,
  registration_type: { type: Number, default: 1, enum: [1, 2, 3] },
  show_share_button: Boolean,
  use_pmi: { type: Boolean, default: false },
  waiting_room: Boolean,
  watermark: { type: Boolean, default: false },
});
const Tracking_fields = new Schema({
  field: { type: String, required: [true, "field is required"] },
  value: String,
});
const zoom_meetingSchema = new Schema(
  {
    agenda: {
      type: String,
      maxlength: 2000,
      required: [true, "agenda is required"],
    },
    default_password: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    password: {
      type: String,
      zoom_detailsuired: true,
      max: 10,
      validate: {
        validator: (password: string) => password.match(/(?=[a-zA-Z0-9@-_*])/),
        message: "{VALUE} is invalid password",
      },
      required: [true, "password is required"],
    },
    pre_schedule: { type: Boolean, default: false },
    recurrence: Recurrence,
    schedule_for: String,
    settings: Settings,
    start_time: { type: String, required: [true, "start_time is required"] },
    template_id: String,
    timezone: { type: String, required: [true, "timezone is required"] },
    topic: {
      type: String, // required: true
      required: [true, "Topic is required"],
    },
    tracking_fields: [Tracking_fields],
    type: { type: Number, default: 2, enum: [1, 2, 3, 8] },
  },
  { strict: true, timestamps: true }
);
const zoomMeetingPostSchema: Model<zoom_meetingDoc> =
  mongoose.model<zoom_meetingDoc>("zoom_meetings", zoom_meetingSchema);

export { zoomMeetingPostSchema, zoom_meetingDoc };
