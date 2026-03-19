"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cellGroupController_1 = require("../controllers/cellGroupController");
const protect_1 = require("../middleware/protect");
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = express_1.default.Router();
router.get('/public', async (req, res) => {
    const cellGroups = await prisma_1.default.cellGroup.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ cellGroups });
});
router.get('/', protect_1.protect, cellGroupController_1.getCellGroups);
router.post('/', protect_1.protect, cellGroupController_1.addCellGroup);
router.put('/:id', protect_1.protect, cellGroupController_1.updateCellGroup);
router.delete('/:id', protect_1.protect, cellGroupController_1.deleteCellGroup);
exports.default = router;
//# sourceMappingURL=cellGroupRoutes.js.map