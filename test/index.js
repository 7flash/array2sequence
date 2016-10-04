var assert = require("assert");

var a2s = require('../index.js');

var defaultArray = [1,2,3,4,5,6,100,1091,1999,2000,2001,2002];
var defaultResult = "1-6,100,1091,1999-2002";

var arrayNotUnique = [1,2,2,4,5];
var resultNotUnique = "1-2,4-5";

var arrayNotSorted = [5,4,3,2,1];
var resultNotSorted = "5,4,3,2,1";

describe('array2sequence', function(){
    describe('arrayToStringSequencesAsync', function(){
        it('Должен возвращать правильный результат асинхронно', function() {
            var done = false;
            var promise = a2s(defaultArray).then(function(result) {
                assert.equal(result, defaultResult);
                assert.equal(done, true);
            });
            done = true;
            return promise;
        });

        it('Должен работать с массивами, которые не являются множествами', function() {
            return a2s(arrayNotUnique).then(function(result) {
                assert.equal(result, resultNotUnique);
            });
        });

        it('Не должен сортировать массив', function() {
            return a2s(arrayNotSorted).then(function(result) {
                assert.equal(result, resultNotSorted);
            });
        });
    });
});