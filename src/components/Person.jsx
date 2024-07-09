import PropTypes from 'prop-types';

export const Person = ({ name, role, img }) => {

    return (
        <div className='col'>
            <div className='card' style={{ width: "18rem" }}>
                <img className='card-img-top' src={img} alt={name} />
                <div className='card-body'>
                    <h4 className='card-title'>{name}</h4>
                    <p className='card-text'>{role}</p>
                </div>
                <div className='container mb-4 text-center'>
                    <button className='btn btn-success me-2'>Editar</button>
                    <button className='btn btn-danger'>Eliminar</button>
                </div>
            </div>
        </div>
    )
}

Person.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
}