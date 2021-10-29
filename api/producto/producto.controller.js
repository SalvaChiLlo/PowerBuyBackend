'use strict';

const { Producto, Categoria, Opinion } = require('../../sqldb');
const config = require('../../config/environment');
const jwt = require('jsonwebtoken');
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
  try {
    return input.get();
  } catch (_) {
    if (input.length > 0) {
      return await input.map(item => item.get())
    }
  }
}

async function index(req, res) {
  try {
    const productos = await Producto.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: db.Opinion,
          include: {
            model: db.Cliente
          }
        },
        {
          model: db.CategoriaProducto,
        },
      ]
    })

    res.status(200).json(productos);
  } catch (error) {
    handleCatch(error, res)
  }
}

/**
 * Creates a new product
 */
function create(req, res) {
  throw Error(`
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
|||Falta implementar||||||Falta implementar||||||Falta implementar||||||Falta implementar|||
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
`);
  const newUser = Producto.build(req.body);
  newUser.setDataValue('provider', 'local');
  newUser.setDataValue('role', 'user');
  return newUser.save()
    .then((user) => {
      const token = jwt.sign({ id: user.id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5,
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single product
 */
async function show(req, res, next) {
  let { id } = req.params;
  id = +id
  try {
    const productos = await Producto.findAll({
      where: { id },
      include: [
        {
          model: db.Opinion,
          include: {
            model: db.Cliente
          }
        },
        {
          model: db.CategoriaProducto,
        },
      ]
    })

    res.status(200).json(productos);
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
  return Producto.destroy({ where: { id: req.params.id } })
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

  return Producto.find({
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
