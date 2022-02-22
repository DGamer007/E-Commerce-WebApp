import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import EditProduct from './pages/EditProduct';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';
import PublicRoute from './routers/PublicRoute';
import PrivateRoute from './routers/PrivateRoute';

function App() {
  return (
    <Router>
      <Header />
      <SearchBar />
      <Routes>
        <Route path='/' exact element={<PublicRoute component={LoginPage} />} />
        <Route path='/signup' element={<PublicRoute component={SignupPage} />} />
        <Route path='/dashboard' element={<PrivateRoute component={Dashboard} />} />
        <Route path='/products' element={<PrivateRoute component={Products} />} />
        <Route path='/edit/:id' element={<PrivateRoute component={EditProduct} />} />
        <Route path='/cart' element={<PrivateRoute component={CartPage} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
