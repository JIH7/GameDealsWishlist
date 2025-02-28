import { useEffect } from "react";

import "./signup_page.css";

const SignupPage = ({ signupUser, formErrors }) => {
    useEffect(() => {
        document.querySelector("#email").focus();
    }, [])


    return (
    <>
        <h1>Create Account</h1>
        <main className="card">
            <form action="">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email"/>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username"/>
                <label htmlFor="password1">Password</label>
                <input type="password" name="password1" id="password1"/>
                <label htmlFor="password2">Re-Enter Password</label>
                <input type="password" name="password2" id="password2"/>

                <input type="submit" value={"Create Account"}/>
            </form>
        </main>
    </>
    )
}

export default SignupPage;