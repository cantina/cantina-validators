cantina-validators
==================

Validators for Cantina applications.

###Provides:

- **app.validators.isFlag( val )**
- **app.validators.isEmail( val )**
- **app.validators.isEmpty( val )**
- **app.validators.isNotEmpty( val )**
- **app.validators.isEmailOrEmpty( val )**
- **app.validators.isUrl( val )**
- **app.validators.isPhoneNumber( val )**
- **app.validators.isId( val )**
- **app.validators.isIdOrEmpty( val )**
- **app.validators.isFutureDate( val )**
- **app.validators.isPastDate( val )**
- **app.validators.isType( type )( val )**
  - `type`: The javascript type to check for
- **app.validators.isIn( values )( val )**
  - `values`: The array of values to check within
- **app.validators.isJSON( val )**
- **app.validators.matches( regex )( val )**
  - `regex`: The regex to match
- **app.validators.maxLength( length, ignore )( val )**
  - `length`: The maximum length
  - `ignore`: (optional) Pattern(s) to ignore within string when checking length
- **app.validators.minLength( length, ignore )( val )**
  - `length`: The minimum length
  - `ignore`: (optional) Pattern(s) to ignore within string when checking length


- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Santa Cruz, CA and Washington, D.C.
