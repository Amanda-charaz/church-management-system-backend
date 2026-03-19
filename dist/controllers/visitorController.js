"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVisitor = exports.updateVisitor = exports.getVisitor = exports.getVisitors = exports.addVisitor = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const addVisitor = async (req, res) => {
    try {
        const { firstName, lastName, phone, email, notes } = req.body;
        let churchId = req.user?.churchId;
        if (!churchId) {
            const church = await prisma_1.default.church.findFirst({
                where: { name: { not: undefined } },
                orderBy: { name: 'asc' }
            });
            churchId = church?.id;
        }
        if (!churchId) {
            return res.status(400).json({ message: 'No church found' });
        }
        const visitor = await prisma_1.default.visitor.create({
            data: { firstName, lastName, phone, email, notes, churchId }
        });
        res.status(201).json({ message: 'Visitor added successfully', visitor });
    }
    catch (error) {
        console.error('ADD VISITOR ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addVisitor = addVisitor;
const getVisitors = async (req, res) => {
    try {
        const churchId = req.user?.churchId;
        const visitors = await prisma_1.default.visitor.findMany({
            where: { churchId: churchId },
            orderBy: { visitDate: 'desc' }
        });
        res.json({ visitors });
    }
    catch (error) {
        console.error('GET VISITORS ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getVisitors = getVisitors;
const getVisitor = async (req, res) => {
    try {
        const { id } = req.params;
        const churchId = req.user?.churchId;
        const visitor = await prisma_1.default.visitor.findFirst({
            where: { id, churchId: churchId }
        });
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.json({ visitor });
    }
    catch (error) {
        console.error('GET VISITOR ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getVisitor = getVisitor;
const updateVisitor = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, phone, email, followUp, notes } = req.body;
        const churchId = req.user?.churchId;
        const visitor = await prisma_1.default.visitor.findFirst({
            where: { id, churchId: churchId }
        });
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        const updated = await prisma_1.default.visitor.update({
            where: { id },
            data: { firstName, lastName, phone, email, followUp, notes }
        });
        res.json({ message: 'Visitor updated successfully', visitor: updated });
    }
    catch (error) {
        console.error('UPDATE VISITOR ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateVisitor = updateVisitor;
const deleteVisitor = async (req, res) => {
    try {
        const { id } = req.params;
        const churchId = req.user?.churchId;
        const visitor = await prisma_1.default.visitor.findFirst({
            where: { id, churchId: churchId }
        });
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        await prisma_1.default.visitor.delete({ where: { id } });
        res.json({ message: 'Visitor deleted successfully' });
    }
    catch (error) {
        console.error('DELETE VISITOR ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteVisitor = deleteVisitor;
//# sourceMappingURL=visitorController.js.map