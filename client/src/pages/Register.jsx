import { useRef } from "react"; // Import useRef hook from React
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom
import axios from "../axiosConfig"; // Import axios instance

function Register() {
  const navigate = useNavigate(); // Initialize navigate function

  // Create references for form input elements
  const usernameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Get values from input elements
    const usernameValue = usernameDom.current.value;
    const firstNameValue = firstNameDom.current.value;
    const lastNameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    // Check if all required fields are filled
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
      // Send POST request to register the user
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstNameValue,
        lastname: firstNameValue,
        email: emailValue,
        password: passwordValue,
      });

      alert("register successfull. please login ");
      navigate("/login"); // Navigate to login page
    } catch (error) {
      alert("something went wrong, try again later");
      console.log(error.response); // Log error response
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
