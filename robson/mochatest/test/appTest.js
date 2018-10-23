const assert  = require('chai').assert;
const app = require('../app');

describe('app',function(){
    it('app should return hello', function(){
        var expected = 'Hello';
        assert.equal(app(), expected);
    });
});