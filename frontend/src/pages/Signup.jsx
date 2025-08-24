import { useState } from "react";
import css from "../pages/Signup.module.css";
import { signup } from "../services/authApi";
import validator from "validator";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("candidate");

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

  const handleFormData = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});
    const formData = { name, email, password, confirmPassword, role };
    console.log("Frontend formData:", formData);
    try {
      // if (validator.isEmpty(name)) {
      //   return setMessage("Name is required");
      // }
      // if (!validator.isAlpha(name.replace(/\s/g, ""))) {
      //   return setMessage("Name must contain only alphabetic characters");
      // }
      // if (!validator.isLength(name.trim(), { min: 2 })) {
      //   return setMessage("Name must be at least 2 characters long");
      // }
      // if (!validator.isEmail(email)) {
      //   return setMessage("Please enter a valid email address");
      // }
      // if (validator.isEmpty(password)) {
      //   return setMessage("Password is required");
      // }
      // if (
      //   !validator.isStrongPassword(password, {
      //     minLength: 6,
      //     minLowercase: 1,
      //     minUppercase: 1,
      //     minNumbers: 1,
      //     minSymbols: 1,
      //   })
      // ) {
      //   return setMessage(
      //     "Password must contain at least 6 characters including uppercase, lowercase, number, and special character"
      //   );
      // }

      // if (password !== confirmPassword) {
      //   return setMessage("Passwords do not match");
      // }

      const response = await signup(formData);
      console.log(response);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("candidate");
      setMessage(response.message || "Signup successful!");
    } catch (err) {
      const fieldError = {};
      if (err.type === "validation") {
        err.errors.forEach((err) => {
          fieldError[err.path] = err.msg;
        });
        setErrors(fieldError);
      } else {
        setMessage(err.message || "Signup failed");
      }
    }
  };

  return (
    <div className={css.container}>
      <div className={css.signupHeading}>
        <h1>Sign up</h1>
        <h4>create your account</h4>
      </div>
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
      <form className={css.signupForm} onSubmit={handleFormData}>
        <div>
          <input
            type="text"
            name="name"
            required
            placeholder="Username"
            onChange={(e) => {
              setName(e.target.value);
              clearFieldError("name");
            }}
            value={name}
            style={{ borderColor: errors.name ? "red" : "" }}
          />
          {errors.name && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {errors.name}
            </div>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError("email");
            }}
            value={email}
            style={{ borderColor: errors.email ? "red" : "" }}
          />
          {errors.email && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {errors.email}
            </div>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
              clearFieldError("password");
            }}
            value={password}
            style={{ borderColor: errors.password ? "red" : "" }}
          />
          {errors.password && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {errors.password}
            </div>
          )}
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="confirm password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              clearFieldError("confirmPassword");
            }}
            value={confirmPassword}
            style={{ borderColor: errors.confirmPassword ? "red" : "" }}
          />
          {errors.confirmPassword && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {errors.confirmPassword}
            </div>
          )}
        </div>

        <select
          name="role"
          required
          onChange={(e) => setRole(e.target.value)}
          value={role}
        >
          <option value="employer">employer</option>
          <option value="candidate">candidate</option>
        </select>
        <button type="submit">Sign up</button>
      </form>
      <div className={css.extraInfo}>
        <p>Or</p>
        <span>Already have an acount? </span>
        <a href="">Login</a>
      </div>
    </div>
  );
};

export default Signup;
