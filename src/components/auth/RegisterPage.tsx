import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const { signup, isAuthenticated, errors: RegisterError } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/login')
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (data) => {
        signup(data);
    })

    const [expandWidth, setExpandWidth] = useState(false);
    const [expandHeight, setExpandHeight] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setTimeout(() => setExpandWidth(true), 200);       // expand horizontal
        setTimeout(() => setExpandHeight(true), 1400);    // expand vertical
        setTimeout(() => setShowForm(true), 2900);        // mostrar formulario
    }, []);
    return (
        <div className="bg-[#0F0F0F] w-screen h-screen flex items-center justify-center">
            <div
                className="bg-[#0F0F0F] border-2 border-[#E6E6E6] transition-all duration-[2000ms] ease-in-out flex flex-col items-center justify-center rounded-tl-2xl rounded-br-2xl relative"
                style={{
                    width: expandWidth ? "350px" : "10px",
                    height: expandHeight ? "530px" : "10px",
                }}
            >

                {/* Formulario con fade-in */}
                <form onSubmit={onSubmit}
                    className="flex flex-col gap-4 w-[80%] transition-opacity duration-1000"
                    style={{
                        opacity: showForm ? 1 : 0,
                        transition: "opacity 1s ease-in-out",
                    }}
                >
                    <div className="flex justify-center mb-2.5">
                        <img src="Logo.png" alt="Logo" className="h-auto w-20" />
                    </div>
                    {
                        RegisterError.map((error: any, i: number) => (
                            <div key={i} className="bg-red-500 p-2 text-white text-center">
                                {error}
                            </div>
                        ))
                    }


                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username", { required: true })}
                        className="bg-transparent border-2 border-[#E6E6E6] text-[#E6E6E6] placeholder-[#E6E6E688] rounded px-4 py-2 font-mono focus:outline-none focus:border-[#757575] transition-all duration-300"
                    />
                    {errors.username && <span className="text-red-500 mt-[-12px] ">Username is required</span>}

                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                        className="bg-transparent border-2 border-[#E6E6E6] text-[#E6E6E6] placeholder-[#E6E6E688] rounded px-4 py-2 font-mono focus:outline-none focus:border-[#757575] transition-all duration-300"
                    />
                    {errors.email && <span className="text-red-500 mt-[-12px]">Email is required</span>}

                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-transparent border-2 border-[#E6E6E6] text-[#E6E6E6] focus:border-[#757575] rounded px-4 py-2 font-mono focus:outline-none transition-all duration-300"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <span className="text-red-500 mt-[-12px]">Password is required</span>}
                    <button
                        type="submit"
                        className="bg-[#000] text-[#E6E6E6] font-mono font-bold py-2 rounded hover:bg-[#696969] hover:text-white transition-all duration-300"
                    >
                        SIGN UP
                    </button>
                    {/* Enlace para registrarse */}
                    <p className="text-center text-[#868686] text-sm mt-4 font-mono">
                        ¿Already have an account?{" "}
                        <br />
                        <Link
                            to="/login"
                            className="text-[#ffffff] hover:text-[#9b9b9b] transition-all duration-300"
                        >
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}



export default RegisterPage