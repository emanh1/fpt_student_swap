import db from "../models/index.js";

const Op = db.Sequelize.Op;
const Swap = db.swap;

export const create = (req, res) => {
	if (!req.body.subjectCode || !req.body.fromRollNumber || !req.body.fromClass || !req.body.currentSlot || !req.body.toRollNumber || !req.body.toClass || !req.body.desiredSlot) {
			res.status(400).send({
					message: "Content can not be empty",
			});
			return;
	}

	const swap = {
    subjectCode: req.body.subjectCode,
    fromRollNumber: req.body.fromRollNumber,
    fromClass: req.body.fromClass,
    currentSlot: req.body.currentSlot,
    desiredSlot: req.body.desiredSlot,
    status: req.body.status || "Pending",
	};

  Swap.create(swap)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the swap request.",
      });
    });
};

export const findAll = (req, res) => {
  const subjectCode = req.query.subjectCode;
  const condition = subjectCode ? { subjectCode: { [Op.like]: `%${subjectCode}%` } } : null;
  Swap.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving swaps.",
      });
    });
}
export const findOne = (req, res) => {
  const id = req.params.id;

  Swap.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Swap with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Swap with id=" + id,
      });
    });
};

export const update = (req, res) => {
  const id = req.params.id;

  Swap.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Swap was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Swap with id=${id}. Maybe Swap was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Swap with id=" + id,
      });
    });
};

export const deleteSwap = (req, res) => {
  const id = req.params.id;

  Swap.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Swap was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Swap with id=${id}. Maybe Swap was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Swap with id=" + id,
      });
    });
};

export const deleteAll = (req, res) => {
  Swap.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Swaps were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all swaps.",
      });
    });
};