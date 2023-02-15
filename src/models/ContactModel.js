const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: false, default: ''},
    telephone: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    createdIn: {type: Date, default: Date.now}
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
  this.body = body;
  this.errors = [];
  this.contact = null;
}

Contact.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
  // AQUI Ó, estamos pegando a variável contact (equivalente a um "user") e fazendo ela receber o valor do obj criado com TODOS os dados do nosso contato
  this.contact = await ContactModel.create(this.body);
};

Contact.prototype.valida = function() {
    this.cleanUp();

    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail is invalid');

    if(!this.body.name) this.errors.push('Name this a field required');
    if(!this.body.email && !this.body.telephone){
        this.errors.push('At least the telephone or email needs to be filled in');
    } 
};

Contact.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    name: this.body.name,
    surname: this.body.surname,
    telephone: this.body.telephone,
    email: this.body.email,
  };
};
// Editando o contato sem sobreescrever (criar um novo cm o msm id)
Contact.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;

  // se passar pelas verificações posso pegar o contato pelo id e atualizar ele cm o novo conteúdo do body
  this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true }); // o new: true é pra retornar os dados att
}

// Métodos estáticos (eles não tem acesso ao "this" do obj)
// Equivalente a uma função estática, por isso n está atrelado ao prototype
Contact.searchContacts = async function(){
  // const contact = await ContactModel.find({email: ...}); poderiamos filtrar usando parametros nesse obj
  const contact = await ContactModel.find()
    .sort({createdIn: -1}); // Filtrando por ordem decrescente (do mais atual), "1" para começar do mais antigo
  return contact;
}
Contact.searchID = async function(id){
  if(typeof id !== 'string') return;
  const contact = await ContactModel.findById(id);
  return contact;
}
Contact.delete = async function(id){
  if(typeof id !== 'string') return;
  const contact = await ContactModel.findOneAndDelete({_id: id});
  return contact;
}

module.exports = Contact;