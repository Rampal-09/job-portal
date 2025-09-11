import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./Login.module.css";
import { login } from "../services/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const clearFieldError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const handleClose = () => {
    navigate("/jobs");
  };

  const handleLoginData = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    const loginData = { email, password };

    try {
      const response = await login(loginData);

      setMessage(response.message || "login successful!");
      setTimeout(() => {
        navigate("/jobs");
      }, 2000);
    } catch (err) {
      const fieldError = {};
      if (err.type === "validation") {
        err.errors.forEach((err) => {
          fieldError[err.path] = err.msg;
        });
        setErrors(fieldError);
      } else {
        setMessage(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      }
    }
  };

  return (
    <>
      <div className={css.loginContainer}>
        <h1>Login</h1>
        <button className={css.closeBtn} type="button" onClick={handleClose}>
          ×
        </button>
        {message && (
          <div
            style={{
              padding: "10px",
              margin: "10px 0",
              backgroundColor: message.includes("successfully")
                ? "lightgreen"
                : "lightcoral",
              borderRadius: "5px",
            }}
          >
            {message}
          </div>
        )}

        <form className={css.loginForm} onSubmit={handleLoginData}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              style={{ borderColor: errors.email ? "red" : "" }}
            />
            {errors.email && (
              <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {errors.email}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError("password");
              }}
              style={{ borderColor: errors.password ? "red" : "" }}
            />
            {errors.password && (
              <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {errors.password}
              </div>
            )}
          </div>
          <button type="submit">Login</button>
        </form>

        <div className={css.extraInfo}>
          <span>Don't have an account? </span>
          <a href="">Signup</a>
        </div>
      </div>
    </>
  );
};

export default Login;
