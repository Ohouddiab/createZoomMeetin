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
const Rooms = new mongoose_1.Schema({
    name: String,
    participants: [String],
});
const Breakout_room = new mongoose_1.Schema({
    enable: Boolean,
    rooms: [Rooms],
});
const Global_dial_in_numbers = new mongoose_1.Schema({
    city: String,
    country: String,
    country_name: String,
    number: String,
    type: String,
});
const Settings = new mongoose_1.Schema({
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
const zoom_detalisSchema = new mongoose_1.Schema({
    duration: Number,
    host_id: String,
    join_url: String,
    settings: Settings,
}, { strict: true, timestamps: true });
const zoomDetailsPostSchema = mongoose_1.default.model("zoom_details", zoom_detalisSchema);
exports.zoomDetailsPostSchema = zoomDetailsPostSchema;
