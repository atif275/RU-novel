import React from "react";
import {
  
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import HomePage from './pages/HomePage'; 

function App() {
  console.log("App component rendered");
  return (
    <BrowserRouter>
      
      <Routes>

        {/* Set up the route for HomePage */}
        <Route path="/" element={<HomePage />} />
        {/* Add other routes here as your app expands */}
        {/* Example: <Route path="/about" element={<AboutPage />} /> */}
                
      </Routes>
     

      
    </BrowserRouter>
  );
}

export default App;