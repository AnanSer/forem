import { useRef } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Get values from input elements
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    // Check if all required fields are filled
    if (!emailValue || !passwordValue) {
      alert("please provide all required informatiion ");
      return;
    }

    try {
      // Send POST request to register the user
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      alert(" successfully loged in ");
      // navigate("/");
      console.log(data);
      localStorage.setItem("token", data.token);
      // Navigate to login page
    } catch (error) {
      alert(error?.response?.data?.msg);

      console.log(error.response.data); // Log error response
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login;
