"use strict";
let form = document.querySelector(".feedback");
form.addEventListener("submit",event =>
{
    event.preventDefault();
    document.querySelectorAll(".element_error").forEach(p => p.classList.remove("element_error"));
    let errorBlock = document.querySelector(".feedback__error");
    errorBlock.classList.remove("visible");
    let errors;
    if((errors = Check.checkErrors()).length > 0)
    {
        errorBlock.innerHTML = errors.map(p => p.error).join("<BR>");
        errorBlock.classList.add("visible");
        errors.map(p => p.element).forEach(p => p.classList.add("element_error"));
    }
});

class Check {
    static _checks = [
        {id:"#edit_name", rule: /^[a-zа-яё]+$/i, error: "В имени должны быть только буквы"},
        {id:"#edit_phone", rule: /^\+7\(\d{3}\)\d{3}-\d{4}$/, error: "Телефон должен быть иметь вид +7(000)000-0000"},
        {id:"#edit_email", rule: /^\w+[.-]?\w+@mail\.ru$/, error: "Email должен иметь вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru"}
    ];
    static checkErrors() {
        let errors = [];
        for (let check of this._checks) {
            let element = document.querySelector(check.id);
            if (check.rule.test(element.value))
                continue;
            errors.push({element, error: check.error});
        }
        return errors;
    }
}

