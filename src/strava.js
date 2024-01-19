"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var dotenv = require("dotenv");
// 1: Go to https://www.strava.com/oauth/authorize?client_id=95833&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all and click authorise various rights. to add more permissions, update the scope param!
// 2: Once authorised, take the param 'code' from this and pass it in a request with client_id and client_secret to:
// https://www.strava.com/api/v3/oauth/token?client_id=REDACTED&client_secret=REDACTED&code=REDACTED&grant_type=authorization_code
// 3: This returns a refresh token and access token. The refresh token expires after 6 hours. To get a new one, make a request to here:
// `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${process.env.STRAVA_REFRESH_TOKEN}`;
// If the refresh token expires soon or has expired, a new one is returned.
// Specify the filename when calling config()
dotenv.config({ path: '.env.local' });
var getAccessToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, response, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                url = "https://www.strava.com/api/v3/oauth/token?client_id=".concat(process.env.STRAVA_CLIENT_ID, "&client_secret=").concat(process.env.STRAVA_CLIENT_SECRET, "&grant_type=refresh_token&refresh_token=").concat(process.env.STRAVA_REFRESH_TOKEN);
                return [4 /*yield*/, axios_1.default.post(url)];
            case 1:
                response = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                if ((0, axios_1.isAxiosError)(error_1)) {
                    console.log((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getActivities = function () { return __awaiter(void 0, void 0, void 0, function () {
    var config, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                config = {
                    method: 'get',
                    url: 'https://www.strava.com/api/v3/athlete/activities',
                    headers: {
                        Authorization: "Bearer ".concat(process.env.STRAVA_ACCESS_TOKEN),
                    },
                };
                return [4 /*yield*/, (0, axios_1.default)(config)];
            case 1:
                response = _a.sent();
                console.log(response.data);
                return [2 /*return*/, response.data];
            case 2:
                error_2 = _a.sent();
                if ((0, axios_1.isAxiosError)(error_2)) {
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getDistances = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, runActivities, distances, totalDistance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getActivities()];
            case 1:
                result = _a.sent();
                runActivities = result.filter(function (activity) {
                    return activity.type === 'VirtualRun' || activity.type === 'Run';
                });
                distances = runActivities.map(function (activity) { return activity.distance; });
                totalDistance = distances.reduce(function (accumulator, currentValue) { return accumulator + currentValue; });
                console.log(totalDistance);
                return [2 /*return*/];
        }
    });
}); };
getDistances();
