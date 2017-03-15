const chai = require('chai');
const axios = require('axios');



describe('server functionality', function() {

  let url = 'http://127.0.0.1:3000';

  it('should accept a get request to root', function(done) {
    axios.get(url).then(function(res) {
      chai.expect(res.status).to.equal(200);
      done();
    });
  });
});