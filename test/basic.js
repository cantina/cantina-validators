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
    date.setHours(date.getHours()+3);
    assert(app.validators.isFutureDate(date));
    date.setDate(date.getDate() - 3);
    assert(!app.validators.isFutureDate(date));
  });

  it('isType', function () {
    assert(app.validators.isType('string')('test'));
    assert(app.validators.isType('number')(4));
    assert(app.validators.isType('boolean')(true));
    assert(app.validators.isType('object')(['1', '2', 3, '4']));
    assert(app.validators.isType('undefined')());
    assert(!app.validators.isType('string')(3));
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