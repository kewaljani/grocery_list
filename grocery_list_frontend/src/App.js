import './App.css';
import 'antd/dist/reset.css';
import ToDo from "./Pages/ToDo/todo";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                  <ToDo />
              }
            />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
