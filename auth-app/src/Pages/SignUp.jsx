import { useState } from "react";
import { Link } from "react-router-dom";
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);

      if (!res.ok) {
        setError(true);
      } else {
        setError(false);
      }
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  }
  return (
    <div className="max-w-120 mx-auto">
      <h1 className="text-3xl text-center mt-4 font-semibold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2  mt-10">
        <input
          type="text"
          placeholder="userName"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
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
          {loading ? "Loading...." : "Sign up"}
        </button>
        <button className="bg-red-500 text-white rounded-lg p-3 hover:opacity-90 hover:cursor-pointer">
          Continue with Google
        </button>
      </form>
      <div className="my-2 flex flex-row gap-2 ">
        <p className="text-md">Already have an Acc?</p>
        <span className="text-blue-400 ml-1.5">
          <Link to="/sign-in">Sign in</Link>
        </span>
      </div>
      <div>
        <p className="text-red-700 mt-3 items-center mx-auto text-2xl">
          {error ? "Something went wrong!!" : ""}
        </p>
      </div>
    </div>
  );
}
