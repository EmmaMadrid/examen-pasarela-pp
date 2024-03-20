import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const MySwal = withReactContent(Swal)

const Edit = () => {
  const [Producto, setProducto] = useState('')
  const [descripcion, setDescription] = useState('')
  const [stock, setStock] = useState(0)
  const [Precio, setPrecio] = useState(0)
  const [img, setImg] = useState(null)

  const navigate = useNavigate()
  const { id } = useParams()

  const update = async (e) => {
    e.preventDefault()
    if (Producto && descripcion && stock && Precio && img) {
      const product = doc(db, "products", id)
      const data = { Producto, descripcion, stock, Precio, img }
      await updateDoc(product, data)
      navigate('/')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No se puede actualizar el producto',
        text: 'Por favor, complete todos los campos antes de actualizar el producto.',
      })
    }
  }

  const confirmUpdate = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "El producto ha sido actualizado!",
      showConfirmButton: false,
      timer: 1500
    });
  }

  const getProductsById = async () => {
    const product = await getDoc(doc(db, "products", id))
    if (product.exists()) {
      setProducto(product.data().Producto)
      setDescription(product.data().descripcion)
      setStock(product.data().stock)
      setPrecio(product.data().Precio)
      setImg(product.data().img)
    } else {
      console.log('Ese producto no existe')
    }
  }

  useEffect(() => {
    getProductsById(id)
  }, [])


  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Editar un producto</h1>
              <br />
              <form onSubmit={update}>
                <div className='mb-3'>
                  <label className='form-label fw-bold'>Producto ✨ </label>
                  <input
                    value={Producto}
                    onChange={(e) => setProducto(e.target.value)}
                    type='text'
                    className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label fw-bold'>Descripcion 📝 </label>
                  <input
                    value={descripcion}
                    onChange={(e) => setDescription(e.target.value)}
                    type='text'
                    className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label fw-bold'>Stock 🔢 </label>
                  <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    type='number'
                    className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label fw-bold'>Precio 💵 </label>
                  <input
                    value={Precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    type='number'
                    className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label fw-bold'>URL de la imagen 🖼️ </label>
                  <input
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    type='text'
                    className='form-control'
                  />
                </div>

                <button onClick={() => { confirmUpdate() }} type='submit' className='btn btn-primary'>Actualizar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
