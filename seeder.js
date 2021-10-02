'use strict';

const { User } = require('./sqldb');
const { Cliente } = require('./sqldb');
const { CategoriaProducto } = require('./sqldb');
const { Opinion } = require('./sqldb');
const { Producto } = require('./sqldb');
const products = require('./DATA.json');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const CLIENTE_CANTIDAD = 20;
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 2
  },
  wordsPerSentence: {
    max: 14,
    min: 4
  }
});

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
    .then(() => {
      console.log('finished populating productos')
      Opinion.destroy({ where: {} })
        .then(() => Opinion.bulkCreate(
          generateOpinions()
        )
          .then(() => console.log('finished populating opiniones'))
          .catch(err => console.log('error populating opiniones', err)));
    })
    .catch(err => console.log('error populating productos', err)));




function generateClientes() {
  const userList = [
    {
      id: 1,
      username: 'Admin',
      password: 'admin',
      email: 'admin@admin.com',
    }
  ]

  for (let i = 0; i < CLIENTE_CANTIDAD + 1; i++) {
    userList.push(
      {
        id: i + 2,
        username: `User${i}`,
        password: '12345678',
        email: `user${i}@user${i}.com`,
      }
    )
  }
  return userList;
}

function generateProductos() {
  const productList = products.map((product, index) => {
    return {
      id: index + 1,
      nombre: product.title.trim(),
      descripcion: JSON.stringify(product.description)?.replace('Amazon', 'PowerBuy').replace('amazon', 'PowerBuy'),
      cantidadDisponible: Math.floor(Math.random() * (200 - 100)) + 100,
      caracteristicas: JSON.stringify(product.feature)?.replace('Amazon', 'PowerBuy').replace('amazon', 'PowerBuy'),
      imagenes: JSON.stringify(product.image)
    }
  })
  return productList;
}

function generateOpinions() {
  return Array(200).fill(1).map((_, index) => {
    const valoraciones = ['Muy Bueno', 'Bueno', 'Malo', 'Muy Malo']
    const cli = Math.ceil(Math.random() * CLIENTE_CANTIDAD);
    const prod = Math.ceil(Math.random() * 70);
    console.log(cli, prod)
    return {
      id: index + 1,
      valoracion: valoraciones[Math.floor(Math.random() * valoraciones.length)],
      opinion: lorem.generateParagraphs(Math.ceil(Math.random() * 5)),
      ClienteId: cli,
      ProductoId: prod
    }
  })
}