const db = require("../models");
const Grocery = db.groceries;
const Op = db.Sequelize.Op;

// Create and Save a new Grocery
exports.create = (req, res) => {
  const { title, description, price, quantity } = req.body;

  const grocery = {
    title: title,
    description: description,
    price: price,
    quantity: quantity,
  };

  Grocery.create(grocery)
    .then((data) => {
      res.json({
        message: "Grocery added Successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Grocery.",
      });
    });
};

// Find a single User with an id
exports.getGrocery = (req, res) => {
  const id = req.params.id;

  Grocery.findByPk(id)
    .then((data) => {
      if (data) {
        res.json({
          message: "Grocery get successfully",
          data: data,
        });
      } else {
        res.status(404).json({
          message: `Cannot find Grocery with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving Grocery with id=" + id,
      });
    });
};

// Update a Grocery by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Grocery.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Grocery was updated successfully.",
        });
      } else {
        res.json({
          message: `Cannot update Grocery with id=${id}. Maybe Grocery was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating Grocery with id=" + id,
      });
    });
};

// Delete a Grocery with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Grocery.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Grocery was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Grocery with id=${id}. Maybe Grocery was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Grocery with id=" + id,
      });
    });
};

// Grocery List
exports.list = (req, res) => {
  Grocery.findAll({ where: { status: true } })
    .then((data) => {
      res.json({
        message: "Grocery fetch successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving Grocery.",
      });
    });
};
