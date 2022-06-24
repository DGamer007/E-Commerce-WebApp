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
import PublicRoute from './routers/client/PublicRoute';
import PrivateRoute from './routers/client/PrivateRoute';
import CreateProduct from './pages/CreateProduct';
import { useState } from 'react';

const FileUpload = () => {

  const [imgSrc, setImgSrc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', e.target.elements.image.files[0]);
    formData.append('username', e.target.elements.username.value);

    const requestObject = {
      method: 'POST',
      body: formData
    };

    const res = await fetch('api/image', requestObject);
    const data = await res.json();

    setImgSrc(data.data);

  };

  const handleChange = () => {
    console.log('inside Change');
  };

  const makeGetRequest = async () => {
    const res = await fetch('api/image');

    const data = await res.json();

    setImgSrc(data.data);

    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' name='username' />
        <br />
        <input type='file' onChange={handleChange} name='image' />
        <br />
        <button type='submit'>Submit</button>
      </form>

      <br />

      <button onClick={makeGetRequest}>Get req</button>

      <br />
      <img src={`data:image/png;base64,${imgSrc}`} />
    </>
  );
};

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
        <Route path='/product/add' element={<PrivateRoute component={CreateProduct} />} />
        <Route path='/product/edit' element={<PrivateRoute component={EditProduct} />} />
        <Route path='/cart' element={<PrivateRoute component={CartPage} />} />
        <Route path='/file' element={<FileUpload />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
