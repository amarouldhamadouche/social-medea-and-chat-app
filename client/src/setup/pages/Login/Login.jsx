import "./Login.css";
import { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { AuthContext } from "../../contexs/AuthContex";
import { loginCall } from "../../apiCalls";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const clickHundler = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h1 className="loginLogo">Login into amarSocial</h1>
          </div>
          <div className="loginRight">
            <div className="loginBoxContainer">
              <form action="" className="loginBox" onSubmit={clickHundler}>
                <div className="inptContainer">
                  <input
                    placeholder="enter ur email"
                    type="email"
                    required
                    ref={email}
                    className="loginInpt"
                  />
                </div>
                <div className="inptContainer">
                  <input
                    placeholder="enter ur password"
                    type="password"
                    required
                    ref={password}
                    minLength="3"
                    className="loginInpt"
                  />
                </div>
                <button className="loginBtn" type="submit">
                  {isFetching ? <CircularProgress /> : "Login"}
                </button>
                <span className="passwordForgot">forgot password?</span>
                <Link to="/register">
                  <button className="loginBtn">Create Account</button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
