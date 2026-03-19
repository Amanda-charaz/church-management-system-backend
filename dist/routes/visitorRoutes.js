"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const visitorController_1 = require("../controllers/visitorController");
const protect_1 = require("../middleware/protect");
const router = express_1.default.Router();
router.get("/", protect_1.protect, visitorController_1.getVisitors);
router.post("/", visitorController_1.addVisitor);
exports.default = router;
//# sourceMappingURL=visitorRoutes.js.map