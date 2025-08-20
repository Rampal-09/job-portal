import css from "../pages/Signup.module.css";

const Signup = () => {
  return (
    <div className={css.container}>
      <div className={css.signupHeading}>
        <h1>Sign up</h1>
        <h4>create your acount</h4>
      </div>
      <form action="" className={css.signupForm}>
        <input type="text" name="name" required placeholder="Username" />
        <input type="email" name="email" required placeholder="Email" />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          required
          placeholder="confirm password"
        />
        <select name="type" required>
          <option value="employee">employee</option>
          <option value="candidant">candidant</option>
        </select>
        <button>Sign up</button>
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
