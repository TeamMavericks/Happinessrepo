const assert  = require('chai').assert;
const expect = require('chai').expect;
const sut = require('../../notifications-app');
const request = require('request');

describe('notification app', function(){
    // Arrange

    it('Given need to get user consent for notifications, it should return consent page', function(done){
        // Return our notifications confirmation form
        request('http://localhost:8080', function(error, response, page){
            expect(page).to.include('Allow Notifications');
            expect(page).to.include('Deny Notifications');
            expect(error).to.be.null;
            done();
        });
    });

    it('given enrolled user and consent, it should send scheduled notifications', function(){
        // 
    });

    describe('given non enrolled user', function(){
        describe('confirmation is positive should refer to enrolment', function(){

        });

        describe('confirmation is negative should refer to enrolment', function(){

        });
    });

    it('should not remind users who have already captured their happiness levels', function(){
        throw('Not implemented');
    });
});


