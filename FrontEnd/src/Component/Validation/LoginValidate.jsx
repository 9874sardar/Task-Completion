function Validate (values){
    let error= {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if(values.email === "")
        error.email = "Name should not be empty";
    else if(!email_pattern.test(values.email))
        error.email = "Invalid Email"
    else
        error.email = ""

    if (values.password === "")
        error.password = "Password should not be empty";
    else if(!password_pattern.test(values.password))
        error.password = "Should have atleast 1 lowercase 1 upper case and 1 digit"
    else 
        error.password = ""


        return error;
}

export default Validate;
