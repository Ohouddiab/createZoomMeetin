"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoomDetailsPostSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Recurrence = new mongoose_1.Schema({
    end_date_time: String,
    end_times: {
        type: Number,
        default: 1,
        max: 365,
        required: true,
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
    type: { type: Number, enum: [1, 2, 3], required: true },
    weekly_days: {
        type: String,
        default: "1",
        // enum: ["1", "2", "3", "4", "5", "6", "7"],
        required: true,
        validate: {
            validator: function (VALUE) {
                let weekly_days = VALUE.split(",");
                let arr2 = ["1", "2", "3", "4", "5", "6", "7"];
                const containsAll = weekly_days.every((element) => {
                    return arr2.includes(element);
                });
                if (!containsAll)
                    throw `invalid weekly_days`;
            },
        },
    },
});
const Approved_or_denied_countries_or_regions = new mongoose_1.Schema({
    approved_list: [String],
    denied_list: [String],
    enable: Boolean,
    method: { type: String, enum: ["approve", "deny"] },
});
const Authentication_exception = new mongoose_1.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        index: true,
        unique: true,
        sparse: true,
        validate: {
            validator: (email) => email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),
            message: " {VALUE} is invalid email address",
        },
    },
    name: String,
});
const Rooms = new mongoose_1.Schema({
    name: String,
    participants: [String],
});
const Breakout_room = new mongoose_1.Schema({
    enable: Boolean,
    rooms: [Rooms],
});
const Interpreters = new mongoose_1.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        index: true,
        unique: true,
        sparse: true,
        validate: {
            validator: (email) => email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),
            message: " {VALUE} is invalid email address",
        },
    },
    languages: { type: String },
});
const Language_interpretation = new mongoose_1.Schema({
    enable: Boolean,
    interpreters: [Interpreters],
});
const Settings = new mongoose_1.Schema({
    additional_data_center_regions: [String],
    allow_multiple_devices: Boolean,
    alternative_hosts: String,
    alternative_hosts_email_notification: { type: Boolean, default: true },
    approval_type: { type: Number, default: 2, enum: [0, 1, 2] },
    approved_or_denied_countries_or_regions: Approved_or_denied_countries_or_regions,
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
                trim: true,
                required: true,
                index: true,
                unique: true,
                sparse: true,
                validate: {
                    validator: (email) => email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),
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
const Tracking_fields = new mongoose_1.Schema({
    field: { type: String, required: true },
    value: String,
});
const zoom_detailsSchema = new mongoose_1.Schema({
    agenda: { type: String, maxlength: 2000, required: true },
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
            validator: (password) => password.match(/(?=[a-zA-Z0-9@-_*])/),
            message: "{VALUE} is invalid password",
        },
        required: true,
    },
    pre_schedule: { type: Boolean, default: false },
    recurrence: Recurrence,
    schedule_for: String,
    settings: Settings,
    start_time: { type: String, required: true },
    template_id: String,
    timezone: { type: String, required: true },
    topic: { type: String, required: true },
    tracking_fields: [Tracking_fields],
    type: { type: Number, default: 2, enum: [1, 2, 3, 8] },
}, { strict: false, timestamps: true, usePushEach: true });
const zoomDetailsPostSchema = mongoose_1.default.model("zoom_details", zoom_detailsSchema);
exports.zoomDetailsPostSchema = zoomDetailsPostSchema;
