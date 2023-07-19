import React, { useState } from "react";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

return (
  <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80)' }}>
    <form onSubmit={handleSubmit} className="max-w-xs">
      {/* Email input */}
      <div className="mb-2">
        <label htmlFor="email" className="mb-1 text-3xl text-stone-100">Email</label>
        <div className="flex">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
            className="border border-gray-300 rounded py-2 px-4 mt-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      {/* Password input */}
      <div className="mb-2">
        <label htmlFor="password" className="mb-1 text-3xl text-stone-100">Password</label>
        <div className="flex">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      {/* Login button */}
      <button
        type="submit"
        className="bg-cyan-400 hover:bg-yellow-300 text-green-800 font-bold py-2 px-4 mt-1.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Login
      </button>
    </form>
    <button
      onClick={() => props.onFormSwitch("signup")}
      className="text-stone-100 hover:text-yellow-300 mt-4"
    >
      Don't have an account? Signup here!
    </button>
  </div>
);

 
};