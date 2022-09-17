'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')
const openModal2 = () => document.getElementById('modal2').classList.add('active')

const closeModal2 = () => {
    document.getElementById('modal2').classList.remove('active')
}

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem(bd_producto)) ?? []
const setLocalStorage = (bd_producto) => localStorage.setItem("bd_producto", JSON.stringify(bd_producto))

const borrarProducto = (index) => {
    const bdProducto = readProduct()
    bdProducto.splice(index, 1)
    setLocalStorage(bdProducto)
}

const guardarProducto = (index, producto) => {
    const bdProducto = readProduct()
    bdProducto[index] = producto
    setLocalStorage(bdProducto)
}