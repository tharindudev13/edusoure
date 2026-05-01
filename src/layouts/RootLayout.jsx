import { Outlet } from "react-router"
import NavBar from "../components/Navbar"

const RootLayout = () => {

    return(
        <>
        <NavBar/>
        <div className="min-h-screen bg-slate-50">
            <Outlet />
        </div>    

        </>
    )
}
export default RootLayout