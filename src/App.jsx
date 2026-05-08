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
import RequestClassNav from "./components/Req";

function App() {



  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route path="/profile/:name/:id" element={<ProfilePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/class/:teacher/:id" element={<ClassDetailsPage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/request-class" element={<RequestClassForm />} />
        <Route path="/test" element={<RequestClassNav />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
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