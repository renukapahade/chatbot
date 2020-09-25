//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../models/message');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://localhost:5000";
let should = chai.should();


chai.use(chaiHttp);

/*
  * Test the /GET statistics route
  */
describe('/POST message', () => {
    it('it should not POST a message without session_id', (done) => {
        let message = {
            type: "user",
            message: "Hello"
        }
        chai.request(server)
            .post('/api/users/account')
            .send(message)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('it should POST a message with a session_id in header', (done) => {
        let message = {
            type: "user",
            message: "Hello"
        }
        chai.request(server)
            .post('/api/users/account')
            .set("session_id", "xeoGc8VRC50is4unI4DvGQ==")
            .send(message)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

});


/*
  * Test the /GET statistics
  */
describe('/GET message', () => {
    it('it should get the engagement rate', (done) => {
        chai.request(server)
            .get('/api/users/stats/engagement')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('engagementRate');
                done();
            });
    });
    it('it should get the dropout rate', (done) => {
        chai.request(server)
            .get('/api/users/stats/dropout')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('dropoutRate');
                done();
            });
    });
    it('it should get the completion rate', (done) => {
        chai.request(server)
            .get('/api/users/stats/completion')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('completionRate');
                done();
            });
    });
});