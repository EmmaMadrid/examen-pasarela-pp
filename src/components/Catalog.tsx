import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const MySwal = withReactContent(Swal)

const Catalog = () => {
    const [products, setProducts] = useState([])
    const productsCollection = collection(db, "products")

    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(() => {
        getProducts()
    }, [])

    const addToCart = (id) => {
        const product = products.find((product) => product.id === id)
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        cart.push(product)
        localStorage.setItem('cart', JSON.stringify(cart))
        MySwal.fire({
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            timer: 1500
        })
    }

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
                            <br />
                            <br />
                            <li className="nav-item">
                                <Link className="nav-link" to="/Carrito">Carrito <i class="fa-solid fa-cart-shopping"></i></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Crud">Crud</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <br />
            
            <h3>Catalogo</h3>
            <div className='row'>
                {products.map((product) => (
                    <div className='col-md-4' key={product.id}>
                        <div className='card mt-4'>
                            <img src={product.img} className='card-img-top' alt='...' />
                            <div className='card-body'>
                                <h5 className='card-title'>{product.Producto}</h5>
                                <p className='card-text'>{product.descripcion}</p>
                                <p className='card-text'>Precio: ${product.Precio}</p>
                                <button className='btn btn-primary' onClick={() => addToCart(product.id)}>Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Catalog

