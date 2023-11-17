import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../services/UserContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");

  const { setCredentials } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      const data = res.data;
      if (data) {
        toast.success(`Welcome ${data.name}`);
        setCredentials(data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-16 mx-auto w-full flex justify-center items-center min-h-[40vh]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-10 w-1/3 space-y-3 "
      >
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

        <button
          onSubmit={handleSubmit}
          className="px-10 py-3 text-white bg-cyan rounded-lg hover:bg-cyanLight focus:outline-none md:py-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
