import css from "../pages/Login.module.css";

const Login = () => {
  return (
    <div className={css.loginContainer}>
      <h1>Login</h1>
      <form action="" className={css.loginForm}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          required
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          required
        />
        <button>Login</button>
      </form>
      <div className={css.extraInfo}>
        <span>Dont have an account </span>
        <a href=""> signup</a>
      </div>
    </div>
  );
};

export default Login;
