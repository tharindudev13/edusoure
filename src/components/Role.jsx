import { useState } from "react";
import { useSelector } from "react-redux";
import RoleSelection from "../pages/RoleSelection";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const [hasDismissedModal, setHasDismissedModal] = useState(false);

  // 1. Is the user logged in?
  // 2. Is this an OAuth account with missing details?
  // 3. Have they already seen this modal during this specific browser tab session?
  const isNewOAuthUser = user && !user.phone && !user.address;
  const hasPromptedThisSession = sessionStorage.getItem("role_prompted");
  const isModalOpen = Boolean(
    isNewOAuthUser && !hasPromptedThisSession && !hasDismissedModal
  );

  const handleCloseModal = () => {
    setHasDismissedModal(true);
    sessionStorage.setItem("role_prompted", "true"); // Ensures it won't pop up again while surfing pages
  };

  return (
    <div>
      {/* Your normal dashboard sidebar / content layout views here */}
      
      <RoleSelection isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default DashboardLayout;