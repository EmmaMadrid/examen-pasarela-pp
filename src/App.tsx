import './App.css';
import Create from './components/Create';
import Edit from './components/Edit';
import Crud from './components/Crud';
import Catalog from './components/Catalog';
import Carrito from './components/Carrito';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Catalog />} />
        <Route path='/Carrito' element={<Carrito />} />
        <Route path='/Crud' element={<Crud />} />
        <Route path='/Create' element={<Create />} />
        <Route path='/Edit/:id' element={<Edit />} />
      </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;