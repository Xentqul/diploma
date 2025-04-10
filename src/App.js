import logo from "./logo.svg";
import "./App.css";
import Header from "./shared/layout/Header/Header";
import Footer from "./shared/layout/Footer/Footer";
import Main from "./pages/MainPage/MainPage.js";

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
