import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/Home";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import ProfilePage from "./pages/Profile";

function App() {



  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
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