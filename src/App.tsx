import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TripDetails from './pages/TripDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trip/:id" element={<TripDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;