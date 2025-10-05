import "./App.css";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Header />
            <h1>
                {" "}
                Your Personal Movie{" "}
                <span className='catalog-text'>Catalog</span>{" "}
            </h1>
            <h3>
                Track movies you've watched, discover new favorites, and keep
                your personal reviews all in one place. Your cinematic journey
                starts here.
            </h3>
        </>
    );
}

export default App;
