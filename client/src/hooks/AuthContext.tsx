import { createContext, useReducer, useEffect } from "react"

export const AuthContext = createContext()

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthState {
    user: User | null;
}

export type AuthAction = { type: 'LOGIN', payload: User } | { type: 'LOGOUT' };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null })

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            dispatch({ type: 'LOGIN', payload: JSON.parse(user) })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}