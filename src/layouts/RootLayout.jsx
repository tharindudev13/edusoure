import { Outlet } from "react-router"
import NavBar from "../components/Navbar"
import { useEffect, useState } from "react"
import RoleSelectionModal from "../pages/RoleSelection"
import { useSelector } from "react-redux"

const RootLayout = () => {


    useEffect(() => {{
      setTimeout(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }, 1000 * 60 * 60 * 24) 
    }})

    const { user } = useSelector((state) => state.auth);
    const [hasDismissedModal, setHasDismissedModal] = useState(false);

    const isModalOpen = user?.roles?.includes("ROLE_NONE") && !hasDismissedModal;

    const handleCloseModal = () => {
        setHasDismissedModal(true);
        sessionStorage.setItem("role_prompted", "true");
    };

   
    return(
        <>
        <NavBar/>
        <div  className="-mt-16 md:mt-0 min-h-screen bg-slate-50 ">
            <RoleSelectionModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <Outlet />
            <div className="h-15 w-full clear-both" aria-hidden="true" />
        </div>

        </>
    )
}
export default RootLayout