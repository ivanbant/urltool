import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassowrd] = useState("");
  const [newPassword, setNewPassowrd] = useState("");
  const [confirmNewPassword, setConfirmNewPassowrd] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/users/profile",
          { withCredentials: true }
        );
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchUser();
  }, []);

  const handleUpdateProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name,
          email,
        },
        { withCredentials: true }
      );
      if (data) {
        toast.success("Profile Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      try {
        const { data } = await axios.put(
          "http://localhost:5000/api/users/profile",
          {
            password: oldPassword,
            newPassword,
          },
          { withCredentials: true }
        );
        if (data) {
          toast.success("Profile Updated");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="p-16 mx-auto w-full flex flex-col justify-center items-center space-y-3">
      <h1 className="text-2xl font-semibold">User Profile</h1>
      <form
        onSubmit={handleUpdateProfileSubmit}
        className="flex flex-col p-5 w-1/3 space-y-3 "
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

        <button
          type="submit"
          className="px-10 py-3 text-white bg-cyan rounded-lg hover:bg-cyanLight focus:outline-none md:py-2"
        >
          Update Profile
        </button>
      </form>
      <form
        onSubmit={handleUpdatePasswordSubmit}
        className="flex flex-col p-5 w-1/3 space-y-3 "
      >
        <input
          value={oldPassword}
          onChange={(e) => setOldPassowrd(e.target.value)}
          type="password"
          className="flex-1 p-3 border-2 rounded-lg placeholder-yellow-500 focus:outline-none"
          placeholder="Old Password"
        />
        <input
          value={newPassword}
          onChange={(e) => setNewPassowrd(e.target.value)}
          type="password"
          className="flex-1 p-3 border-2 rounded-lg placeholder-yellow-500 focus:outline-none"
          placeholder="New Password"
        />
        <input
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassowrd(e.target.value)}
          type="password"
          className="flex-1 p-3 border-2 rounded-lg placeholder-yellow-500 focus:outline-none"
          placeholder="Confirm New Password"
        />
        <button
          type="submit"
          className="px-10 py-3 text-white bg-cyan rounded-lg hover:bg-cyanLight focus:outline-none md:py-2"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ProfileScreen;
