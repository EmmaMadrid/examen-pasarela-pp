import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import PayPalButton from '../PayPal/PaypalButton'; 

const MySwal = withReactContent(Swal);

const Carrito = () => {
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); 
    const productsCollection = collection(db, "products");

    const getProducts = async () => {
        const data = await getDocs(productsCollection);
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = cart.reduce((accumulator, product) => accumulator + parseFloat(product.Precio), 0);
        setTotalPrice(total);
    }, [products]); 

    const deleteProduct = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const newCart = cart.filter((product) => product.id !== id);
        localStorage.setItem('cart', JSON.stringify(newCart));
        MySwal.fire({
          icon: 'success',
          title: 'Producto eliminado del carrito',
          showConfirmButton: false,
          timer: 1500
      });
        window.location.reload();
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Panaderia Pan comido</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Carrito">Carrito</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Crud">Crud</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div>
                <h1><span className="badge text-bg-warning">Carrito de compras</span></h1>
                <div className='row'>
                    <div className='col'>
                        <div className='card'>
                            <div className='card-body'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Producto</th>
                                            <th>Descripcion</th>
                                            <th>Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((product) => (
                                            <tr key={product.id}>
                                                <td><img src={product.img} alt="Product" style={{ width: '100px', height: 'auto' }} /></td>
                                                <td>{product.Producto}</td>
                                                <td>{product.descripcion}</td>
                                                <td>${product.Precio}</td>
                                                <td>
                                                    <button onClick={() => { deleteProduct(product.id) }} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p>Total: ${totalPrice.toFixed(2)}</p>
                                <PayPalButton total={totalPrice.toFixed(2)} products={cart} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carrito;
