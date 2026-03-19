"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prayerController_1 = require("../controllers/prayerController");
const protect_1 = require("../middleware/protect");
const router = express_1.default.Router();
router.get("/", prayerController_1.getPrayerRequests);
router.post("/", prayerController_1.addPrayerRequest);
router.put("/:id", protect_1.protect, prayerController_1.updatePrayerStatus);
router.delete("/:id", protect_1.protect, prayerController_1.deletePrayerRequest);
exports.default = router;
//# sourceMappingURL=prayerRoutes.js.map