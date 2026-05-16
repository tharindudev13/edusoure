import { Outlet } from "react-router"
import NavBar from "../components/Navbar"

const RootLayout = () => {

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