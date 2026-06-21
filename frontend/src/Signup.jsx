import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Footer from "./components/Footer";
import { updateProfile } from "firebase/auth";
export default function Signup() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
const [name, setName] = useState("");

  const signup = async () => {
    try{
      await createUserWithEmailAndPassword(auth,email,password);
      alert("Signup Successful");
    }catch(error){
      alert(error.message);
    }
  };

  return (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      signup();
    }}
  >
      <h2 className="text-xl font-bold mb-4">Create Account</h2>
       <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
      <input
        className="w-full border rounded-lg p-3 mb-3"
        type="email"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        className="w-full border rounded-lg p-3 mb-4"
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />
<button
  type="submit"
  className="w-full bg-blue-600 text-white p-3 rounded-lg"
>
  Sign Up
</button>
</form>
  );
  <div>
    <Footer />
  </div>
}