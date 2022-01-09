const db = require('../models/');
const Users = db.users;

module.exports = {
    FindUserWith(field, value) {
        return new Promise((resolve, reject) => {
            (
                async () => {
                    try {
                        const attribute = Users.rawAttributes[field];
                        if (!attribute)
                            reject(new Error("No field."));
                        const user = await Users.findOne({ where: { [field]: value } });
                        resolve(user);
                    } catch (error) {
                        reject(error);
                    }
                }
            )()
        });
    },
    async CreateUser(data) {
        return await Users.create(data);
    }
}