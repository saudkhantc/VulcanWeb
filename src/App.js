import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./Infrastructure/Helper/scrollToTop";
import { AuthProvider } from "./Infrastructure/States/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Router from "./Infrastructure/Router/router";

// app function 
function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
