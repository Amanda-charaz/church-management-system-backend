"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCellGroup = exports.updateCellGroup = exports.addCellGroup = exports.getCellGroups = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getCellGroups = async (req, res) => {
    try {
        const churchId = req.user?.churchId;
        const cellGroups = await prisma_1.default.cellGroup.findMany({
            where: { churchId: churchId },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ cellGroups });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getCellGroups = getCellGroups;
const addCellGroup = async (req, res) => {
    try {
        const { name, leader, location, meetingDay, meetingTime } = req.body;
        const churchId = req.user?.churchId;
        const cellGroup = await prisma_1.default.cellGroup.create({
            data: { name, leader, location, meetingDay, meetingTime, churchId: churchId }
        });
        res.status(201).json({ message: 'Cell group created', cellGroup });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addCellGroup = addCellGroup;
const updateCellGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, leader, location, meetingDay, meetingTime } = req.body;
        const cellGroup = await prisma_1.default.cellGroup.update({
            where: { id },
            data: { name, leader, location, meetingDay, meetingTime }
        });
        res.json({ message: 'Cell group updated', cellGroup });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateCellGroup = updateCellGroup;
const deleteCellGroup = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.cellGroup.delete({ where: { id } });
        res.json({ message: 'Cell group deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteCellGroup = deleteCellGroup;
//# sourceMappingURL=cellGroupController.js.map