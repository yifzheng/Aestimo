import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import UserProfile from "./pages/UserProfile";


function App () {
  const { state: { currentUser } } = useContext( AuthContext );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={ <Start /> } />
          <Route path="login" element={ <Login /> } />
          <Route path="register" element={ <Register /> } />
          {/*<---------- Protected Routes: Can only be accessed if logged in ---------------> */ }
          <Route path="create" element={ Object.entries( currentUser ).length > 0 ? <Create /> : <Login /> } />
          <Route path="search" element={ Object.entries( currentUser ).length > 0 ? <Search /> : <Login /> } />
          <Route path="profile" element={ Object.entries( currentUser ).length > 0 ? <Profile /> : <Login /> } />
          <Route path="viewprofile/:userName" element={ Object.entries( currentUser ).length > 0 ? <UserProfile /> : <Login /> } />
          <Route path="edit_profile" element={ Object.entries( currentUser ).length > 0 ? <EditProfile /> : <Login /> } />
          <Route path="view_post" element={ Object.entries( currentUser ).length > 0 ? <ViewPost /> : <Login /> } />
          <Route path="explore" element={ Object.entries( currentUser ).length > 0 ? <Explore /> : <Login /> } />
          <Route path="home" element={ Object.entries( currentUser ).length > 0 ? <Home /> : <Login /> } />
          {/* <------------------ End of Protected Routes -----------------------------------> */ }
        </Route >
      </Routes >
    </BrowserRouter >
  )
}

export default App
