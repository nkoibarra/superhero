import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server.js';

chai.use(chaiHttp);
chai.should();

describe('/fight', function() {
    it('should return 200', function() {
        chai.request(app)
        .get('/fight')
        .end((err, res) => {
            res.should.have.status(200);
        })
    })
})