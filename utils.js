async function listarClientes() {
    try {
        const response = await fetch(API_URL);
        const clientes = await response.json();
        
        if (clientes.length === 0) {
            listaDiv.innerHTML = '<p>Nenhum cliente cadastrado.</p>';
            return;
        }
        
        let html = '<ul>';
        clientes.forEach(cliente => {
            html += `
                <li>
                    ${cliente.nome} - ${cliente.email} 
                    <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
                </li>
            `;
        });
        html += '</ul>';
        listaDiv.innerHTML = html;
    } catch (error) {
        console.error('Erro ao carregar:', error);
        listaDiv.innerHTML = '<p>Erro ao carregar clientes</p>';
    }
}

async function cadastrarCliente(event) {
    event.preventDefault();  //evita qu recarregue a página

    const cliente = {
        nome: inputNome.value,
        email: inputEmail.value     
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cliente)
        });
        
        inputNome.value = ''; 
        inputEmail.value = ''; 
        await listarClientes();
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar');
    }
}

async function excluirCliente(id) {
    if (!confirm('Excluir cliente?')) return;
    
    try {
        await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
        await listarClientes(); 
        alert('Cliente excluído!');
    } catch (error) {
        console.error('Erro ao excluir:', error);
        alert('Erro ao excluir');
    }
}