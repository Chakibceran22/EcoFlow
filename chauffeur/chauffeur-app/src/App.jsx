import MapComponent from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DriverProfile from "./pages/Profile";

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapComponent/>}></Route>
        <Route path="/profile" element={<DriverProfile/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
