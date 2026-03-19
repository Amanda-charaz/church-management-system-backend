"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const financeController_1 = require("../controllers/financeController");
const protect_1 = require("../middleware/protect");
const router = express_1.default.Router();
router.get("/", protect_1.protect, financeController_1.getFinances);
router.post("/", protect_1.protect, financeController_1.addFinance);
router.delete("/:id", protect_1.protect, financeController_1.deleteFinance);
exports.default = router;
//# sourceMappingURL=financeRoutes.js.map