cantina-validators
==================

Validators for Cantina applications.

###Provides:

- **app.validators.isFlag( val )**
- **app.validators.isEmail( val )**
- **app.validators.isEmpty( val )**
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
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT
Copyright (C) 2014 Terra Eclipse, Inc. ([http://www.terraeclipse.com](http://www.terraeclipse.com))

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.