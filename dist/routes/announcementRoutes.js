"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const announcementController_1 = require("../controllers/announcementController");
const protect_1 = require("../middleware/protect");
const router = express_1.default.Router();
router.get("/", announcementController_1.getAnnouncements);
router.post("/", protect_1.protect, announcementController_1.addAnnouncement);
router.delete("/:id", protect_1.protect, announcementController_1.deleteAnnouncement);
exports.default = router;
//# sourceMappingURL=announcementRoutes.js.map