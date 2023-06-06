import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Loading from "./components/Loading/Loading";
import NavBar from "./components/NavBar/NavBar";
import Auth from "./pages/Auth/Auth";
import { selectUser, setUserFromCookie } from "./redux/slices/authSlice";
import { getCookie } from "./utils";
const Home = React.lazy(() => import("./pages/Home/Home"));
const Movies = React.lazy(() => import("./pages/Movies/Movies"));
const MyList = React.lazy(() => import("./pages/MyList/MyList"));
const Popular = React.lazy(() => import("./pages/Popular/Popular"));
const Series = React.lazy(() => import("./pages/Series/Series"));
const Search = React.lazy(() => import("./pages/Search/Search"));

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();
  const showNavBar = location.pathname !== "/";

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie && !user) {
      dispatch(setUserFromCookie(userCookie));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!user && location.pathname !== "/") {
      navigate("/");
    }
  }, [user, location, navigate]);

  return (
    <div className="App">
      {showNavBar && <NavBar />}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Navigate to="/browse" /> : <Auth />}
          />
          <Route
            exact
            path="/browse"
            element={user ? <Home /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/browse/movies"
            element={user ? <Movies /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/browse/series"
            element={user ? <Series /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/browse/latest"
            element={user ? <Popular /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/my-list"
            element={user ? <MyList /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/search"
            element={user ? <Search /> : <Navigate to="/" />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
