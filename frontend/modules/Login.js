// Validando front-end
import validator from "validator";

export default class Login{
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }
    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        // console.log('oi');
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validate(e);
        })
    }
    validate(e){
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;
        // console.log(emailInput.value, passwordInput.value);
        if(!validator.isEmail(emailInput.value)){
            alert('Email invalid');
            error = true;
        }

        // password
        if(passwordInput.value.length < 8 || passwordInput.value.length > 30){
            alert('Password should are between 8 and 30 characters');
            error = true
        };
        if(!error) el.submit(); // Se não tiver nenhum erro, enviar o form(submit);
    }
}