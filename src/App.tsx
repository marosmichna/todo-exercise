import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ToDosPage from "./pages/ToDosPage";

function App() {
 

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/toDos" element={<ToDosPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
