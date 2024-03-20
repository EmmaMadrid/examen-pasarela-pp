import './App.css';
import Create from './components/Create';
import Edit from './components/Edit';
import Crud from './components/Crud';
import Catalog from './components/Catalog';
import PayPalButton from './PayPal/PaypalButton'

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Catalog />} />
        <Route path='/Crud' element={<Crud />} />
        <Route path='/Create' element={<Create />} />
        <Route path='/Edit/:id' element={<Edit />} />
      </Routes>
      <div>
        <PayPalButton totalValue='100' invioce='Dildo de dragon de 10 pulgadas ay que rico' />
      </div>
      </BrowserRouter>


    </div>
  );
}

export default App;