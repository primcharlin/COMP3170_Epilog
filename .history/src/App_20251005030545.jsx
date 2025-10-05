import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import MyMovies from "./pages/MyMovies";
import FavouritesReviews from "./pages/FavouritesReviews";

function App() {
    return (
        <BrowserRouter>
            <div className='page'>
                <Header />
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
                    />
                    <Route
                        path='/browse'
                        element={<Browse />}
                    />
                    <Route
                        path='/my-movies'
                        element={<MyMovies />}
                    />
                    <Route
                        path='/favourites-myreviews'
                        element={<FavouritesReviews />}
                    />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
