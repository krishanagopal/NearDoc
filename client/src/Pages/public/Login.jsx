import {useState} from "react";

import api from "../../api/axios";

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");  
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");


    const handleLogin =async (e)=>{
      e.preventDefault();
      setError("");
      setLoading(true);

      try{
        const response =await api.post("/auth/login",{
          email,password
        });
        //save token
        localStorage.setItem("token",response.data.token);

        console.log("Login successful:", response.data.token);
        alert("Login successful!");

      }catch(err){
        console.error("Login error:", err);
        setError(
          err.response?.data?.message ||"Login failed"
        );


      }finally{
        setLoading(false);
      }
    };

    return(
      <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && (
        <p className="text-red-600 mb-3">{error}</p>
      )}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
    )

};

export default Login;
