import { useAuthContext } from "./useAuthContext";
import { useCardsContext } from "./useCardsContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchCards } = useCardsContext()
    

    const logout = () => {
        // REMOVE USER FROM STORAGE
        localStorage.removeItem('user')

        // DISPATCH LOGOUT
        dispatch({type: 'LOGOUT'})
        dispatchCards({ type: 'SET_CARDS', payload: null})
    }

    return { logout }
}