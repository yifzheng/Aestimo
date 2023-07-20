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


function App () {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={ <Home /> } />
          <Route path="login" element={ <Login /> } />
          <Route path="register" element={ <Register /> } />
          <Route path="create" element={ <Create /> } />
          <Route path="search" element={ <Search /> } />
          <Route path="profile" element={ <Profile /> } />
          <Route path="edit_profile" element={ <EditProfile /> } />
          <Route path="/view_post" element={ <ViewPost /> } />
          <Route path="/explore" element={ <Explore /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
