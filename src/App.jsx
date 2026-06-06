import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/Home";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import ProfilePage from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import ClassesPage from "./pages/Classes";
import ClassDetailsPage from "./pages/ClassDetails";
import MaterialsPage from "./pages/Materials";
import RequestClassForm from "./pages/RequestClass";
// import ComingSoon from "./pages/ComingSoon";
import QuizEngine from "./pages/Quiz";
import QuizPlay from "./components/QuizPlay";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/Privacy";
import SettingsPage from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardLayout from "./components/Role";

function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route path="/profile/:id/:name" element={<ProfilePage />} />
        <Route path="/myprofile/:id/:name" element={<ProfilePage/>} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/class/:teacher/:id" element={<ClassDetailsPage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/request-class" element={<RequestClassForm />} />
        <Route path="/quizes" element={<QuizEngine />} />
        <Route path="/quiz/:id" element={<QuizPlay />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/test" element={<DashboardLayout />} />

      </>
    )
  )

  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;