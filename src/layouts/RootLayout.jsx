import { Outlet } from "react-router"
import NavBar from "../components/Navbar"
import GoToLogin from "../pages/GoToLogin"
import { useEffect } from "react"

const RootLayout = () => {

    const token = localStorage.getItem('token')

    useEffect(() => {{
      setTimeout(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }, 1000 * 60 * 60 * 24) 
    }})

    if(!token){
        return(
            <GoToLogin />
        )
    }   

    return(
        <>
        <NavBar/>
        <div  className="-mt-16 md:mt-0 min-h-screen bg-slate-50 ">
            <Outlet />
            <div className="h-15 w-full clear-both" aria-hidden="true" />
        </div>    

        </>
    )
}
export default RootLayout