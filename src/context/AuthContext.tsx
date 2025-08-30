import { createContext, useState, type ReactNode, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import { useNavigate } from "react-router-dom"; // 👈 Import useNavigate



//Definir la interfaz para el contexto
interface AuthContextType {
    user: any;
    signup: any;
    signin: any;
    loading: boolean;
    isAuthenticated: boolean;
    errors: any
}



// Crear el contexto con un valor inicial tipado
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

// Props del proveedor
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErros] = useState<any>([]);
    const [loading, setLoading] = useState(true);



    const signup = async (data: any) => {
        try {
            const res = await registerRequest(data);
            setUser(res.data);
            setIsAuthenticated(true)
        } catch (error: any) {
            if (Array.isArray(error.response.data)) {
                return setErros(error.response.data)
            }
            setErros([error.response.data.message])
        }
    };

    const signin = async (data: any) => {
        try {

            const res = await loginRequest(data);
            setUser(res.data);
            setIsAuthenticated(true);
            navigate('/seating-chart')
        } catch (error: any) {
            if (Array.isArray(error.response.data)) {
                return setErros(error.response.data)
            }
            setErros([error.response.data.message])
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErros([])
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors])

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const res = await verifyTokenRequest(); 
                // console.log(res.data)
                setIsAuthenticated(true);
                setUser(res.data);
            } catch (error: any) {
                // console.log(error.status)
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            user,
            isAuthenticated,
            errors,
            loading,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
