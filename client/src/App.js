import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import Body from "./components/body.js";
import Search from "./Pages/Search.js";
import SingleMovie from "./Pages/SingleMovie.js";
import Error from "./Pages/Error.js";
import Movies from "./Pages/Movies.js";
import TV from "./Pages/Tv.js";
import Home from "./Pages/Home.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TV />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Body />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
