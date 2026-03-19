"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePrayerRequest = exports.updatePrayerStatus = exports.addPrayerRequest = exports.getPrayerRequests = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getPrayerRequests = async (req, res) => {
    try {
        const requests = await prisma_1.default.prayerRequest.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({ requests });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getPrayerRequests = getPrayerRequests;
const addPrayerRequest = async (req, res) => {
    try {
        const { name, request } = req.body;
        const church = await prisma_1.default.church.findFirst({
            where: { name: { not: undefined } },
            orderBy: { name: 'asc' }
        });
        const prayerRequest = await prisma_1.default.prayerRequest.create({
            data: { name, request, churchId: church.id }
        });
        res.status(201).json({ message: 'Prayer request submitted', prayerRequest });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addPrayerRequest = addPrayerRequest;
const updatePrayerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await prisma_1.default.prayerRequest.update({
            where: { id },
            data: { status }
        });
        res.json({ message: 'Status updated', updated });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updatePrayerStatus = updatePrayerStatus;
const deletePrayerRequest = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.prayerRequest.delete({ where: { id } });
        res.json({ message: 'Prayer request deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.deletePrayerRequest = deletePrayerRequest;
//# sourceMappingURL=prayerController.js.map