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
        while (_) try {
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
exports.__esModule = true;
exports.handler = void 0;
var asana_1 = require("asana");
var SynchronizationEngine_1 = require("./core/SynchronizationEngine");
var AsanaActionFactory_1 = require("./core/actions/AsanaActionFactory");
var GithubWebhookClient_1 = require("./core/GithubWebhookClient");
var security_1 = require("./lib/security");
var config_1 = require("./config");
var asanaAccessToken = process.env.ASANA_ACCESS_TOKEN;
var githubToken = process.env.GITHUB_TRIGGER_TOKEN;
var apiAccessToken = process.env.API_ACCESS_TOKEN;
var handler = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var asanaClient, githubWebhookClient, actionFactory, synchronizationEngine, log, log, log, log, log, log, log, pullRequest, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                asanaClient = asana_1["default"].Client.create({
                    defaultHeaders: { 'asana-enable': 'string_ids,new_sections' }
                }).useAccessToken(asanaAccessToken);
                githubWebhookClient = new GithubWebhookClient_1["default"](githubToken);
                actionFactory = new AsanaActionFactory_1["default"](asanaClient);
                synchronizationEngine = new SynchronizationEngine_1["default"](config_1["default"], actionFactory, asanaClient);
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                if (!event) {
                    log = 'Event was undefined! Nothing to process.';
                    console.warn(log);
                    return [2 /*return*/, {
                            statusCode: 500,
                            body: log,
                            logStreamName: context.logStreamName
                        }];
                }
                console.log('Event:');
                console.log(JSON.stringify(event));
                if (!asanaAccessToken) {
                    log = 'No ASANA_ACCESS_TOKEN found!';
                    console.warn(log);
                    return [2 /*return*/, {
                            statusCode: 403,
                            body: log,
                            logStreamName: context.logStreamName
                        }];
                }
                if (!githubToken) {
                    log = 'No GITHUB_TRIGGER_TOKEN found!';
                    console.warn(log);
                    return [2 /*return*/, {
                            statusCode: 403,
                            body: log,
                            logStreamName: context.logStreamName
                        }];
                }
                if (!apiAccessToken) {
                    log = 'No API_ACCESS_TOKEN found!';
                    console.warn(log);
                    return [2 /*return*/, {
                            statusCode: 403,
                            body: log,
                            logStreamName: context.logStreamName
                        }];
                }
                if (((_b = (_a = event.requestContext) === null || _a === void 0 ? void 0 : _a.http) === null || _b === void 0 ? void 0 : _b.method) !== 'POST') {
                    log = 'Please use POST!';
                    console.warn(log);
                    return [2 /*return*/, {
                            statusCode: 405,
                            body: log,
                            logStreamName: context.logStreamName
                        }];
                }
                if (event.headers['x-github-event'] !== 'pull_request') {
                    log = 'Only allow github events of pull request!';
                    console.warn(log);
                    return [2 /*return*/, {
                            statusCode: 403,
                            body: log,
                            logStreamName: context.logStreamName
                        }];
                }
                if (!security_1.verifySignature(apiAccessToken, event.headers['x-hub-signature'], event.body)) {
                    log = JSON.stringify("API_ACCESS_TOKEN is incorrect! event.body: '" + event.body + "'");
                    console.warn(log);
                    return [2 /*return*/, {
                            statusCode: 403,
                            body: log,
                            logStreamName: context.logStreamName
                        }];
                }
                return [4 /*yield*/, githubWebhookClient.buildPullRequestData(event.body)];
            case 2:
                pullRequest = _c.sent();
                return [4 /*yield*/, synchronizationEngine.processPullRequest(pullRequest)];
            case 3:
                _c.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _c.sent();
                return [2 /*return*/, {
                        statusCode: 500,
                        body: JSON.stringify("Error occurred: " + error_1.name + ". Message: " + error_1.message + ". Stack: " + error_1.stack + " File: " + error_1.fileName),
                        logStreamName: context.logStreamName
                    }];
            case 5: return [2 /*return*/, {
                    statusCode: 200,
                    body: 'Completed successfully!',
                    logStreamName: context.logStreamName
                }];
        }
    });
}); };
exports.handler = handler;
