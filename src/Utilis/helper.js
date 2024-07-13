
//Employee login form validation
export const  





validateLoginForm = (email, password) => {
    const errors = {};
  
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Invalid email format.';
    }
    if (!password) {
      errors.password = 'Password is required.';
    }
  
    return errors;
  };
  
  //Employee signup form validation
  export const validateSignupForm = (username, email, password,confirmPassword) => {
    const errors = {};

    if (!username || !username.trim()) {
        errors.username = 'Username is required.';
      } else if (/[^a-zA-Z]/.test(username)) {
        errors.username = 'Username must only contain letters.';
      } else if (username.trim().length < 3) {
        errors.username = 'Must be at least 3 characters long.';
      }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !email.trim()) {
        errors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
        errors.email = 'Invalid email format.';
    }
  
    if (!password ||!password.trim()) {
      errors.password = 'Password is required.';
    } else if (password.length <6) {
      errors.password = 'Must be at least 6 characters long.';
    }

    if(password!=confirmPassword){
        errors.confirmPassword="Password Doesnt match"
    }else if(!confirmPassword.trim()){
        errors.confirmPassword="Confirm password is required"
    }
    return errors;
  };
  
  //Recruiter signup form validation
  export const validateRecruiterSignupForm = (recruitername, email, password,confirmPassword) => {
    const errors = {};

    if (!recruitername || !recruitername.trim()) {
        errors.recruitername= 'Name of recruiter/company is required .';
      } else if (/[^a-zA-Z]/.test(recruitername)) {
        errors.recruitername = 'Name must only contain letters.';
      } else if (recruitername.trim().length < 3) {
        errors.recruitername = 'Must be at least 3 characters long.';
      }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !email.trim()) {
        errors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
        errors.email = 'Invalid email format.';
    }
  
    if (!password ||!password.trim()) {
      errors.password = 'Password is required.';
    } else if (password.length <6) {
      errors.password = 'Must be at least 6 characters long.';
    }

    if(password!=confirmPassword){
        errors.confirmPassword="Password Doesnt match"
    }else if(!confirmPassword.trim()){
        errors.confirmPassword="Confirm password is required"
    }
    return errors;
  };

  export const validateResetPassword=(password)=>{
    const errors={}
    if(password.length<6){
      errors.password="Must be atleast 6 characters"
    }
    return errors;
  }
  