import { useAuthContext } from "./useAuthContext";
import { useCardsContext } from "./useCardsContext";

export const useLogout = () => {
    const { dispatch: dispatchAuth } = useAuthContext()
    const { dispatch: dispatchCards } = useCardsContext()

    const logout = () => {
        // REMOVE USER FROM STORAGE
        localStorage.removeItem('user')
    
        // DISPATCH LOGOUT
        dispatchAuth({
            type: 'LOGOUT',
            payload: undefined
        })
        dispatchCards({ type: 'SET_CARDS', payload: { _id: [] }})
    }
    
    return { logout }
}