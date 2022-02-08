import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import EditProduct from './pages/EditProduct';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <SearchBar />
      <Routes>
        <Route path='/' exact element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/products' elements={<Products />} />
        <Route path='/edit/:id' element={<EditProduct />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
