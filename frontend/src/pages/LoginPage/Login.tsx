import {useState} from "react";

function Login() {
    const [register, setRegister] = useState(false)
    return (
        <div className="flex h-screen w-screen bg-white">
            <div className="w-1/2 flex justify-center items-center">
                <div className="w-full max-w-md p-8">
                    <h1 className="text-4xl font-bold mb-10 text-[#194569] text-center">{register ? "Register" : "Login"}</h1>
                    <form action="#" method="POST">

                        {register && (
                            <div className="flex space-x-2 mb-7">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Firstname"
                                    className="w-1/2 p-3 bg-gray-50 border  rounded-xl focus:outline-none focus:ring-2 focus:ring-[#194569]"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Lastname"
                                    className="w-1/2 p-3  bg-gray-50  border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#194569]"
                                />
                            </div>
                        )}
                        <div className="mb-7">
                            <input type="text" id="username" name="username" placeholder={"Username"}
                                   className="w-full h-12  bg-gray-50  border rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#194569]"
                                   autoComplete="off"/>
                        </div>
                        <div className="mb-4">
                            <input type="password" id="password" name="password" placeholder={"Password"}
                                   className="w-full h-12 bg-gray-50 border rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#194569]"
                                   autoComplete="off"/>
                        </div>
                        <div className="mb-10 flex items-center">

                            {!register && (
                                <div>
                                    <input type="checkbox" id="remember" name="remember" className="text-[#194569]"/>
                                    <label htmlFor="remember" className="text-[#194569] ml-2">Remember Me</label>
                                </div>
                            )}

                        </div>
                        <button type="submit"
                                className="bg-[#194569] hover:bg-blend-color-burn text-white font-semibold rounded-xl p-3 w-full">
                            Login
                        </button>
                    </form>
                    <div className="mt-6 text-[#194569] text-center">
                        <a href="#" onClick={() => setRegister(!register)} className="hover:underline">{register? "Already have an Account": "Register"}</a>
                    </div>
                </div>
            </div>

            <div className="w-1/2 overflow-hidden">
                <img src="/src/assets/login_img.png"
                     alt="Placeholder Image"
                     className="object-cover w-full h-full"/>
            </div>
        </div>
    );
}

export default Login;
