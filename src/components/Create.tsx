import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Create = () => {
  const [Producto, setProducto] = useState('')
  const [descripcion, setDescription] = useState('')
  const [stock, setStock] = useState('')
  const [Precio, setPrecio] = useState('')
  const [img, setImg] = useState('')
  const navigate = useNavigate()

  const productsCollection = collection(db, 'products')

  const store = async (e) => {
    e.preventDefault()

    if (Producto && descripcion && stock && Precio && img) {
      await addDoc(productsCollection, { Producto, descripcion, stock, Precio, img })
      navigate('/')
    } else {
      Swal.fire({
        icon: 'error',
        title: '¡No puedes crear el producto!',
        text: '¡Todos los campos son obligatorios!',
      })
    }
  }

  const confirmgGuardar = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'El producto ha sido guardado!',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='card'>
            <div className='card-body'>
              <h1 className='card-title'>Crear un producto nuevo </h1>

              <form onSubmit={store}>
                <div className='mb-3'>
                  <label className='form-label fw-bold'>Producto ✨ </label>
                  <input value={Producto} onChange={(e) => setProducto(e.target.value)}
                   type='text' 
                   className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label  fw-bold'>Descripcion 📝 </label>
                  <input
                    value={descripcion}
                    onChange={(e) => setDescription(e.target.value)}
                    type='text'
                    className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label fw-bold'>Stock 🔢 </label>
                  <input value={stock} onChange={(e) => setStock(e.target.value)} type='number' className='form-control' />
                </div>

                <div className='mb-3'>
                  <label className='form-label fw-bold'>Precio 💵 </label>
                  <input value={Precio} onChange={(e) => setPrecio(e.target.value)} type='number' className='form-control' />
                </div>

                <div className='mb-3'>
                  <label className='form-label fw-bold'>URL de la Imagen 🖼️ </label>
                  <input value={img} onChange={(e) => setImg(e.target.value)} type='text' className='form-control' />
                </div>

                <button onClick={() => { confirmgGuardar() }} type='submit' className='btn btn-primary'>Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create

