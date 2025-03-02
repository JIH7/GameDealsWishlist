import { useEffect } from "react";

import "./login_page.css";

const LoginPage = ({ setCurrentPage }) => {
    const $ = selector => document.querySelector(selector);

    useEffect(() => $("#username").focus(), []);

    return (
    <>
        <h1>Sign In</h1>
        <main className="card">
            <form action="">
                <label htmlFor="username">Username or Email</label>
                <input type="text" name="username" id="username"/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"/>
                <div className="button-spacer">
                    <input type="submit" value={"Log in"}/>
                    <button onClick={() => setCurrentPage("signup")}>Sign Up</button>
                </div>
            </form>
        </main>
    </>
    )
}

export default LoginPage;