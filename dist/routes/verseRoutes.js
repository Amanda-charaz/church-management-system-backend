"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verseController_1 = require("../controllers/verseController");
const router = express_1.default.Router();
router.get('/', verseController_1.getDailyVerse);
exports.default = router;
//# sourceMappingURL=verseRoutes.js.map