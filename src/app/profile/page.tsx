"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function ProfilePage() {

  const router = useRouter();
  const [data, setData] = useState("nothing")
  const logout =async () =>{
    try {
      await axios.get("/api/users/logout")
      toast.success('Logout Successful')
      router.push("/login")
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
      
    }
  }
  const getUserDetails  = async () => {
    const res = await axios.get('/api/users/me');
    console.log(res.data);
    setData(res.data.data._id)
  }

  return (
    <div className=' flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <br/>
        <p>Profile page</p>
        <br/>
        <h2 className='p-1 rounded bg-green-300'>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <br/>
        <button onClick={logout} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Logout</button><br/>
        <button onClick={getUserDetails} className='bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Get User Details</button>
    </div>
  )
}

export default ProfilePage
