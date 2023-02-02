import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

interface User {
  token: string;
  [key: string]: any;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)


  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }
  return context as { user: User }

}