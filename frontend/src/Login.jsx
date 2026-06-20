import { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      login();
    }}
  >
      <h2 className="text-xl font-bold mb-4">
        Login
      </h2>

      <input
        className="w-full border rounded-lg p-3 mb-3"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border rounded-lg p-3 mb-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
  type="submit"
  className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
>
  Login
</button>
</form>

  );
}