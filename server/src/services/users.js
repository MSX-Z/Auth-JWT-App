const db = require('../models/');
const Users = db.users;

module.exports = {
    async FindUserWith(field, value) {
        try {
            const attribute = Users.rawAttributes[field];
            if (!attribute)
                throw new Error("No field");
            const user = await Users.findOne({ where: { [field]: value } });
            return user;
        } catch (error) {
            throw error;
        }
    },
    async CreateUser(data) {
        return await Users.create(data);
    }
}