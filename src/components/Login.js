import React from 'react';

const Login = () => {
  return (
    <div>
      <form>
        <input name="email" />
        Invalid email
        <input name="password" type="password" />
        <button action="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;