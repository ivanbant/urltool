import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        const user = await axios.post(
          "http://localhost:5000/api/users",
          {
            name,
            email,
            password,
          },
          { withCredentials: true }
        );
        toast.success("User created successfully");
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="my-16 mx-auto w-full flex justify-center items-center min-h-[50vh]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-10 w-1/3 space-y-3 "
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="flex-1 p-3 border-2 rounded-lg placeholder-yellow-500 focus:outline-none"
          placeholder="Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="flex-1 p-3 border-2 rounded-lg placeholder-yellow-500 focus:outline-none"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassowrd(e.target.value)}
          type="password"
          className="flex-1 p-3 border-2 rounded-lg placeholder-yellow-500 focus:outline-none"
          placeholder="Password"
        />
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          className="flex-1 p-3 border-2 rounded-lg placeholder-yellow-500 focus:outline-none"
          placeholder="Comfirm Password"
        />
        <button className="px-10 py-3 text-white bg-cyan rounded-lg hover:bg-cyanLight focus:outline-none md:py-2">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpScreen;
