import React, { useState }  from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import reactLogo from '../assets/react.svg';
import cookie from 'js-cookie';
 
const Login_Test = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, csrfToken } = useAuth();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie')
        .then(response => {
            axios.post('/api/login', {
                email: email,
                password: password
            }).then(response => {
                
                if (response.status === 200) {
                    console.log(response.data.data.user);
                    
                    setUser(response.data.data.user);
                    //navigate("/profile");
                }
            })
        });
    }
    return (
        
        // <div className='max-w-7xl mx-auto my-0 p-8 text-center'>  
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 max-w-7xl text-center">
                <a href="#" target="_blank" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img src={reactLogo} className="w-8 h-8 mr-2" alt="React logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Laravel + React - Register
                    </span>
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0sm:max-w-md xl:p-0 darkbg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Sign in to your account
                                    </h1>
                        <form 
                        action="#"
                        className='space-y-4 md:space-y-6'
                        method='post'
                        onSubmit={handleSubmit}  
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        <button 
                            type="submit"
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"  
                        >
                            Log In
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account yet? {' '}
                            <Link
                            to="/register"
                            className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                            >
                            Sign Up  
                            </Link>
                        </p>
                        </form>
                        <div className="text-3xl font-bold underline mt-10">
                            <h1> or visit  
                            <Link
                            to="/tasks"
                            className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                            >
                            Tasks  
                            </Link>
                            page
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
       
    );
}
 
export default Login_Test;