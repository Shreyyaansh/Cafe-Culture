import React from 'react'
import { UseAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import logo from '../assets/logo.jpg';

const Login = () => {

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {showUserLogin, setShowUserLogin,setUser,axios,navigate} = UseAppContext();

    const onSubmitHandler =async (event)=>{
        try {
            event.preventDefault();
            // setShowUserLogin(false);

            const {data} = await axios.post(`/api/user/${state}`,
                {
                    name,email,password
                }
            );

            if(data.success)
            {
                setUser(data.user);
                setShowUserLogin(false);
                navigate('/');
            }
            else{
                toast.error(data.message);

            }
            
        } catch (error) {
    console.log("Login Error:", error.response?.data); // Debug output
    const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
    toast.error(errorMsg);
}

    }

    return (
        // Overlay container: covers the whole screen and centers its child
        <div
            onClick={() => setShowUserLogin(false)}
            className='
                fixed inset-0 z-50  
                flex items-center justify-center /* Center content vertically and horizontally */
                text-sm text-gray-600 bg-black/50 /* Semi-transparent overlay */
            '
        >
            {/* Login Form */}
            <form
                onClick={(e) => e.stopPropagation()} 
                className="
                    flex flex-col gap-4 m-auto items-start p-8 py-12 
                    w-80 sm:w-[352px] rounded-lg shadow-2xl 
                    border border-gray-200 bg-white
                    relative 
                    max-h-[90vh] overflow-y-auto 
                "
                onSubmit={onSubmitHandler}
            >
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="Salasar Grocery Store Logo" className="h-14 w-14 object-contain mb-2" />
                    <span className="font-bold text-2xl text-indigo-700">SALASAR</span>
                </div>

                <p className="text-2xl font-medium m-auto">
                    <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>

                {/* Name Field (Conditional) */}
                {state === "register" && (
                    <div className="w-full">
                        <p className="mb-1">Name</p> {/* Added mb-1 for spacing */}
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Type your full name" /* More descriptive placeholder */
                            className="
                                border border-gray-300 rounded w-full p-3 /* Increased padding for better feel */
                                mt-1 outline-indigo-500 focus:border-indigo-500 transition-colors duration-200 /* Improved focus style */
                            "
                            type="text"
                            required
                        />
                    </div>
                )}

                {/* Email Field */}
                <div className="w-full">
                    <p className="mb-1">Email</p> {/* Added mb-1 for spacing */}
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="your@example.com" /* More descriptive placeholder */
                        className="
                            border border-gray-300 rounded w-full p-3 /* Increased padding */
                            mt-1 outline-indigo-500 focus:border-indigo-500 transition-colors duration-200
                        "
                        type="email"
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="w-full">
                    <p className="mb-1">Password</p> {/* Added mb-1 for spacing */}
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="********" /* Generic placeholder */
                        className="
                            border border-gray-300 rounded w-full p-3 /* Increased padding */
                            mt-1 outline-indigo-500 focus:border-indigo-500 transition-colors duration-200
                        "
                        type="password"
                        required
                    />
                </div>

                {/* Toggle between Login/Register */}
                {state === "register" ? (
                    <p className="mt-2 text-center w-full"> {/* Centered text */}
                        Already have an account?{" "}
                        <span onClick={() => setState("login")} className="text-indigo-600 font-medium cursor-pointer hover:underline"> {/* Emphasized link */}
                            Log in here
                        </span>
                    </p>
                ) : (
                    <p className="mt-2 text-center w-full"> {/* Centered text */}
                        Don't have an account?{" "}
                        <span onClick={() => setState("register")} className="text-indigo-600 font-medium cursor-pointer hover:underline"> {/* Emphasized link */}
                            Sign up
                        </span>
                    </p>
                )}

                {/* Submit Button */}
                <button
                    type="submit" /* Important for form submission */
                    className="
                        bg-indigo-600 hover:bg-indigo-700 transition-all duration-300
                        text-white w-full py-3 rounded-md cursor-pointer /* Increased padding */
                        mt-4 /* More spacing above button */
                        font-semibold 
                        shadow-md hover:shadow-lg 
                    "
                >
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Login;