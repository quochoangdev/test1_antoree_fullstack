import React, { useEffect, useState } from "react";
import "./Login.css";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useAuth } from "../../../main/context/AuthContext";
const cx = classNames.bind(styles);
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginCallBack = () => {
  const navigate = useNavigate();
  const { user, loginGoogleTokenContext } = useAuth();

  useEffect(() => {
    // Extract id_token from the URL fragment
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1)); // Remove '#' and parse
    const token = params.get("id_token");

    if (token) {
      const loginGoogle = async (id_token) => {
        try {
          await loginGoogleTokenContext(id_token);
          navigate("/");
          toast.success("Đăng nhập thành công!");
        } catch (error) {
          console.error("Login failed:", error); // For debugging purposes
          navigate("/login");
        }
      };
      loginGoogle(token);
    } else {
      console.error("ID Token not found in the URL.");
      navigate("/login");
    }
  }, []);

  return (
    <div className={cx("callback-container")}>
      <h1>Login Callback</h1>
    </div>
  );
};

export default LoginCallBack;
