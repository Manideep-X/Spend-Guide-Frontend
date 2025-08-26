const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateEmail = (email) => {

    let err = null;
    
    if(!email) {
        err = "Email address is required!";
    }
    else if(!emailRegex.test(email.trim())) {
        err = "This is not a valid email address!";
    }
    return err;

}

const validateSignup = (firstName, lastName, email, password) => {

    const errors = {};
    const emailErr = validateEmail(email);

    if (!firstName.trim()) {
        errors.firstName = "First name is required!";
    }
    if(!lastName.trim()) {
        errors.lastName = "Last name is required!";
    }
    if (emailErr) {
        errors.email = emailErr;
    }
    if(!password.trim()) {
        errors.password = "Password is required!";
    }

    return errors;

}

const validateSignin = (email, password) => {

    const errors = {};

    if(!email.trim()) {
      if(!emailRegex.test(email.trim()))
        errors.email = "This is not a valid email address!";
      else
        errors.email = "Email address is required!";
    }
    if(!password.trim()) {
      errors.password = "Password is required!";
    }

    return errors;

}

export { validateSignup, validateSignin }