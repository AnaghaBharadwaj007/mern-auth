import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [returnedError, setReturnedError] = useState("");
  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setError(true);
        setReturnedError(data.error);
      } else {
        setError(false);
      }
      setLoading(false);
      navigate("/Profile");
    } catch (err) {
      console.log(err);
      setReturnedError(err);
      setError(true);
      setLoading(false);
    }
  }
  return (
    <div className="max-w-120 mx-auto">
      <h1 className="text-3xl text-center mt-4 font-semibold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2  mt-10">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg items-center"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg items-center"
          onChange={handleChange}
        />
        <button className="bg-slate-800 text-white rounded-lg p-3 hover:opacity-90 hover:cursor-pointer">
          {loading ? "Loading...." : "Sign in"}
        </button>
        <button className="bg-red-500 text-white rounded-lg p-3 hover:opacity-90 hover:cursor-pointer">
          Continue with Google
        </button>
      </form>
      <div className="my-2 flex flex-row gap-2 ">
        <p className="text-md">New user?</p>
        <span className="text-blue-400 ml-1.5">
          <Link to="/sign-up">Sign up</Link>
        </span>
      </div>
      <div>
        <p className="text-red-700 mt-3 items-center mx-auto text-2xl">
          {error ? returnedError : " "}
        </p>
      </div>
    </div>
  );
}
