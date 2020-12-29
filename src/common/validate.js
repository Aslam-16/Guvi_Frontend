export function Emailvalidate(email){
    const regemail=/^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/;
    if(regemail.test(email)){
        return 1;
    }
    else {
        return 0;
    }
}

export function Validpassword(password){
  const pattern         = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})");
  const passwordvalid   = pattern.test(password)
  return passwordvalid
}

