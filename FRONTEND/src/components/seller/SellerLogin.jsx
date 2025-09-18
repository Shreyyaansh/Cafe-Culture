import { useEffect, useState } from "react";
import { UseAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import logo from '../../assets/logo.jpg';

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate,axios } = UseAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  const onSubmitHandler = async (e) => {
    try {
      const {data} = await axios.post('/api/seller/login',{email,password});
      if(data.success){
        setIsSeller(true);
        navigate('/seller');

      } 
      else{
        toast.error(data.message);
      }

    } catch (error) {
        toast.error(error.message);
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center mb-6">
        <img src={logo} alt="Salasar Grocery Store Logo" className="h-14 w-14 object-contain mb-2" />
        <span className="font-bold text-2xl text-indigo-700">SALASAR</span>
      </div>
      <form
        onSubmit={onSubmitHandler}
        className="
          flex flex-col gap-4 w-full max-w-sm p-8 
          rounded-lg shadow-2xl border border-gray-200 bg-white
        "
      >
        <p className="text-2xl font-medium text-center">
          <span className="text-indigo-500">Seller</span> Login
        </p>

        <div className="w-full">
          <p className="mb-1">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="seller@example.com"
            className="
              border border-gray-300 rounded w-full p-3 
              mt-1 outline-indigo-500 focus:border-indigo-500
              transition-colors duration-200
            "
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-1">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="********"
            className="
              border border-gray-300 rounded w-full p-3 
              mt-1 outline-indigo-500 focus:border-indigo-500
              transition-colors duration-200
            "
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          className="
            bg-indigo-600 hover:bg-indigo-700 transition-all duration-300
            text-white w-full py-3 rounded-md font-semibold 
            shadow-md hover:shadow-lg mt-2
          "
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SellerLogin;
