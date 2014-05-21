var assert = require('assert')
  , idgen = require('idgen');

describe('basic validator tests', function () {
  var app;

  before(function (done) {
    app = require('cantina');
    app.boot(function (err) {
      assert.ifError(err);

      app.silence();
      require('../');

      app.start(done);
    });
  });

  after(function (done) {
    app.destroy(done);
  });

  it('isFlag', function () {
    assert(app.validators.isFlag(1));
    assert(app.validators.isFlag(0));
    assert(!app.validators.isFlag(2));
    assert(!app.validators.isFlag(true));
  });

  it('isEmail', function () {
    assert(app.validators.isEmail('erin@terraeclipse.com'));
    assert(!app.validators.isEmail('erin@terra'));
  });

  it('isEmpty', function () {
    assert(app.validators.isEmpty(''));
    assert(!app.validators.isEmpty('test'));
  });

  it('isNotEmpty', function () {
    assert(app.validators.isNotEmpty('test'));
    assert(!app.validators.isNotEmpty(''));
    assert(!app.validators.isNotEmpty(null));
  });

  it('isEmailOrEmpty', function () {
    assert(app.validators.isEmailOrEmpty('erin@terraeclipse.com'));
    assert(app.validators.isEmailOrEmpty(''));
    assert(!app.validators.isEmailOrEmpty(null));
  });

  it('isUrl', function () {
    assert(app.validators.isUrl('https://www.github.com'));
    assert(!app.validators.isUrl('github.com'));
  });

  it('isPhoneNumber', function () {
    assert(app.validators.isPhoneNumber('831-607-4521'));
    assert(app.validators.isPhoneNumber('331-831-607-4521'));
    assert(!app.validators.isPhoneNumber('45b44'));
  });

  it('isId', function () {
    assert(app.validators.isId(idgen(16)));
    assert(!app.validators.isId(''));
    assert(!app.validators.isId(null));
    assert(!app.validators.isId(1));
  });

  it('isIdOrEmpty', function () {
    assert(app.validators.isIdOrEmpty(idgen(16)));
    assert(app.validators.isIdOrEmpty(''));
    assert(!app.validators.isIdOrEmpty(null));
    assert(!app.validators.isIdOrEmpty(1));
  });

  it('isFutureDate', function () {
    var date = new Date();
    date.setDate(date.getDate() + 2);
    assert(app.validators.isFutureDate(date));
    date.setDate(date.getDate() - 3);
    assert(!app.validators.isFutureDate(date));
  });

  it('isPastDate', function () {
    var date = new Date();
    date.setDate(date.getDate() - 3);
    assert(app.validators.isPastDate(date));
    date.setDate(date.getDate() + 5);
    assert(!app.validators.isPastDate(date));
  });

  it('isType', function () {
    assert(app.validators.isType('string')('test'));
    assert(app.validators.isType('number')(4));
    assert(app.validators.isType('boolean')(true));
    assert(app.validators.isType('array')(['1', '2', 3, '4']));
    assert(app.validators.isType('object')({a: 1, b: '2'}));
    assert(app.validators.isType('date')(new Date()));
    assert(app.validators.isType('regex')(/.*/));
    assert(app.validators.isType('regexp')(/.*/));
    assert(app.validators.isType('undefined')());
    assert(app.validators.isType('null')(null));
    assert(!app.validators.isType('string')(3));
    assert(!app.validators.isType('object')(null));
    assert(!app.validators.isType('object')(assert));
    assert(!app.validators.isType('undefined')(null));
    assert(!app.validators.isType('null')(''));
  });

  it('isIn', function () {
    assert(app.validators.isIn(['published', 'unpublished', 'deleted'])('published'));
    assert(!app.validators.isIn(['A', 'B', 'C', 'D'])('E'));
  });

  it('isJSON', function () {
    assert(app.validators.isJSON('{"foo": "bar"}'));
    assert(!app.validators.isJSON('{foo: bar, bar}'));
  });

  it('matches', function () {
    assert(app.validators.matches(/\d+/)("4567"));
    assert(app.validators.matches(/\w+/)("testRegex"));
    assert(!app.validators.matches(/[A-Z0-9]/)('abc'));
  });

  it('maxLength', function () {
    assert(app.validators.maxLength(4)("123"));
    assert(!app.validators.maxLength(4)("12345"));
    assert(app.validators.maxLength(3)([1, 2, 3]));
    assert(!app.validators.maxLength(3)([1, 2, 3, 4]));
  });

  it('minLength', function () {
    assert(app.validators.minLength(2), "abc");
    assert(!app.validators.minLength(2)(""));
    assert(app.validators.minLength(3)(["A", "B", "C"]));
    assert(!app.validators.minLength(3)(["A", "B"]));
  });
});