"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.addEvent = exports.getEvents = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getEvents = async (req, res) => {
    try {
        const events = await prisma_1.default.event.findMany({
            orderBy: { date: 'asc' }
        });
        res.json({ events });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getEvents = getEvents;
const addEvent = async (req, res) => {
    try {
        const { title, description, date, time, location } = req.body;
        const churchId = req.user?.churchId;
        const event = await prisma_1.default.event.create({
            data: { title, description, date: new Date(date), time, location, churchId: churchId }
        });
        res.status(201).json({ message: 'Event created successfully', event });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addEvent = addEvent;
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.event.delete({ where: { id } });
        res.json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=eventController.js.map