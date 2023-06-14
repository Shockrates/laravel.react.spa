import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import router from './router'

import Axios from 'axios';

import { RouterProvider} from "react-router-dom";


function App() {

    const axios = Axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });

  useEffect(() => {
    getToken();
  }, []);

  async function getToken() {
    // const csrf = await axios.get('/sanctum/csrf-cookie');
    // console.log('csrf = ', csrf);
    
   
    // axios.post("/api/login", {
    //   email:"tester@test.com",
    //   password:"@@Test1234"
    // })
    //     .then(response => console.log(response.data.data.user));

  }
  
  return (
    <div className="App">
       <RouterProvider router = {router} />
    </div>
  )
}

export default App

