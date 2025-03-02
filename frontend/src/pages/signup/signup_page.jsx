import { useEffect } from "react";

import "./signup_page.css";

const SignupPage = ({ signupUser, formErrors }) => {
    const $ = selector => document.querySelector(selector);

    useEffect(() => {
        document.querySelector("#email").focus();
    }, [])


    return (
    <>
        <h1>Create Account</h1>
        <main className="card">
            <form action="">
                <div>
                    <label htmlFor="email">Email Address</label>
                    <p>{formErrors[0] ? formErrors[0] : ""}</p>
                </div>
                <input type="email" name="email" id="email" className={formErrors[0] ? "err-field" : ""}/>
                <div>
                    <label htmlFor="username">Username</label>
                    <p>{formErrors[1] ? formErrors[1] : ""}</p>
                </div>
                <input type="text" name="username" id="username" className={formErrors[1] ? "err-field" : ""}/>
                <div>
                    <label htmlFor="password1">Password</label>
                    <p>{formErrors[2] ? formErrors[2] : ""}</p>
                </div>
                <input type="password" name="password1" id="password1" className={formErrors[2] ? "err-field" : ""}/>
                <div>
                    <label htmlFor="password2">Re-Enter Password</label>
                    <p>{formErrors[3] ? formErrors[3] : ""}</p>
                </div>
                <input type="password" name="password2" id="password2" className={formErrors[3] ? "err-field" : ""}/>

                <input type="submit" value={"Create Account"} onClick={ async e => {
                    e.preventDefault();
                    await signupUser($("#email").value, $("#username").value, $("#password1").value, $("#password2").value);
                }}/>
            </form>
        </main>
    </>
    )
}

export default SignupPage;