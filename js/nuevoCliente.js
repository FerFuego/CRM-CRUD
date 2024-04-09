import { showAlert, validateFields } from "./functions.js";
import { newClient } from "./API.js";

(function(){
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validateClient);

    function validateClient(e){
        e.preventDefault();

        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const phone = document.querySelector('#phone').value;
        const company = document.querySelector('#company').value;

        const cliente = {
            name,
            email,
            phone,
            company
        }

        if (!validateFields(cliente)){
            showAlert('Todos los campos son obligatorios');
            return;
        } 
            
        newClient(cliente);
    }

})();