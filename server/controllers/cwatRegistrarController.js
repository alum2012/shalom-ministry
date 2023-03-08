const _ = require('lodash');
const { CwatRegistrar } = require('../models/cwatRegistrarModel');

module.exports = {
  get: {
    viewAllCwatRegistrars: async (req, res) => {
      const cwatRegistrars = await CwatRegistrar.find({});
      res.status(200).send(cwatRegistrars);
    },
    findCwatRegistrarById: async (req, res) => {
      const cwatRegistrarById = await CwatRegistrar.findById(req.params.id);

      res.status(200).send(cwatRegistrarById);
    },
    findCwatRegistrarByEmail: async (req, res, next) => {
      const cwatRegistrarByName = await CwatRegistrar.find({ email: req.body.email });

      if (cwatRegistrarByName) {
        next({ alreadyRegistered: true });
        return res.status(200).send(cwatRegistrarByName);
      } else {
        next({ alreadyRegistered: false });
        return res.status(404).send('cwat registrar not found');
      }
    },
  },

  post: {
    createNewCwatRegistrar: async (req, res) => {
      const { email } = req.body;
      const registrar = req.body;

      let cwatRegistrar = await CwatRegistrar.findOne({ email });
      if (cwatRegistrar)
        return res.status(400).send(`Registrar with email ${email} already registered.`);

      cwatRegistrar = new CwatRegistrar({ ...registrar });

      await cwatRegistrar.save();
      res
        .status(200)
        .send(_.pick(cwatRegistrar, ['_id', 'firstname', 'lastname', 'email', 'ticket']));
    },
  },

  /*  put: {
    editInvoiceById: async (req, res) => {
      const { value } = validate(req.body);
      const updatedInvoice = {};

      const invoiceToEdit = await Invoice.findByIdAndUpdate(req.params.id, updatedInvoice, {
        new: true,
      });

      res.status(200).send(invoiceToEdit);
    },
  },

  delete: {
    deleteInvoiceById: async (req, res) => {
      const invoiceToDelete = await Invoice.findByIdAndDelete(req.params.id);

      res.status(200).send(invoiceToDelete);
    },
  }, */
};
