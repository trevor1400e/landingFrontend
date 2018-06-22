function buildRules(regExps = [], fns = [], errorMessages = ["Input is invalid"]){
  return [(field) => {
    if(!field) {
      return errorMessages[0];
    }

    let errMessage = null;
    let i = 1;
    regExps.every((exp) => {
      if(!exp.test(field)){
        errMessage = i < errorMessages.length ? errorMessages[i] : errorMessages[0];
        return false;
      }
      i++;
      return true;
    });
    if (!errMessage) {
      fns.every((fn) => {
        if (!fn(field)) {
          errMessage = i < errorMessages.length ? errorMessages[i] : errorMessages[0];
          return false;
        }
        i++;
        return true;
      });
    }

    return errMessage || true;
  }]
}


export default {
  created(){
    this.emailRules = buildRules(
      [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
      [],
      ['Invalid email']
    );

    this.userIdRules = buildRules(
      [/^[A-Za-z0-9]*$/],
      [],
      ['Invalid username']
    );

    this.passwordRules = buildRules(
      [],
      [
        pwd => pwd.length >= 8,
        pwd => /.*[A-Z].*/.test(pwd) && /.*[a-z].*/,
        pwd => /.*[0-9].*/.test(pwd),
        pwd => /.*[!@#$%^&*()\-_=+[{}\]| /\\.,<>`~'";:?].*/.test(pwd)
      ],
      [
        'You must create a password',
        'Password must be at least 8 characters',
        'Password must contain upper and lowercase letters',
        'Password must contain a number',
        'Password must contain a special character',
      ]
    );

    this.required = (fieldName) => buildRules([],[],[`${fieldName} is required`]);

    this.checkedRule = (message) => buildRules([],[],[message]);

    this.passwordsMatch = (originalPassword) => buildRules(
      [],[(validatePassword) => validatePassword === originalPassword],
      ['Passwords must match']
    );

    this.urlRule = buildRules(
      [],
      [(url) => {
        if(url.toLowerCase().startsWith('http://')){
          url = url.substring('http://'.length)
        }
        if(url.toLowerCase().startsWith('https://')){
          url = url.substring('https://'.length)
        }
        return /[A-z|0-9]+\.[A-z|0-9]{2,22}/.test(url)
    }],
      ['Invalid URL']
    );

    this.pageIdRule = buildRules([/^[A-Za-z0-9]*$/], [], 'Invalid Page Id')

  }
}
