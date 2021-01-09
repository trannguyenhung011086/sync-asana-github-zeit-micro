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
var objectUtilities_1 = require("../lib/objectUtilities");
var SynchronizationEngine = /** @class */ (function () {
    function SynchronizationEngine(configuration, actionFactory, asanaClient) {
        this.configuration = configuration;
        this.actionFactory = actionFactory;
        this.asanaClient = asanaClient;
    }
    SynchronizationEngine.prototype.getMatchingFlow = function (flows, pullRequest) {
        // more specific match criteria should be considered first.
        var sortedFlows = flows.sort(function (a, b) {
            if (Object.keys(a.match.pullRequest).length > Object.keys(b.match.pullRequest).length) {
                return -1;
            }
            else if (Object.keys(a.match.pullRequest).length < Object.keys(b.match.pullRequest).length) {
                return 1;
            }
            return 0;
        });
        return sortedFlows.find(function (flow) { return objectUtilities_1.matchOnKeys(flow.match.pullRequest, pullRequest); });
    };
    SynchronizationEngine.prototype.getCurrentProjectSection = function (taskMemberships, projectId) {
        var membership = taskMemberships.find(function (membership) { return membership.project.gid == projectId; });
        return membership === null || membership === void 0 ? void 0 : membership.section;
    };
    SynchronizationEngine.prototype.getProjectConfigurations = function (projects) {
        return this.configuration.projects.filter(function (configuration) {
            return projects.some(function (project) { return project.gid == configuration.id; });
        });
    };
    SynchronizationEngine.prototype.getAsanaTaskIds = function (pullRequest) {
        var matchIds = function (toMatch) {
            var result = toMatch.match(/(\d{16})(?!.*\d{16})/g);
            return result ? result.map(function (item) { return item.replace('#', '').replace('ref', ''); }) : '';
        };
        var taskIds = [];
        var contentToCheck = [pullRequest.title, pullRequest.body, pullRequest.head];
        for (var _i = 0, contentToCheck_1 = contentToCheck; _i < contentToCheck_1.length; _i++) {
            var content = contentToCheck_1[_i];
            var matchedValues = matchIds(content);
            taskIds.push.apply(taskIds, matchedValues);
        }
        for (var _a = 0, _b = pullRequest.commits; _a < _b.length; _a++) {
            var commit = _b[_a];
            var matchedValues = matchIds(commit['commit']['message']);
            taskIds.push.apply(taskIds, matchedValues);
        }
        for (var _c = 0, _d = pullRequest.comments; _c < _d.length; _c++) {
            var comment = _d[_c];
            var matchedValues = matchIds(comment['body']);
            taskIds.push.apply(taskIds, matchedValues);
        }
        return taskIds;
    };
    SynchronizationEngine.prototype.processPullRequest = function (pullRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var asanaTaskIds, _i, asanaTaskIds_1, asanaTaskId, task, projectConfigurations, _loop_1, this_1, _a, projectConfigurations_1, projectConfiguration;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        asanaTaskIds = this.getAsanaTaskIds(pullRequest);
                        if (asanaTaskIds.length === 0) {
                            // 1/2 maybe return an http status reason is better. let the handler return the status code.) and the message.
                            console.log("Skipping processing of pull request: " + pullRequest.url + ". No asana ids could be found.");
                        }
                        _i = 0, asanaTaskIds_1 = asanaTaskIds;
                        _b.label = 1;
                    case 1:
                        if (!(_i < asanaTaskIds_1.length)) return [3 /*break*/, 7];
                        asanaTaskId = asanaTaskIds_1[_i];
                        return [4 /*yield*/, this.asanaClient.tasks.findById(asanaTaskId)];
                    case 2:
                        task = _b.sent();
                        projectConfigurations = this.getProjectConfigurations(task.projects);
                        if (projectConfigurations.length === 0) {
                            // 2/2 maybe return an http status (reason is better. let the handler return the status code.) and the message.
                            console.log("No matching configurations were found for task: " + task.gid + ". Skiping processing of task for pull request: " + pullRequest.url);
                        }
                        _loop_1 = function (projectConfiguration) {
                            var currentSection, looseEquality, flow, actions, context_1, actionTasks;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        currentSection = this_1.getCurrentProjectSection(task.memberships, projectConfiguration.id);
                                        looseEquality = function (el) { return el == (currentSection === null || currentSection === void 0 ? void 0 : currentSection.gid); };
                                        if (!!projectConfiguration.completedSections.some(looseEquality)) return [3 /*break*/, 3];
                                        flow = this_1.getMatchingFlow(projectConfiguration.flows, pullRequest);
                                        if (!flow) return [3 /*break*/, 2];
                                        actions = this_1.actionFactory.buildActions(flow.actions);
                                        context_1 = { pullRequest: pullRequest, task: task, projectId: projectConfiguration.id };
                                        actionTasks = actions.map(function (action) { return action.execute(context_1); });
                                        return [4 /*yield*/, Promise.all(actionTasks)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        console.log("No matching flow located for task: " + task.gid + " and project configuration: " + projectConfiguration);
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a = 0, projectConfigurations_1 = projectConfigurations;
                        _b.label = 3;
                    case 3:
                        if (!(_a < projectConfigurations_1.length)) return [3 /*break*/, 6];
                        projectConfiguration = projectConfigurations_1[_a];
                        return [5 /*yield**/, _loop_1(projectConfiguration)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _a++;
                        return [3 /*break*/, 3];
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return SynchronizationEngine;
}());
exports["default"] = SynchronizationEngine;
