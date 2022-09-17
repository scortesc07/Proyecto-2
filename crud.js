'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')
const openModal2 = () => document.getElementById('modal2').classList.add('active')

const closeModal2 = () => {
    document.getElementById('modal2').classList.remove('active')
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('bd_producto')) ?? []
const setLocalStorage = (bdProducto) => localStorage.setItem("bd_producto", JSON.stringify(bdProducto))

/* Creando botones CRUD */

const deleteProduct = (index) => {
    const bdProducto = readProduct()
    bdProducto.splice(index, 1)
    setLocalStorage(bdProducto)
}

const updateProduct = (index, product) => {
    const bdProducto = readProduct()
    bdProducto[index] = product
    setLocalStorage(bdProducto)
}

const readProduct = () => getLocalStorage()

const createProduct = (product) => {
    const bdProducto = getLocalStorage()
    bdProducto.push (product)
    setLocalStorage(bdProducto)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

/* Interacción con el layout */

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('producto').dataset.index = 'new'
}

const saveProduct = () => {
    debugger
    if (isValidFields()) {
        const product = {
            producto: document.getElementById('producto').value,
            cantidad: document.getElementById('cantidad').value,
            precio: document.getElementById('precio').value,
            instalacion: document.getElementById('instalacion').value
        }
        const index = document.getElementById('producto').dataset.index
        if (index == 'new') {
            createProduct(product)
            updateTable()
            closeModal()
        } else {
            updateProduct(index, product)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (product, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${product.producto}</td>
        <td>${product.cantidad}</td>
        <td>${product.precio}</td>
        <td>${product.instalacion}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Eliminar</button>
        </td>
    `
    document.querySelector('#tableProduct>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableProduct>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const bdProducto = readProduct()
    clearTable()
    bdProducto.forEach(createRow)
}

const fillFields = (product) => {
    document.getElementById('producto').value = product.producto
    document.getElementById('cantidad').value = product.cantidad
    document.getElementById('precio').value = product.precio
    document.getElementById('instalacion').value = product.instalacion
    document.getElementById('producto').dataset.index = product.index
}

const editProduct = (index) => {
    const product = readProduct()[index]
    product.index = index
    fillFields(product)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editProduct(index)
        } else {
            const product = readProduct()[index]
            let avisoDelete = document.querySelector('#avisoDelete')

            avisoDelete.textContent = `¿Estás seguro de eliminar el producto ${product.producto}?`
            openModal2()

            document.getElementById('eliminar').addEventListener('click', () => {
                deleteProduct(index)
                updateTable()
                closeModal2()
            })
        }
    }
}

updateTable()


/* Creando los eventos */

document.getElementById('ingresarProducto').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('modalClose2').addEventListener('click', closeModal2)

document.getElementById('guardar').addEventListener('click', saveProduct)

document.querySelector('#tableProduct>tbody').addEventListener('click', editDelete)

document.getElementById('cancelar').addEventListener('click', closeModal)

document.getElementById('cancelar2').addEventListener('click', closeModal2)
