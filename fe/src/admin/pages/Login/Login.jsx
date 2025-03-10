import React, { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BiShow, BiHide } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useAuth } from "../../../main/context/AuthContext";
import config from "../../config";

const cx = classNames.bind(styles);

const Login = () => {
  const { user, login } = useAuth();
  const [showPassword, setShowPassword] = useState([false]);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  // ---------- check user already login ----------
  useEffect(() => {
    if (user) window.location.href = config.routes.home;
  }, [user]);
  // ---------- end check ----------
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ username: data.username, password: data.password });
  };
  return (
    <React.Fragment>
      {user === null ? (
        <div className={cx("wrapper", "py-5")}>
          <div className={cx("logo")}>
            <svg
              width="100%"
              height="calc(100vh - 175px)"
              viewBox="0 0 405 809"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-358.39 358.707L-293.914 294.23L-293.846 294.163H-172.545L-220.81 342.428L-233.272 354.889L-282.697 404.314L-276.575 410.453L0.316589 687.328L283.33 404.314L233.888 354.889L230.407 351.391L173.178 294.163H294.48L294.547 294.23L345.082 344.765L404.631 404.314L0.316589 808.629L-403.998 404.314L-358.39 358.707ZM0.316589 0L233.938 233.622H112.637L0.316589 121.301L-112.004 233.622H-233.305L0.316589 0Z"
                fill="#69b1ff"
              ></path>
              <path
                d="M-516.39 358.707L-451.914 294.23L-451.846 294.163H-330.545L-378.81 342.428L-391.272 354.889L-440.697 404.314L-434.575 410.453L-157.683 687.328L125.33 404.314L75.8879 354.889L72.4068 351.391L15.1785 294.163H136.48L136.547 294.23L187.082 344.765L246.631 404.314L-157.683 808.629L-561.998 404.314L-516.39 358.707ZM-157.683 0L75.9383 233.622H-45.3627L-157.683 121.301L-270.004 233.622H-391.305L-157.683 0Z"
                fill="#95de64"
                opacity="0.6"
              ></path>
              <path
                d="M-647.386 358.707L-582.91 294.23L-582.842 294.163H-461.541L-509.806 342.428L-522.268 354.889L-571.693 404.314L-565.571 410.453L-288.68 687.328L-5.66624 404.314L-55.1082 354.889L-58.5893 351.391L-115.818 294.163H5.48342L5.5507 294.23L56.0858 344.765L115.635 404.314L-288.68 808.629L-692.994 404.314L-647.386 358.707ZM-288.68 0L-55.0578 233.622H-176.359L-288.68 121.301L-401 233.622H-522.301L-288.68 0Z"
                fill="#fff1f0"
                opacity="1"
              ></path>
            </svg>
          </div>
          <form className={cx("form-block", "p-5")}>
            <div className="d-flex justify-content-center">
              <h4 className="fw-semibold">Đăng nhập</h4>
            </div>
            <div className="mb-3 pt-4">
              <label
                htmlFor="username"
                className="form-label mb-1 fw-light size-14"
              >
                Tài khoản
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                required
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3 pt-2 cs-block-show-hide">
              <label
                htmlFor="password"
                className="form-label mb-1 fw-light size-14"
              >
                Mật khẩu
              </label>
              <input
                type={showPassword ? "password" : "text"}
                className="form-control"
                id="password"
                name="password"
                required
                onChange={handleOnChange}
              />
              {true && (
                <div
                  className={cx("cs-show-hide")}
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <BiHide className="text-dark" />
                  ) : (
                    <BiShow className="text-dark" />
                  )}
                </div>
              )}
            </div>
            <button
              type="submit"
              className={cx("btn btn-success w-100 mt-4", "cs-btn-login")}
              onClick={handleSubmit}
            >
              Đăng nhập
            </button>
            <div className="d-flex align-items-center pt-4">
              <hr className="flex-grow-1" />
              <span className="mx-2 text-line text-light">Đăng nhập với</span>
              <hr className="flex-grow-1" />
            </div>
            <div className="d-flex justify-content-between py-4">
              <a
                href="https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&amp;access_type=offline&amp;prompt=consent&amp;redirect_uri=http://localhost:5173/login/callback&amp;response_type=id_token&amp;client_id=146803766235-bgqd3feuackkf44ft74iji5cehlpccnj.apps.googleusercontent.com&amp;state='/vi/'&amp;nonce=n-0S6_WzA2Mj"
                type="button"
                className="d-flex align-items-center btn btn-outline-secondary custom-hover"
              >
                <FcGoogle />
                <span className="mx-1">{""}</span>
                <span className="size-14">Google</span>
              </a>
              <button
                type="button"
                className="d-flex align-items-center btn btn-outline-secondary custom-hover"
              >
                <FaFacebookF className="text-primary" />
                <span className="mx-1">{""}</span>
                <span className="size-14">Facebook</span>
              </button>
              <button
                type="button"
                className="d-flex align-items-center btn btn-outline-secondary custom-hover"
              >
                <FaTwitter className="text-info" />
                <span className="mx-1">{""}</span>
                <span className="size-14">Twitter</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={cx("cs-user-already-login")}></div>
      )}
    </React.Fragment>
  );
};

export default Login;
