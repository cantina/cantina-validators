var app = require('cantina')
  , moment = require('moment');

var email_regex = new RegExp(
    '^'                                           +
      '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+'               + // local name
      '(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*'       + // optional local name dot suffix
      '@'                                           +
      '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+'     + // second-level and lower domains with trailing .
      '(?:[a-z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)' + // top-level domain
      '$'                                           ,
    'i')
  , url_regex = new RegExp(
    '(ftp|http|https)://'                         + // protocol
      '(\\w+:{0,1}\\w*@)?'                          + // credentials (optional)
      '([^:/\\s]+)'                                 + // hostname
      '(:[0-9]+)?'                                  + // port (optional)
      '(/(?:[/?#%\\w-.~!$&\'()*+,;=:@]*))?'         , // path + query + hash (optional); "/" followed by zero or more valid characters
    // valid characters are:
    // '/' / '?' / '#' / '%'    - the reserved characters:
    // '\w'                     - word characters [A-Za-z0-9_]
    // '-' / '.' / '~'          - unreserved ('_' is included in '\w')
    // '!' / '$' / '&' / ''' /  - sub-delimiters
    // '(' / ')' / '*' / '+' /
    // ',' / ';' / '='
    // ':' / '@'                - other allowed characters
    'i')
  , phone_number_regex = new RegExp(
    '^'                                           +
      '\\+?'                                         + // leading "+" (optional)
      '[0-9()-. ]+'                                 + // digits or customary punctuation
      '(?:\\s*(?:#|x\\.?|ext\\.?|extension)\\s*(\\d+))?' + // extension (optional)
      '$'                                           ,
    'i')
  , id_regex = /^[0-9a-zA-Z]{16}$/;

app.validators = {
  isFlag: function isFlag (val) {
    return val === 0 || val === 1;
  },

  isEmail: function isEmail (val) {
    return email_regex.test(val);
  },

  isEmailOrEmpty: function isEmailOrEmpty (val) {
    return (val === '') || app.validators.isEmail(val);
  },

  isUrl: function isUrl (val) {
    return url_regex.test(val);
  },

  isPhoneNumber: function isPhoneNumber (val) {
    return phone_number_regex.test(val);
  },

  isId: function isId (val) {
    return typeof val === 'string' && id_regex.test(val);
  },

  isIdOrEmpty: function isIdOrEmpty (val) {
    return (val === '') || app.validators.isId(val);
  },

  isFutureDate: function isFutureDate (val) {
    var utc_val = moment(val).endOf('day').utc();
    var utc_now = moment().startOf('day').utc();
    return utc_val.isAfter(utc_now);
  },

  isType: function (type) {
    return function isType (val) {
      return typeof val === type;
    };
  },

  matches: function (regex) {
    return function matches (val) {
      return typeof val === 'string' && regex.test(val);
    };
  },

  maxLength: function (length, ignore) {
    if (ignore) {
      Array.isArray(ignore) || (ignore = [ignore]);
    }
    return function maxLength (val) {
      if (ignore) {
        return ignore.reduce(function (str, pattern) {
          return str.replace(pattern, '');
        }, val).length <= length;
      }
      else {
        return val.length <= length;
      }
    };
  },

  minLength: function (length, ignore) {
    if (ignore) {
      Array.isArray(ignore) || (ignore = [ignore]);
    }
    return function minLength (val) {
      if (ignore) {
        return ignore.reduce(function (str, pattern) {
          return str.replace(pattern, '');
        }, val).length >= length;
      }
      else {
        return val.length >= length;
      }
    };
  }
};