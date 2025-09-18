import React, { useState,useEffect } from 'react'
import { assets } from '../assets/assets'
import { UseAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'


const InputField = ({type,placeHolder,name,handleChange,address})=>(
    <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-indigo-50 transition' type={type}
    placeholder={placeHolder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required/>

)

const AddAddress = () => {

    const {axios,user,navigate} = UseAppContext();

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const handleChange = (e) => {   
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }))}


    const onSubmitHandler =async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/address/add',{address});
            if(data.success){
                toast.success(data.message);
                navigate('/cart');
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        
    }

    useEffect(()=>{
        if(!user){
            navigate('/cart');
        }
    },[]);

  return (
    <div className='mt-16 pb-16'>
        <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold'>Address</span></p>
        <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
            <div className='flex-1 max-w-md'>
                <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField handleChange={handleChange} address={address} name='firstName' type="text"
                        placeHolder="First Name"/>
                        <InputField handleChange={handleChange} address={address} name='lastName' type="text"
                        placeHolder="Last Name"/>

                    </div>
                    <InputField handleChange={handleChange} address={address} name='email' type="email"
                        placeHolder="Email Address"/>
                    <InputField handleChange={handleChange} address={address} name='street' type="text"
                        placeHolder="Street"/>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField handleChange={handleChange} address={address} name='city' type="text"
                            placeHolder="City"/>
                        <InputField handleChange={handleChange} address={address} name='state' type="text"
                            placeHolder="State"/> 
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField handleChange={handleChange} address={address} name='zipcode' type="text"
                            placeHolder="zipcode"/>
                        <InputField handleChange={handleChange} address={address} name='country' type="text"    
                            placeHolder="Country"/>
                    </div>

                    <InputField handleChange={handleChange} address={address} name='phone' type="text"
                        placeHolder="Phone Number"/>
                    <button type='submit' className='w-full bg-indigo-500 text-white py-2.5 rounded hover:bg-indigo-600 transition'>
                        Add Address
                    </button>
                </form>

            </div>
            <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />

        </div>
      
    </div>
  )
}

export default AddAddress
