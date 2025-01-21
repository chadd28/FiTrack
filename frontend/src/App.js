import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import Navbar from './components/NavigationBar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />       {/* Navbar placed outside the Routes to make it persist on every page */}
        <div className="pages">
          <Routes>
            {/* If you click on the "Home" component, it links to the '/' path */}
            <Route 
              path='/'
              element={ <Home /> }  
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
