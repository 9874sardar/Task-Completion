function ValidateSignup (values){
    let error= {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phone_pattern = /^(\s]?)?[0]?(91)?[789]\d{9}$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    //name
    if(values.username === "")
        error.username = "Name should not be empty";
    else
        error.username = ""

    //email
    if(values.email === "")
        error.email = "Email should not be empty";
    else if(!email_pattern.test(values.email))
        error.email = "Invalid Email"
    else
        error.email = ""
    
    //phone
    if(values.phone === "")
        error.phone = "Phone Number should not be empty";
    else if(!phone_pattern.test(values.phone))
        error.phone = "Invalid Phone Number"
    else
        error.phone = ""

    //date of birth
    if(values.dob === "")
        error.dob = "Date of Birth should not be empty";
    else
        error.dob = ""

    //age
    if (values.age === "")
        error.age = "Age should not be empty";
    else if(values.age < 0 || values.age > 110)
        error.age = "Age should be between 1 to 110"
    else 
        error.age = ""

    //password
    if (values.password === "")
        error.password = "Password should not be empty";
    else if(!password_pattern.test(values.password))
        error.password = "Should have atleast 1 lowercase 1 upper case and 1 digit"
    else 
        error.password = ""


        return error;
}

export default ValidateSignup;