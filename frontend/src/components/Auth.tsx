import { SignUpInput } from "@ashishkalsi07/med-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    email: "",
    name: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  async function sendRequest() {
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`, {
        email: postInputs.email,
        name: postInputs.name,
        password: postInputs.password
      });
      const jwt = response.data;
      console.log("JWT:", jwt);
      localStorage.setItem("token", jwt.jwt);
      setTimeout(() =>{
        setLoading(false);
      }, 3000);
      navigate("/blogs");
    } catch (error) {
      //alert the user
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again.");
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an Account</div>
            <div className="text-slate-500">
              {type === "signin" ? "Don't have an account?" : "Already have an account?"}
              <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div className="mt-10">
            <LabeledInput label="Email" type="text" placeholder="" onchange={(e) => { setPostInputs({ ...postInputs, email: e.target.value }) }} />
            {type === "signup" && <LabeledInput label="Name" type="text" placeholder="" onchange={(e) => { setPostInputs({ ...postInputs, name: e.target.value }) }} />}
            <LabeledInput label="Password" type="password" placeholder="" onchange={(e) => { setPostInputs({ ...postInputs, password: e.target.value }) }} />
            <button onClick={() => { sendRequest() }} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm mt-10 px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up" : "Sign In"}</button>
            {loading && <div className="text-center text-green-500">{type === "signup" ? "Signing up..." : "Signing in..."}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
interface LabeledInputProps {
  label: string
  placeholder: string
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: string
}

function LabeledInput({ label, placeholder, onchange, type }: LabeledInputProps) {
  return (
    <div>
      <div>
        <label className="block mt-2 text-sm font-medium text-black">{label}</label>
        <input type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-r focus:none " placeholder={placeholder} required onChange={onchange} />
      </div>
    </div>
  )
}

export default Auth
