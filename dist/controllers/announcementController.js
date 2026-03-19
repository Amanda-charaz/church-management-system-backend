"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnnouncement = exports.updateAnnouncement = exports.getAnnouncement = exports.getAnnouncements = exports.addAnnouncement = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const addAnnouncement = async (req, res) => {
    try {
        const { title, content } = req.body;
        const churchId = req.user?.churchId;
        const announcement = await prisma_1.default.announcement.create({
            data: { title, content, churchId: churchId }
        });
        res.status(201).json({ message: 'Announcement created successfully', announcement });
    }
    catch (error) {
        console.error('ADD ANNOUNCEMENT ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addAnnouncement = addAnnouncement;
const getAnnouncements = async (req, res) => {
    try {
        const churchId = req.user?.churchId;
        const announcements = await prisma_1.default.announcement.findMany({
            where: { churchId: churchId },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ announcements });
    }
    catch (error) {
        console.error('GET ANNOUNCEMENTS ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getAnnouncements = getAnnouncements;
const getAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const churchId = req.user?.churchId;
        const announcement = await prisma_1.default.announcement.findFirst({
            where: { id, churchId: churchId }
        });
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        res.json({ announcement });
    }
    catch (error) {
        console.error('GET ANNOUNCEMENT ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getAnnouncement = getAnnouncement;
const updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const churchId = req.user?.churchId;
        const announcement = await prisma_1.default.announcement.findFirst({
            where: { id, churchId: churchId }
        });
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        const updated = await prisma_1.default.announcement.update({
            where: { id },
            data: { title, content }
        });
        res.json({ message: 'Announcement updated successfully', announcement: updated });
    }
    catch (error) {
        console.error('UPDATE ANNOUNCEMENT ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateAnnouncement = updateAnnouncement;
const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const churchId = req.user?.churchId;
        const announcement = await prisma_1.default.announcement.findFirst({
            where: { id, churchId: churchId }
        });
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        await prisma_1.default.announcement.delete({ where: { id } });
        res.json({ message: 'Announcement deleted successfully' });
    }
    catch (error) {
        console.error('DELETE ANNOUNCEMENT ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteAnnouncement = deleteAnnouncement;
//# sourceMappingURL=announcementController.js.map