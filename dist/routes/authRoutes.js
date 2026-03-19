"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const protect_1 = require("../middleware/protect");
const router = express_1.default.Router();
router.post('/login', authController_1.login);
router.put('/change-password', protect_1.protect, authController_1.changePassword);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map