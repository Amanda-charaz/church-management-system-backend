"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const memberController_1 = require("../controllers/memberController");
const protect_1 = require("../middleware/protect");
const router = express_1.default.Router();
router.get("/", protect_1.protect, memberController_1.getMembers);
router.post("/", protect_1.protect, memberController_1.addMember);
router.post("/register", memberController_1.selfRegisterMember);
router.put("/:id/approve", protect_1.protect, memberController_1.approveMember);
router.put("/:id", protect_1.protect, memberController_1.updateMember);
router.delete("/:id", protect_1.protect, memberController_1.deleteMember);
exports.default = router;
//# sourceMappingURL=memberRoutes.js.map