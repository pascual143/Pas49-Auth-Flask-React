import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const token = sessionStorage.getItem("token");
    useEffect(()=>{
        if(!token || token != "" || token != undefined){
            navigate("/login")
        }
    })
    return (
        <div>
            This is your private page.
        </div>
    )
}
export default Private 