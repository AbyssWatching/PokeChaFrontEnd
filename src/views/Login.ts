import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import "../assets/css/style.css"
import email_icon from "../assets/images/email_icon.png"
import password_icon from "../assets/images/pass.png"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className="main">
      <div className="main1">
    

        <form className="login" onSubmit={handleSubmit}>
          <h3 className="log_h">Log In</h3>
          
      <div className="emailbox">
        <label ><img src={email_icon} alt="email" className="email_icon"/></label>
        <input className="email"
        type="email" placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        />
     </div>
     <div className="passbox">
        <label><img src={password_icon} alt="password" className="pass"/></label>
        <input className="password"
        type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        />
      </div>
        <button className="logbtn btn"disabled={isLoading}>Log in</button>
        {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default Login