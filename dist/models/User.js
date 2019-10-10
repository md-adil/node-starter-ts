"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class User extends objection_1.Model {
    static get tableName() {
        return "users";
    }
    $formatJson(json) {
        delete json.password;
        return json;
    }
}
exports.default = User;
