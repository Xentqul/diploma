import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main.js";

function App() {
  return (
    <div>
      <Header />
      
      <div className="content">
        <Main />
      </div>

      <Footer />
    </div>
  );
}

export default App;
