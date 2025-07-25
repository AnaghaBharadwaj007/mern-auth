import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div className="max-w-120 mx-auto">
      <h1 className="text-3xl text-center mt-4 font-semibold mb-4">Sign Up</h1>
      <form className="flex flex-col gap-2  mt-10">
        <input
          type="text"
          placeholder="userName"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg items-center"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg items-center"
        />
        <button className="bg-slate-800 text-white rounded-lg p-3 hover:opacity-90 hover:cursor-pointer">
          Sign up
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
    </div>
  );
}
