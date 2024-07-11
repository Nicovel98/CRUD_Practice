import PropTypes from 'prop-types';
import { Person } from './Person';
import { useState } from 'react';

export const People = ({ persons, setPersons }) => {

    //Funciones para manejar el estado de edición
    const [editingId, setEditingId] = useState(null);
    const [editedPerson, setEditedPerson] = useState(
        {
            /* id: null, */
            name: '',
            role: '',
            img: ''
        }
    );

    // Con esto sabemos si se esta editando o no una persona
    const [isEditing, setIsEditing] = useState(false);

    // Captura la informacion del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPerson(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Método para crear nuevo empleado
    const handleCreate = (e) => {
        //Previene que se actualice el navegador
        e.preventDefault();
        // Agregamos la nueva persona a la lista de personas
        setPersons([...persons, { id: persons.length + 1, ...editedPerson }]);
        // Reseteamos el formulario
        setEditedPerson({
            /* id: null, */
            name: '',
            role: '',
            img: ''
        });
        // Cambiamos el estado de edición a false
        setIsEditing(false);
        // Reseteamos la variable de estado de edición a null
        setEditingId(null);
    };

    //Estado para guardar la persona a eliminar
    const [personToDelete, setPersonToDelete] = useState(null);
    // Método para eliminar una persona
    /* const handleDelete = (id) => {

        // Filtramos la lista de personas para quedarnos con las que no coincidan con el id a eliminar
    }; */

    //Método para editar los datos de la persona
    const handleEdit = (id) => {
        //Establecemos el Id de la persona
        setEditingId(id);
        //Cambiamos el estado de edición a true
        setIsEditing(true);
        //Buscamos la persona a editar
        const personToEdit = persons.find(person => person.id === id);
        // Copiamos los datos de la persona a la variable editedPerson
        setEditedPerson({ ...personToEdit });
    };

    //Método para actualizar los datos de la persona
    const handleUpdate = (e) => {
        //Previene que se actualice el navegador
        e.preventDefault();
        // Buscamos la persona a editar
        const updatedPersons = persons.map(person => person.id === editingId ? editedPerson : person);
        // Cambiamos los datos de la persona
        setPersons(updatedPersons);
        // Cambiamos el estado de edición a false
        setIsEditing(false);
        // Reseteamos la variable de estado de edición a null
        setEditingId(null);
        // Reseteamos el formulario
        setEditedPerson({
            /* id: null, */
            name: '',
            role: '',
            img: ''
        });
    };

    // Método para eliminar una persona
    const handleDelete = (id) => {
        setPersonToDelete(id);
    };

    const confirmDelete = () => {
        setPersons(persons.filter(person => person.id !== personToDelete));
        setPersonToDelete(null);
    };

    const cancelDelete = () => {
        setPersonToDelete(null);
    }


    return (
        <div>
            <h2 className='text-center my-4'>IT Team</h2>
            <div className='container'>
                <div className='row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3'>
                    {persons.map((person) => {
                        return (
                            <div key={person.id}>
                                <Person
                                    id={person.id}
                                    name={person.name}
                                    img={person.img}
                                    role={person.role}
                                    handleEdit={() => handleEdit(person.id)}
                                    handleDelete={handleDelete}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Renderiza el formulario para crear o editar los datos de una persona */}
            <div className='container mt-4 row p-2'>
                <h2 className='text-center my-4'>
                    {isEditing ? 'Actualizar Empleado' : 'Crear Nuevo Empleado'}
                </h2>
                <form className='border border-black rounded'>
                    <div className="mb-3">
                        <label className="form-label">Nombres</label>
                        <input type="text" name='name' value={editedPerson.name} onChange={handleChange} className="form-control" aria-describedby="nombre" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Cargo</label>
                        <input type="text" name='role' value={editedPerson.role} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Avatar</label>
                        <input type="text" name='img' value={editedPerson.img} onChange={handleChange} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={isEditing ? handleUpdate : handleCreate}>{isEditing ? 'Modificar' : 'Crear'}</button>
                </form>
            </div>
            {/* Modal de confirmación de eliminación */}
            <div id="deleteModal" className='modal fade' tabIndex="-1">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4 className='modal-title'>Confirmar Eliminación</h4>
                            <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close" onClick={cancelDelete}></button>
                        </div>
                        <div className='modal-body'>
                            <p>¿Estás seguro de eliminar a {persons.find(person => person.id === personToDelete)?.name}</p>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className='btn btn-secondary' data-bs-dismiss="modal" onClick={cancelDelete}>Cancelar</button>
                            <button type="button" className='btn btn-danger' data-bs-dismiss="modal" onClick={confirmDelete}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

People.propTypes = {
    persons: PropTypes.array,
    setPersons: PropTypes.func
}
