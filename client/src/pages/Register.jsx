import { useRef } from "react";

import axios from "../axiosConfig";


function Register() {
  const usernameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(event) {
   
    event.preventDefault();
    try{
        await axios.post("/users/register", { 
            username: usernameDom.current.value,
            firstname: firstNameDom.current.value,
            lastname: lastNameDom.current.value,
            email: emailDom.current.value,
            password: passwordDom.current.value
          })
    }catch(err){
        console.log(error.response)
    }
   
//     try{
//     await axios.post("/users/register", {
    
//             username:'',
//          firstname:'',
// lastname:'',email:'',
// password:''});

//         });
//     }catch(err){
//         console.log(err.response);
//   }
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
