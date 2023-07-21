import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Create from "./pages/Create";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Search from "./pages/Search";
import ViewPost from "./pages/ViewPost";
import Explore from "./pages/Explore";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Start from "./pages/Start";


function App () {
  const { currentUser } = useContext( AuthContext );

  const ProtectedRoute = ( { children } ) => {
    if ( !currentUser ) {

      return window.location.replace( `${import.meta.env.VITE_appURL}/login` )
    }
    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={ <Start /> } />
          <Route path="login" element={ <Login /> } />
          <Route path="register" element={ <Register /> } />
          {/*<---------- Protected Routes: Can only be accessed if logged in ---------------> */ }
          <Route path="create" element={ <ProtectedRoute><Create /></ProtectedRoute> } />
          <Route path="search" element={ <ProtectedRoute><Search /></ProtectedRoute> } />
          <Route path="profile" element={ <ProtectedRoute><Profile /></ProtectedRoute> } />
          <Route path="edit_profile" element={ <ProtectedRoute><EditProfile /></ProtectedRoute> } />
          <Route path="/view_post" element={ <ProtectedRoute><ViewPost /></ProtectedRoute> } />
          <Route path="/explore" element={ <ProtectedRoute><Explore /></ProtectedRoute> } />
          < Route path="/home" element={ < ProtectedRoute > <Home /></ProtectedRoute > } />
          {/* <------------------ End of Protected Routes -----------------------------------> */ }
        </Route >
      </Routes >
    </BrowserRouter >
  )
}

export default App
