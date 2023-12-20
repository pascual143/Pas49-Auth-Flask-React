import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const token = sessionStorage.getItem("token");
    console.log("This is your token", token);

    const handleClick = () => {
        actions.login(email, password);
    };

    return (
        <div className="text-center mt-5">
            <h1>Login</h1>

            {token && token != "" && token != undefined ? (
                <>
                <p> "You are logged in with this token" {token} </p>
                <button onClick={() => navigate("/")}>Go To Home</button>
                </>
                
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleClick}>Login</button>
                </div>
            )}
        </div>
    );
};