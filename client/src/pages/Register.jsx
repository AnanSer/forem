import { useRef } from "react";

import { useNavigate } from "react-router-dom";

import axios from "../axiosConfig";

function Register() {
  const navigate = useNavigate();

  const usernameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(event) {
    event.preventDefault();

    const usernameValue = usernameDom.current.value;
    const firstNameValue = firstNameDom.current.value;
    const lastNameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (
      !usernameValue ||
      !firstNameValue ||
      !lastNameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("please provide all required informatiion ");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstNameValue,
        lastname: lastNameValue,
        email: emailValue,
        password: passwordValue,
      });

      alert("register successfull. please login ");
      navigate("/login");
    } catch (error) {
      alert("something went wrong, try again later");
      console.log(error.response);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            ref={usernameDom}
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            ref={firstNameDom}
            type="text"
            id="firstName"
            name="firstName"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            ref={lastNameDom}
            type="text"
            id="lastName"
            name="lastName"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input ref={emailDom} type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            ref={passwordDom}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default Register;
