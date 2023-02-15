const mongoose = require('mongoose');
const _validat = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    // email e password são os "name" desses campos input no HTML que colocamos
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.errors = []; // flag de erros
        this.user = null;
    }

    async logar(){
        this.valid();
        if(this.errors.length > 0) return;

        this.user = await LoginModel.findOne({email: this.body.email}); //msm lógica usada na função user exists
        
        if(!this.user){
            this.errors.push('User not exist');
            return;
        } 
        // bcrypt validando se o hash da senha daquele usuário bate cm a do DB
        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('User and password invalid');
            this.user = null;
            return;
        } 
    }
    // Quando trabalhamos cm BD, smp trabalhamos com promises, por isso esse método será assincrono
    async register(){
        this.valid();
        if(this.errors.length > 0) return;

        await this.userExist();

        // Checando novamente após verificar se existe um usuário criado
        if(this.errors.length > 0) return;

        // Fazendo um hash (similar a uma criptografia), mas n é possível descriptografar
        const salt = bcryptjs.genSaltSync();
        // oq é feito aq é gerado um hash e esse hash é verificando cm hashSync pra ver se bate cm o hash criado
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        this.user = await LoginModel.create(this.body); // no loginController já estamos capturando o erro cm try/catch
    }

    async userExist(){
        this.user = await LoginModel.findOne({email: this.body.email});
        if(this.user) this.errors.push('User already exists');
    }

    valid() {
        this.cleanUp();
        // Validações (Email válido e senha entre 8 e 30 caracteres)

        // e-mail
        if(!_validat.isEmail(this.body.email)) this.errors.push('Email is invalid')

        // password
        if(this.body.password.length < 8 || this.body.password.length > 30) this.errors.push('Password should are between 8 and 30 characters');

    }
    // Vai garantir que tudo dentro do meu body seja uma string
    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body = {
            // .email e .password são os "name" desses campos input no HTML que colocamos
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login;