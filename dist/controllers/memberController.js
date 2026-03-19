"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.approveMember = exports.selfRegisterMember = exports.updateMember = exports.getMember = exports.getMembers = exports.addMember = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const addMember = async (req, res) => {
    try {
        const { firstName, lastName, phone, email, department, status } = req.body;
        const churchId = req.user?.churchId;
        const member = await prisma_1.default.member.create({
            data: { firstName, lastName, phone, email, department, status, churchId: churchId }
        });
        res.status(201).json({ message: 'Member added successfully', member });
    }
    catch (error) {
        console.error('ADD MEMBER ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addMember = addMember;
const getMembers = async (req, res) => {
    try {
        const churchId = req.user?.churchId;
        const members = await prisma_1.default.member.findMany({
            where: { churchId: churchId },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ members });
    }
    catch (error) {
        console.error('GET MEMBERS ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getMembers = getMembers;
const getMember = async (req, res) => {
    try {
        const { id } = req.params;
        const churchId = req.user?.churchId;
        const member = await prisma_1.default.member.findFirst({
            where: { id, churchId: churchId }
        });
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.json({ member });
    }
    catch (error) {
        console.error('GET MEMBER ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getMember = getMember;
const updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, phone, email, department, status } = req.body;
        const churchId = req.user?.churchId;
        const member = await prisma_1.default.member.findFirst({
            where: { id, churchId: churchId }
        });
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        const updated = await prisma_1.default.member.update({
            where: { id },
            data: { firstName, lastName, phone, email, department, status }
        });
        res.json({ message: 'Member updated successfully', member: updated });
    }
    catch (error) {
        console.error('UPDATE MEMBER ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateMember = updateMember;
const selfRegisterMember = async (req, res) => {
    try {
        const { firstName, lastName, phone, email, address, department, baptized } = req.body;
        const church = await prisma_1.default.church.findFirst({
            where: { name: { not: undefined } },
            orderBy: { name: 'asc' }
        });
        if (!church) {
            return res.status(400).json({ message: 'No church found' });
        }
        const member = await prisma_1.default.member.create({
            data: {
                firstName, lastName, phone, email, address,
                department, baptized: baptized === true || baptized === 'true',
                approved: false,
                churchId: church.id
            }
        });
        res.status(201).json({ message: 'Registration submitted successfully', member });
    }
    catch (error) {
        console.error('SELF REGISTER ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.selfRegisterMember = selfRegisterMember;
const approveMember = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await prisma_1.default.member.update({
            where: { id },
            data: { approved: true }
        });
        res.json({ message: 'Member approved', member });
    }
    catch (error) {
        console.error('APPROVE MEMBER ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.approveMember = approveMember;
const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        const churchId = req.user?.churchId;
        const member = await prisma_1.default.member.findFirst({
            where: { id, churchId: churchId }
        });
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        await prisma_1.default.member.delete({ where: { id } });
        res.json({ message: 'Member deleted successfully' });
    }
    catch (error) {
        console.error('DELETE MEMBER ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteMember = deleteMember;
//# sourceMappingURL=memberController.js.map