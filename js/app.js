import { getClients, deleteClient } from "./API.js";

(function(){

    const listado = document.querySelector('#listado-clientes');    
    document.addEventListener('DOMContentLoaded', showClients);

    listado.addEventListener('click', confirmDelete);

    async function showClients(){
        const clients = await getClients() || [];
        if(clients.length <= 0) return;
        
        clients.forEach(client => {
            const { id, name, email, phone, company } = client;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border px-4 py-2">
                    <p>${name}</p>
                    <p class="text-sm text-gray-600">${email}</p>
                </td>
                <td class="border px-4 py-2">${phone}</td>
                <td class="border px-4 py-2">${company}</td>
                <td class="border px-4 py-2">
                    <a class="flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded" href="editar-cliente.html?id=${id}">
                        Editar
                    </a>
                    <a class="flex justify-center items-center bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-2 py-1 mt-2 rounded delete" href="#" data-id="${id}">
                        Eliminar
                    </a>
                </td>
            `;

            listado.appendChild(row);
        });
    }

    function confirmDelete(e){
        if(e.target.classList.contains('delete')){
            if(confirm('¿Deseas eliminar este cliente?')){
                deleteClient(e.target.dataset.id);
            }
        }
    }

})()