import isEmail from "validator/lib/isEmail";

export default class Contact {
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }
    init(){
        this.events();
    }
    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) {
        const el = e.target;
        let nameInput = el.querySelector('input[name="name"]');
        // const surnameInput = el.querySelector('input[name="surname"]');
        const telephoneInput = el.querySelector('input[name="telephone"]');
        const emailInput = el.querySelector('input[name="email"]');
        let err = false;

        for (let errorTxt of this.form.querySelectorAll('.error-text')){
            errorTxt.remove();
        }

        if(!nameInput) return err = true;
        // nameInput.value = nameInput.value.replace(/\d+/gi,'');
        if(!isEmail(emailInput.value)){
            this.createMsgError(emailInput, 'E-mail inválido');
            err = true;
        }
        
        const validTelephone = /^(\(?\d{2}\)?\s*)?(9\s*)?(\d{4})-?(\d{4})$/g;

        if(!telephoneInput.value.match(validTelephone)){
            this.createMsgError(telephoneInput, 'Telefone inválido');
            err = true;
        }

        // Enviando formulário caso não haja erros
        if(!err) el.submit();
    }

    createMsgError(field, msg){

        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }
}