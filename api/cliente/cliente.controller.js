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
    const newCliente = Cliente.build(req.body);
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
function changePassword(req, res) {
  throw Error(`
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
|||Falta implementar||||||Falta implementar||||||Falta implementar||||||Falta implementar|||
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
  `);
  const userId = req.user._id;
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  return Cliente.find({
    where: {
      id: userId,
    },
  })
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

module.exports = {
  index,
  show,
  create,
  destroy,
  changePassword,
};
