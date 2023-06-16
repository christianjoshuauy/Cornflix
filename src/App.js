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
import { selectUser, setUser } from "./redux/slices/authSlice";
import { createUser, getCurrentUser } from "./firebase/firebase";
import { getDoc } from "firebase/firestore";
import Modal from "./components/Modal/Modal";
import { selectIsOpen } from "./redux/slices/modalSlice";
const Home = React.lazy(() => import("./pages/Home/Home"));
const Movies = React.lazy(() => import("./pages/Movies/Movies"));
const Favorites = React.lazy(() => import("./pages/Favorites/Favorites"));
const Popular = React.lazy(() => import("./pages/Popular/Popular"));
const Series = React.lazy(() => import("./pages/Series/Series"));
const Search = React.lazy(() => import("./pages/Search/Search"));

function App() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();
  const showNavBar = location.pathname !== "/";

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) {
        dispatch(setUser(null));
      }
      createUser(user).then((user) => {
        if (!user) return;
        getDoc(user).then((snap) => {
          dispatch(setUser(snap.data()));
        });
      });
    });
  }, [user, dispatch]);

  useEffect(() => {
    if (!user && location.pathname !== "/") {
      navigate("/");
    }
  }, [user, location, navigate]);

  return (
    <div className="App">
      {showNavBar && <NavBar />}
      {isOpen && <Modal />}
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
            path="/favorites"
            element={user ? <Favorites /> : <Navigate to="/" />}
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
