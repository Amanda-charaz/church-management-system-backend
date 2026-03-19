"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyVerse = void 0;
const https_1 = __importDefault(require("https"));
const getDailyVerse = async (req, res) => {
    try {
        const options = {
            hostname: 'beta.ourmanna.com',
            path: '/api/v1/get/?format=json&order=daily',
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const apiReq = https_1.default.request(options, (apiRes) => {
            let data = '';
            apiRes.on('data', (chunk) => {
                data += chunk;
            });
            apiRes.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    const verse = {
                        text: parsed.verse.details.text,
                        reference: parsed.verse.details.reference,
                        version: parsed.verse.details.version
                    };
                    res.json({ verse });
                }
                catch (parseError) {
                    res.status(500).json({ message: 'Failed to parse verse data' });
                }
            });
        });
        apiReq.on('error', (error) => {
            console.error('VERSE API ERROR:', error);
            res.status(500).json({ message: 'Failed to fetch verse', error: error.message });
        });
        apiReq.end();
    }
    catch (error) {
        console.error('GET VERSE ERROR:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getDailyVerse = getDailyVerse;
//# sourceMappingURL=verseController.js.map