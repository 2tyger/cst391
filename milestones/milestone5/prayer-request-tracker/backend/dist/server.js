"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
// load environment variables
dotenv_1.default.config();
// get port from env or default to 3000 (its set as 3000 in .env but this is a fallback)
const PORT = process.env.PORT || 3000;
// start server
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
