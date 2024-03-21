import React, { useState, useEffect } from 'react'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const MySwal = withReactContent(Swal)

const Crud = () => {
  // 1
  const [products, setProducts] = useState([])
  // 2
  const productsCollection = collection(db, "products")
  // 3
  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
  // 4
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id)
    await deleteDoc(productDoc)
    getProducts()
  }

  // 5
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Esta accion no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
        Swal.fire({
          title: "Eliminado!",
          text: "El producto ha sido eliminado.",
          icon: "Correcto!"
        });
      }
    });
  }
  // 6 
  useEffect(() => {
    getProducts()
  }, [])
  // 7
  return (
    <div>
      <br />
      <br />
      <div className='row'>
        <div className='col'>
          <div className='card'>
            <div className='card-body'>
              <div className='d-grid gap-2'>
                <Link to="/create" className='btn btn-secondary mt-2'>Crear producto</Link>
              </div>
              <table className='table table-darktable-hover'>
                <thead>
                  <tr>
                    <th>Imagenes 🖼️ </th>
                    <th>Producto ✨ </th>
                    <th>Descripcion 📝 </th>
                    <th>Stock 🔢 </th>
                    <th>Precio 💵 </th>
                    <th>Acciones ⚙️ </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td><img src={product.img} alt="Product" style={{ width: '100px', height: 'auto' }} /></td>
                      <td>{product.Producto}</td>
                      <td>{product.descripcion}</td>
                      <td>{product.stock}</td>
                      <td>${product.Precio}</td>
                      <td>
                        <Link to={`/edit/${product.id}`} className='btn btn-light'><i className="fa-solid fa-pencil"></i></Link>
                        <button onClick={() => { confirmDelete(product.id) }} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Crud