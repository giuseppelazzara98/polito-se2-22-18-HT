const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);
chai.should();

const app = require('../server');
let agent = chai.request.agent(app);

describe('Test user apis', () => {

	//Login tests
	logIn('guide1@gmail.com', 'password', 200);
	logIn('user@gmail.com', 'password', 401);
	logIn('hiker1@gmail.com', 'asdkakjsdk', 401);
	logIn('', 'asdkakjsdk', 401);
	logIn('hiker1@gmail.com', '', 401);
	logIn(null, 'asdkakjsdk', 401);
	logIn('hiker1@gmail.com', null, 401);
	logIn(null, null, 401);

	//Registration tests
	newUser('guide50000@gmail.com', 'Paolo', 'Bosco', 'password', 2, 201);
	newUser('hiker50000@gmail.com', 'Giuseppe', 'Rossi', 'password', 1, 201);
	newUser('hiker50000@gmail.com', 'Giuseppe', 'Rossi', 'password', 1, 409);
	newUser('guide50000@gmail.com', 'Paolo', 'Bosco', 'password', 5, 422);
	newUser('guide50000gmail.com', 'Paolo', 'Bosco', 'password', 2, 422);
	newUser('guide50000@gmail.com', 'Paolosadasdasldkjalskdjlkasjdlkajsdlkjadlkjasldkjal', 'Bosco', 'password', 2, 422);
	newUser('guide50000@gmail.com', 'Paolo', 'Boscosadasdasldkjalskdjlkasjdlkajsdlkjadlkjasldkjal', 'password', 2, 422);

	const token1 = jwt.sign(
		{
			id_user: 5
		},
		'ourSecretKey',
		{ expiresIn: '3s' }
	);

	const token2 = jwt.sign(
		{
			id_user: 6
		},
		'ourSecretKey',
		{ expiresIn: '3s' }
	);

	const token3 = jwt.sign(
		{
			id_user: 7
		},
		'ourSecretKey',
		{ expiresIn: '0s' }
	);

	//Test verify user
	verifyUser(token1, 200);
	verifyUser(token2, 200);
	verifyUser(token3, 401);

	//Get roles tests
	getAllRoles(200);

});

function logIn(username, password, ExpectedHTTPStatus) {
	it('User login', (done) => {
		const credentials = { username, password };
		let reqBody = JSON.stringify(credentials);
		agent
			.post('/api/sessions')
			.set('Content-Type', 'application/json')
			.send(reqBody)
			.then((res) => {
				res.should.have.status(ExpectedHTTPStatus);
				done();
			});
	});
}

function newUser(email, name, surname, password, id_role, ExpectedHTTPStatus) {
	it('User registration', (done) => {

		const newUser = { email, name, surname, password, id_role };
		let reqBody = JSON.stringify(newUser);

		agent.post('/api/newUser')
			.set('Content-Type', 'application/json')
			.send(reqBody)
			.then((res) => {
				res.should.have.status(ExpectedHTTPStatus);
				done();
				return res.body;
			});
	});
}

function verifyUser(token, ExpectedHTTPStatus) {
	it('Verify user', (done) => {

		agent.put(`/api/verify/${token}`)
			.set('Content-Type', 'application/json')
			.then((res) => {
				res.should.have.status(ExpectedHTTPStatus);
				done();
			});
	});
}

function getAllRoles(ExpectedHTTPStatus) {
	it('Get all roles', (done) => {
		agent.get('/api/roles')
			.then((res) => {
				res.should.have.status(ExpectedHTTPStatus);
				Object.keys(res.body).length.should.be.greaterThan(0);
				done();
			});
	});
}