'use strict';

const { User } = require('./sqldb');
const { Cliente } = require('./sqldb');
const { Pago } = require('./sqldb');
const { Caracteristica } = require('./sqldb');
const { CategoriaProducto } = require('./sqldb');
const { Imagen } = require('./sqldb');
const { LoteProducto } = require('./sqldb');
const { Opinion } = require('./sqldb');
const { Producto } = require('./sqldb');
Cliente.destroy({ where: {} })
  .then(() => Cliente.bulkCreate(
    generateClientes()
  )
    .then(() => console.log('finished populating clients'))
    .catch(err => console.log('error populating clients', err)));

Producto.destroy({ where: {} })
  .then(() => Producto.bulkCreate(
    generateProductos()
  )
    .then(() => console.log('finished populating productos'))
    .catch(err => console.log('error populating productos', err)));


function generateClientes() {
  const userList = [
    {
      username: 'Admin',
      password: 'admin',
      email: 'admin@admin.com',
    }
  ]

  for (let i = 0; i < 5; i++) {
    userList.push(
      {
        username: `User${i}`,
        password: '12345678',
        email: `user${i}@user${i}.com`,
      }
    )
  }
  return userList;
}

function generateProductos() {
  const productList = []

  for (let i = 0; i < 50; i++) {
    productList.push(
      {
        nombre: `Producto${i}`,
        descripcion: `Descripcion${i}`
      }
    )
  }

  return productList;
}