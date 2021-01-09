"use strict";
exports.__esModule = true;
var SetCustomFieldAction_1 = require("./asana/SetCustomFieldAction");
var SetSectionAction_1 = require("./asana/SetSectionAction");
var CommentAction_1 = require("./asana/CommentAction");
var AsanaActionFactory = /** @class */ (function () {
    function AsanaActionFactory(asanaClient) {
        this.asanaClient = asanaClient;
    }
    AsanaActionFactory.prototype.buildActions = function (actionDefinitions) {
        var actions = [];
        for (var _i = 0, actionDefinitions_1 = actionDefinitions; _i < actionDefinitions_1.length; _i++) {
            var actionDefinition = actionDefinitions_1[_i];
            switch (actionDefinition.type) {
                case 'setCustomField':
                    actions.push(new SetCustomFieldAction_1["default"](this.asanaClient, actionDefinition.value));
                    break;
                case 'setSection':
                    actions.push(new SetSectionAction_1["default"](this.asanaClient, actionDefinition.value));
                    break;
                case 'comment':
                    actions.push(new CommentAction_1["default"](this.asanaClient, actionDefinition.value));
                    break;
                default:
                    console.warn("Skipping unknown action type '" + actionDefinition.type + "'. Please check your flow configurations."); // use logger? send error response?
            }
        }
        return actions;
    };
    return AsanaActionFactory;
}());
exports["default"] = AsanaActionFactory;
