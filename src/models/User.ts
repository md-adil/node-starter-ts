import { Model } from "objection";
class User extends Model {
    password?: string;

    static get tableName() {
        return "users";
    }

    $formatJson(json: User) {
        delete json.password;
        return json;
    }
}

export default User;
