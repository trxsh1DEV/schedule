const Contact = require('../models/ContactModel');

exports.index = async (req,res) => {
    const contacts = await Contact.searchContacts();
    res.render('index', {contacts}); // Como o nome da chave (q eu qro) e do valor são os msm, só precisa inserir "contacts"
};