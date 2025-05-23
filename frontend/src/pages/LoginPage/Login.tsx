import {useState} from "react";
import PasswordChecklist from "react-password-checklist"
import {LoginUser, RegisterUser} from "../../interfaces/UserInterfaces.ts";
import {loginUser, registerUser} from "../../services/LoginService.ts";
import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.tsx";

/**
 * @author Johanna Hechtl
 * @since 03.03.2025
 */



function Login() {
    const [register, setRegister] = useState(false);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const navigate = useNavigate();
    const { setUserId } =  useContext(UserContext)!;

    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (register) {
            const user: RegisterUser = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            }

            registerUser(user, setUserId)
                .then((res) => {
                    console.log(res);
                    setUserId(res)
                    // alert("User registered successfully");
                    setLoginSuccessful(true);
                }).catch((err) => {
                console.log(err);
                alert("User registration failed");
            });

        } else {
            const user: LoginUser = {
                email: email,
                password: password
            }
            loginUser(user, setUserId)
                .then((res) => {
                    console.log(res);
                    setUserId(res)
                    console.log("new user id" + res)
                    // alert("User logged in successfully");
                    setLoginSuccessful(true);
                }).catch((err) => {
                console.log(err);
                alert("User login failed");
            });
        }

        if (loginSuccessful) {
            navigate("/dashboard");
        }
    }


    return (
        <div className="flex h-screen w-screen bg-white">
            <div className="w-1/2 flex justify-center items-center">
                <div className="w-full max-w-md p-8">
                    <h1 className="text-4xl font-bold mb-10 text-[#194569] text-center">{register ? "Register" : "Login"}</h1>
                    <form onSubmit={handleSubmit}>
                        {register && (
                            <div className="flex space-x-2 mb-7">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Firstname"
                                    className="w-1/2 p-3 bg-gray-50 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#194569]"
                                    onChange={e => setFirstName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Lastname"
                                    className="w-1/2 p-3  bg-gray-50 text-black  border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#194569]"
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="mb-7">
                            <input type="email" id="email" name="email" placeholder={"Email"}
                                   className="w-full h-12  bg-gray-50 text-black  border rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#194569]"
                                   autoComplete="off"
                                   onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input type="password" id="password" name="password" placeholder={"Password"}
                                   className="w-full h-12 bg-gray-50 border text-black  rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#194569]"
                                   autoComplete="off"
                                   onChange={e => setPassword(e.target.value)}/>
                        </div>


                        {register && (
                            <>
                                <div className="mb-4">
                                    <input type="password" id="repeat-password" name="repeat-password"
                                           placeholder={"Repeat Password"}
                                           className="w-full h-12 bg-gray-50 border text-black  rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#194569]"
                                           autoComplete="off"
                                           onChange={e => setRepeatPassword(e.target.value)}/>
                                </div>
                                <div className="mb-10 flex items-center">

                                    <PasswordChecklist className={"text-black"}
                                                       rules={["minLength", "specialChar", "number", "match"]}
                                                       minLength={8}
                                                       value={password}
                                                       valueAgain={repeatPassword}
                                                       onChange={(isValid: never) => setIsPasswordValid(isValid)}

                                    />
                                </div>

                            </>

                        )}

                        {/*{!register && (*/}
                        {/*    <div className="mb-10 flex items-center">*/}
                        {/*        <input type="checkbox" id="remember" name="remember"/>*/}
                        {/*        <label htmlFor="remember" className="text-[#194569]  ml-2">Remember Me</label>*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        <button
                            type="submit"
                            className="bg-[#194569] text-white font-semibold rounded-xl p-3 w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                            disabled={
                                register
                                    ? !isPasswordValid || !isEmailValid(email) || !firstName.trim() || !lastName.trim()
                                    : !isEmailValid(email) || !password.trim()
                            }
                        >
                            {register ? "Register" : "Login"}
                        </button>
                    </form>
                    <div className="mt-6 text-[#194569] text-center">
                        <label>{register ? "Already have an Account?" : "No Account yet?"}</label>
                        <a href="#" onClick={() => setRegister(!register)}
                           className="hover:underline ml-1">{register ? "Login" : "Register"}</a>
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
