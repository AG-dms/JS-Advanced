class Validator {
    constructor(form) {
        this.patterns = {
            name: /^[a-zа-я]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[a-z0-9._-]{1,16}@[a-z0-9-_]+\.[a-zа-я]{2,10}$/iu
        }
        this.errors = {
            name: 'Имя должно содержать только буквы',
            phone: 'Телефон должен быть в формате +7(000)000-0000',
            email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };
        this.form = form;
        this.valid = false;
        this.validate();
        this.checkForm();
    }
    validate() {
        let inputs = [...document.querySelectorAll('input')];
        inputs.forEach(item => {
            this.checkValid(item);
        });
    }
    checkValid(el) {
        if (this.patterns[el.name]) {
            let error = el.parentNode.querySelector('span');
            if (error) {
                error.remove();
            }
            if (this.patterns[el.name].test(el.value)) {
                this.passesValid(el);
            } else {
                this.notPassesValid(el);
            }
        }

    }
    passesValid(el) {
        el.classList.add('ok');
        el.classList.remove('error');
    }
    notPassesValid(el) {
        el.classList.add('error');
        let errorMsg = document.createElement('span');
        errorMsg.textContent = this.errors[el.name];
        el.insertAdjacentElement('afterend', errorMsg);

    }

    checkForm() {
        if (document.querySelector('form').querySelectorAll('span').length == 0) {
            this.form.classList.remove('noPassed');
        }
    }
}