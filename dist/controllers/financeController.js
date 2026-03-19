"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFinance = exports.updateFinance = exports.getFinance = exports.getFinances = exports.addFinance = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const addFinance = async (req, res) => {
    try {
        const { title, amount, type, description } = req.body;
        const churchId = req.user?.churchId;
        const finance = await prisma_1.default.finance.create({
            data: { title, amount, type, description, churchId: churchId }
        });
        res.status(201).json({ message: 'Finance record added successfully', finance });
    }
    catch (error) {
        console.error('ADD FINANCE ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addFinance = addFinance;
const getFinances = async (req, res) => {
    try {
        const churchId = req.user?.churchId;
        const finances = await prisma_1.default.finance.findMany({
            where: { churchId: churchId },
            orderBy: { createdAt: 'desc' }
        });
        // Calculate totals
        const totalIncome = finances
            .filter(f => f.type === 'INCOME')
            .reduce((sum, f) => sum + f.amount, 0);
        const totalExpense = finances
            .filter(f => f.type === 'EXPENSE')
            .reduce((sum, f) => sum + f.amount, 0);
        const balance = totalIncome - totalExpense;
        res.json({ finances, summary: { totalIncome, totalExpense, balance } });
    }
    catch (error) {
        console.error('GET FINANCES ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getFinances = getFinances;
const getFinance = async (req, res) => {
    try {
        const { id } = req.params;
        const churchId = req.user?.churchId;
        const finance = await prisma_1.default.finance.findFirst({
            where: { id, churchId: churchId }
        });
        if (!finance) {
            return res.status(404).json({ message: 'Finance record not found' });
        }
        res.json({ finance });
    }
    catch (error) {
        console.error('GET FINANCE ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getFinance = getFinance;
const updateFinance = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, type, description } = req.body;
        const churchId = req.user?.churchId;
        const finance = await prisma_1.default.finance.findFirst({
            where: { id, churchId: churchId }
        });
        if (!finance) {
            return res.status(404).json({ message: 'Finance record not found' });
        }
        const updated = await prisma_1.default.finance.update({
            where: { id },
            data: { title, amount, type, description }
        });
        res.json({ message: 'Finance record updated successfully', finance: updated });
    }
    catch (error) {
        console.error('UPDATE FINANCE ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateFinance = updateFinance;
const deleteFinance = async (req, res) => {
    try {
        const { id } = req.params;
        const churchId = req.user?.churchId;
        const finance = await prisma_1.default.finance.findFirst({
            where: { id, churchId: churchId }
        });
        if (!finance) {
            return res.status(404).json({ message: 'Finance record not found' });
        }
        await prisma_1.default.finance.delete({ where: { id } });
        res.json({ message: 'Finance record deleted successfully' });
    }
    catch (error) {
        console.error('DELETE FINANCE ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteFinance = deleteFinance;
//# sourceMappingURL=financeController.js.map