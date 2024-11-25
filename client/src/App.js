import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import SingleMovie from "./Pages/SingleMovie.js";
import Error from "./Pages/Error.js";
import Movies from "./Pages/Movies.js";
import TV from "./Pages/Tv.js";
import Home from "./Pages/Home.js";
import Account from "./Pages/Account.js";
import SingleTv from "./Pages/SingleTv.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TV />} />
          <Route path="/singleMovie/:id" element={<SingleMovie />} />
          <Route path="/singleTv/:id" element={<SingleTv />} />
          <Route path="/singleTv/:id" element={<SingleTv />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
