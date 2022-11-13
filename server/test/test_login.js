const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

describe('Test login', () => {
	logIn('guide1@gmail.com', 'password', 200);
	logIn('user@gmail.com', 'password', 401);
	logIn('hiker1@gmail.com', 'asdkakjsdk', 401);
	logIn('', 'asdkakjsdk', 401);
	logIn('hiker1@gmail.com', '', 401);
	logIn(null, 'asdkakjsdk', 401);
	logIn('hiker1@gmail.com', null, 401);
	logIn(null, null, 401);
});

function logIn(username, password, ExpectedHTTPStatus) {
	it('User login', (done) => {
		const credentials = { username, password };
		reqBody = JSON.stringify(credentials);
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
