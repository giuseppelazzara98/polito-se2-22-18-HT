const testUserDao = require('../modules/DbManager').user_dao;

describe('TestUserDao', () => {

    testGetUserById(0, false);
    testGetUserById(6789, false);
    testGetUserById(1, true);
    testGetUserById(2, true);

    testGetUser(1, "Paolo", "Bitta", "Local guide", "guide1@gmail.com", "password", true);
    testGetUser(2, "Luca", "Nervi", "Hiker", "hiker1@gmail.com", "password", true);
    testGetUser(1, "Paolo", "Bitta", "Local guide", "guide1@gmail.com", "passwoasdasdrd", false);
    testGetUser(5, "Paolo", "Bitta", "Local guide", "guide9@gmail.com", "password", false);
    testNewUser("Giacomo", "Cresino", 1, "hiker1234@gmail.com", "password");

    testUpdateUserVerified(1);
    testUpdateUserVerified(2);

    testGetAllRoles();

    // CLOSE CONNECTION TO USER TABLE

    testCloseTables();
    testGetUserById(1, true);
    testGetUser(1, "Paolo", "Bitta", "Local guide", "guide1@gmail.com", "password");
    testNewUser("Giacomo", "Cresino", 1, "hiker1234@gmail.com", "password");
    testUpdateUserVerified(1);
    testGetAllRoles();

});

function testGetUserById(id_user, expextedResult) {
    test('Test get user by id', async () => {
        try {

            const user = await testUserDao.getUserById(id_user);

            if (expextedResult === true) {
                expect(user).not.toBeNull();
            }
            else {
                expect(user).toBeNull();
            }
        }
        catch (err) {
            console.log("---- Error on testGetUserById ----");
            return;
        }
    });
}

function testGetUser(id, name, surname, role, email, password, expectedResult) {
    test('Test get user', async () => {
        try {

            const user = await testUserDao.getUser(email, password);

            expect(user).not.toBeNull();

            if (expectedResult === true) {
                expect(user.id).toBe(id);
                expect(user.username).toBe(email);
                expect(user.name).toBe(name);
                expect(user.surname).toBe(surname);
                expect(user.role).toBe(role);
            }
            else {
                expect(user).toBe(false);
            }
        }
        catch (err) {
            console.log("---- Error on testGetUser ----");
            return;
        }
    });
}

function testNewUser(name, surname, role, email, password) {
    test('Test get user', async () => {
        try {

            const result = await testUserDao.insertNewUser(email, name, surname, password, role);

            expect(result).not.toBeNull();
            expect(result).toBeInstanceOf(Number);

        }
        catch (err) {
            console.log("---- Error on testGetUser ----");
            return;
        }
    });
}

function testUpdateUserVerified(id_user) {
    test('Test update user verified', async () => {
        try {

            const result = await testUserDao.updateVerifiedUser(id_user);

            expect(result).not.toBeNull();
            expect(result).toBe(true);

        }
        catch (err) {
            console.log("---- Error on testUpdateUserVerified ----");
            return;
        }
    });
}

function testGetAllRoles() {
    test('Test get all roles', async () => {
        try {

            const roles = await testUserDao.getAllRoles();

            expect(roles).not.toBeNull();
            expect(roles).toBeInstanceOf(Array);

        }
        catch (err) {
            console.log("---- Error on testGetAllRoles ----");
            return;
        }
    });
}

function testCloseTables() {
    test('Close tables', async () => {
        try {
            await testUserDao.closeTables();
        }
        catch (err) {
            console.log("---- Error on TestCloseUserTable ----");
        }
    });
}