import { showAlert, validateFields } from "./functions.js";
import { getClient, editClient } from "./API.js";

(function(){

    const InputName = document.querySelector('#name');
    const InputEmail = document.querySelector('#email');
    const InputPhone = document.querySelector('#phone');
    const InputCompany = document.querySelector('#company');
    const InputId = document.querySelector('#id');
    
    document.addEventListener('DOMContentLoaded', async () => {
        const params = new URLSearchParams(window.location.search);
        const ClinetId = params.get('id');

        if (!ClinetId) window.location = 'index.html';

        const client = await getClient(ClinetId);
        if (!client) window.location = 'index.html';

        showCliente(client);

        const formulario = document.querySelector('#formulario');
        formulario.addEventListener('submit', validateClient);
    });

    function showCliente (client) {
        const { id, name, email, phone, company } = client;
        InputId.value = id;
        InputName.value = name;
        InputEmail.value = email;
        InputPhone.value = phone;
        InputCompany.value = company;
    }

    function validateClient(e){
        e.preventDefault();

        const cliente = {
            id: InputId.value,
            name: InputName.value,
            email: InputEmail.value,
            phone: InputPhone.value,
            company: InputCompany.value
        }

        if (!validateFields(cliente)){
            showAlert('Todos los campos son obligatorios');
            return;
        } 

        // Editar cliente
        editClient(cliente);
    }

})()