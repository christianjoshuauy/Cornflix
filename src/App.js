import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import NavBar from "./components/NavBar/NavBar";
import Auth from "./pages/Auth/Auth";
const Home = React.lazy(() => import("./pages/Home/Home"));
const Movies = React.lazy(() => import("./pages/Movies/Movies"));
const MyList = React.lazy(() => import("./pages/MyList/MyList"));
const Popular = React.lazy(() => import("./pages/Popular/Popular"));
const Series = React.lazy(() => import("./pages/Series/Series"));
const Search = React.lazy(() => import("./pages/Search/Search"));

function App() {
  const location = useLocation();
  const showNavBar = location.pathname !== "/";
  return (
    <div className="App">
      {showNavBar && <NavBar />}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Auth />} />
          <Route exact path="/browse" element={<Home />} />
          <Route exact path="/browse/movies" element={<Movies />} />
          <Route exact path="/browse/series" element={<Series />} />
          <Route exact path="/browse/latest" element={<Popular />} />
          <Route exact path="/my-list" element={<MyList />} />
          <Route exact path="/search" element={<Search />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
