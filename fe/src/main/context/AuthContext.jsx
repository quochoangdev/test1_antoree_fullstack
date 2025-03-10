import { jwtDecode } from "jwt-decode"
import { createContext, useState, useEffect, useContext } from "react"
import {
  checkSessionUser,
  loginUser,
  logoutUser,
  loginGoogleToken,
  checkRemainingTime
} from "../../frontend/services/api"
import { toast } from "react-toastify"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const fetchCheckSessionUser = await checkSessionUser()
        if (fetchCheckSessionUser.status === 200) {
          const { f1web_access_token } = fetchCheckSessionUser.data
          setUserInfo(fetchCheckSessionUser?.data?.data_user)
          setUser(jwtDecode(f1web_access_token))
        } else {
          setUser(null)
        }
      } catch (error) {
        if (window.location.pathname !== '/login') {
          // window.location.href = '/login'
        }
        setUser(null)
      }
    }
    fetchUserProfile()
  }, [])

  const login = async ({ username, password }) => {
    try {
      let fetchLogin = await loginUser({ username, password })
      if (fetchLogin.status === 200) {
        const { f1web_access_token } = fetchLogin.data
        setUser(jwtDecode(f1web_access_token))
      }
    } catch (error) {
      toast.error("sai tài khoản hoặc mật khẩu")
    }
  }

  const loginGoogleTokenContext = async (id_token) => {
    try {
      let fetchLogin = await loginGoogleToken({ id_token })
      if (fetchLogin.status === 200) {
        const { f1web_access_token } = fetchLogin.data
        setUser(jwtDecode(f1web_access_token))
      }
    } catch (error) {
      toast.error("Tài khoản chưa được đăng ký/hoặc chưa liên kết email!!")
    }
  }

  const logout = async (remainingTime) => {
    sessionStorage.removeItem('usedTime')
    sessionStorage.removeItem('remainingTime')
    await checkRemainingTime({ remaining_seconds: remainingTime })
    await logoutUser()
    setUser(null)
  }


  return (
    <AuthContext.Provider
      value={{ user, userInfo, login, logout, loginGoogleTokenContext }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
