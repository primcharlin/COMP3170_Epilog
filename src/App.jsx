import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MoviesProvider } from "./context/MoviesContext";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import MyMovies from "./pages/MyMovies";
import Watchlist from "./pages/Watchlist";

function App() {
    return (
        <MoviesProvider>
            <BrowserRouter>
                <div className='page'>
                    <Header />
                    <main className='main-content'>
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
                                path='/watchlist'
                                element={<Watchlist />}
                            />
                            <Route
                                path='/favourites-myreviews'
                                element={<Watchlist />}
                            />
                            
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </MoviesProvider>
    );
}

export default App;
