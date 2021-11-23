'use strict';

const { Cliente, Categoria, Opinion } = require('../../sqldb');
const config = require('../../config/environment');
const jwt = require('jsonwebtoken');
const { response } = require('../..');
const db = require('../../sqldb')

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return (err) => {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return (err) => {
    return res.status(statusCode).send(err);
  };
}

function handleCatch(error, res) {
  console.log('--------------------------------------------------------------------------')
  console.error(error)
  res.status(500).end();
}

async function getData(input) {
  return await input.map(item => item.get())
}

async function index(req, res) {
  try {
    const clientes = await Cliente.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: db.Opinion,
          include: [
            { model: db.Producto }
          ]
        },
        {
          model: db.CategoriaProducto
        }
      ]
    })

    res.status(200).json(clientes);
  } catch (error) {
    handleCatch(error, res)
  }
}

/**
 * Creates a new product
 */
async function create(req, res) {

  try {
    const body = req.body
    const newCliente = Cliente.build(body);

    const savedClient = await newCliente.save()
    console.log(savedClient)
    res.status(200).json(savedClient);
  } catch (error) {
    handleCatch(error, res)
  }
}

/**
 * Get a single product
 */
async function show(req, res, next) {
  let { id } = req.params;

  try {
    console.log(req.query)
    if (req.query.email) {
      const cliente = await Cliente.findAll({
        where: { email: id },
        include: [
          {
            model: db.Opinion,
            include: [
              { model: db.Producto }
            ]
          },
          {
            model: db.CategoriaProducto
          }
        ]
      })

      res.status(200).json(cliente);
    } else {
      const cliente = await Cliente.findAll({
        where: { id },
        include: [
          {
            model: db.Opinion,
            include: [
              { model: db.Producto }
            ]
          },
          {
            model: db.CategoriaProducto
          }
        ]
      })

      res.status(200).json(cliente);
    }

  } catch (error) {
    handleCatch(error, res)
  }
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
function destroy(req, res) {
  throw Error(`
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
|||Falta implementar||||||Falta implementar||||||Falta implementar||||||Falta implementar|||
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
  `);
  return Cliente.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
function update(req, res) {
  const body = req.body

  return Cliente.findAll({
    where: {
      id: body.id,
    },
  })
    .then(user => {
      user[0].username = body.username;
      user[0].email = body.email;
      user[0].imageURL = body.imageURL;
      user[0].favoritos = body.favoritos;
      return user[0].save()
        .then(() => {
          res.status(204).end();
        })
        .catch(validationError(res));
    })
    .catch(console.log)
}

module.exports = {
  index,
  show,
  create,
  destroy,
  update,
};
