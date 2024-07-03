// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const verMedicosButton = document.getElementById('verMedicos');
    const agregarMedicoButton = document.getElementById('agregarMedico');
    const formularioMedico = document.getElementById('formularioMedico');
    const listaMedicos = document.getElementById('listaMedicos');
    const formMedico = document.getElementById('formMedico');
    const medicosTableBody = document.getElementById('medicosTableBody');
    const especialidadSelect = document.getElementById('especialidad_id');
    const provinciaSelect = document.getElementById('provincia_id');
    const buscarespecialidadSelect = document.getElementById('buscarespecialidad');
    const buscarPorespecialidadButton = document.getElementById('buscarPorespecialidad');
    const buscarProvinciaSelect = document.getElementById('buscarProvincia');
    const buscarPorProvinciaButton = document.getElementById('buscarPorProvincia');
    const medicoIdInput = document.getElementById('medicoId');
    const formularioTitulo = document.getElementById('formularioTitulo');
    const formSubmitButton = document.getElementById('formSubmitButton');

    // Cargar especialidades y provincias al iniciar
    fetch('/especialidades')
        .then(response => response.json())
        .then(data => {
            data.forEach(especialidad => {
                const option = document.createElement('option');
                option.value = especialidad.id;
                option.textContent = especialidad.nombre;
                especialidadSelect.appendChild(option);

                const buscarOption = option.cloneNode(true);
                buscarespecialidadSelect.appendChild(buscarOption);
            });
        });

    fetch('/provincias')
        .then(response => response.json())
        .then(data => {
            data.forEach(provincia => {
                const option = document.createElement('option');
                option.value = provincia.id;
                option.textContent = provincia.nombre;
                provinciaSelect.appendChild(option);

                const buscarOption = option.cloneNode(true);
                buscarProvinciaSelect.appendChild(buscarOption);
            });
        });

    // Cargar la lista de médicos
    const cargarMedicos = () => {
        fetch('/medicos')
        .then(response => response.json())
        .then(data => {
            medicosTableBody.innerHTML = '';
            data.forEach(medico => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${medico.id}</td>
                    <td>${medico.nombre}</td>
                    <td>${medico.apellido}</td>
                    <td>${medico.email}</td>
                    <td>${medico.telefono}</td>
                    <td>${medico.direccion}</td>
                    <td>${medico.ciudad}</td>
                    <td>${medico.dni}</td>
                    <td>${medico.especialidad}</td>
                    <td>${medico.provincia}</td>
                    <td>${medico.fecha_nacimiento}</td>
                    <td>
                        <button class="editar" data-id="${medico.id}">Editar</button>
                        <button class="eliminar" data-id="${medico.id}">Eliminar</button>
                    </td>
                `;
                medicosTableBody.appendChild(row);
            });
        });
                
            
    };

    verMedicosButton.addEventListener('click', () => {
        cargarMedicos();
        listaMedicos.style.display = 'block';
        formularioMedico.style.display = 'none';
    });

    agregarMedicoButton.addEventListener('click', () => {
        formMedico.reset();
        medicoIdInput.value = '';
        formularioTitulo.textContent = 'Agregar Médico';
        formSubmitButton.textContent = 'Agregar';
        formularioMedico.style.display = 'block';
        listaMedicos.style.display = 'none';
    });

    formMedico.addEventListener('submit', (e) => {
        e.preventDefault();
        const medicoId = medicoIdInput.value;
        const formData = new FormData(formMedico);
        const data = {};
        formData.forEach((value, key) => (data[key] = value));

        const method = medicoId ? 'PUT' : 'POST';
        const url = medicoId ? `/medicos/${medicoId}` : '/medicos';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            cargarMedicos();
            formMedico.reset();
            formularioMedico.style.display = 'none';
            listaMedicos.style.display = 'block';
        });
    });

    medicosTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('editar')) {
            const id = e.target.getAttribute('data-id');
            fetch(`/medicos/${id}`)
                .then(response => response.json())
                .then(medico => {
                    medicoIdInput.value = medico.id;
                    document.getElementById('nombre').value = medico.nombre;
                    document.getElementById('apellido').value = medico.apellido;
                    document.getElementById('email').value = medico.email;
                    document.getElementById('telefono').value = medico.telefono;
                    document.getElementById('direccion').value = medico.direccion;
                    document.getElementById('ciudad').value = medico.ciudad;
                    document.getElementById('dni').value = medico.dni;
                    document.getElementById('especialidad_id').value = medico.especialidad_id;
                    document.getElementById('provincia_id').value = medico.provincia_id;
                    document.getElementById('fecha_nacimiento').value = medico.fecha_nacimiento;

                    formularioTitulo.textContent = 'Editar Médico';
                    formSubmitButton.textContent = 'Actualizar';
                    formularioMedico.style.display = 'block';
                    listaMedicos.style.display = 'none';
                });
        } else if (e.target.classList.contains('eliminar')) {
            const id = e.target.getAttribute('data-id');
            if (confirm('¿Estás seguro de eliminar este médico?')) {
                fetch(`/medicos/${id}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(result => {
                    alert(result.message);
                    cargarMedicos();
                });
            }
        }
    });

    buscarPorProvinciaButton.addEventListener('click', () => {
        const provinciaId = buscarProvinciaSelect.value;
        fetch(`/medicos/provincia/${provinciaId}`)
            .then(response => response.json())
            .then(data => {
                medicosTableBody.innerHTML = '';
                data.forEach(medico => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${medico.id}</td>
                        <td>${medico.nombre}</td>
                        <td>${medico.apellido}</td>
                        <td>${medico.email}</td>
                        <td>${medico.telefono}</td>
                        <td>${medico.direccion}</td>
                        <td>${medico.ciudad}</td>
                        <td>${medico.dni}</td>
                        <td>${medico.especialidad}</td>
                        <td>${medico.provincia}</td>
                        <td>${medico.fecha_nacimiento}</td>
                        <td>
                            <button class="editar" data-id="${medico.id}">Editar</button>
                            <button class="eliminar" data-id="${medico.id}">Eliminar</button>
                        </td>
                    `;
                    medicosTableBody.appendChild(row);
                });
            });
    });


    buscarPorespecialidadButton.addEventListener('click', () => {
        const especialidadId = buscarespecialidadSelect.value;
        fetch(`/medicos/provincia/${especialidadId}`)
            .then(response => response.json())
            .then(data => {
                medicosTableBody.innerHTML = '';
                data.forEach(medico => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${medico.id}</td>
                        <td>${medico.nombre}</td>
                        <td>${medico.apellido}</td>
                        <td>${medico.email}</td>
                        <td>${medico.telefono}</td>
                        <td>${medico.direccion}</td>
                        <td>${medico.ciudad}</td>
                        <td>${medico.dni}</td>
                        <td>${medico.especialidad}</td>
                        <td>${medico.provincia}</td>
                        <td>${medico.fecha_nacimiento}</td>
                        <td>
                            <button class="editar" data-id="${medico.id}">Editar</button>
                            <button class="eliminar" data-id="${medico.id}">Eliminar</button>
                        </td>
                    `;
                    medicosTableBody.appendChild(row);
                });
            });
    });
});
