import PropTypes from "prop-types";
import React, { Fragment, useState } from 'react';
import uuid from 'uuid/dist/v4';

const Formulario = ({crearCita}) => {

    /**State para crear una cita */
    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });
    /**State para manejar los errores */
    const [error, actualizarError] = useState(false);
    /**Funcion para actualizar la cita por medio del
     * evento de cada input */
    const handleState = e =>{
        actualizarCita({...cita,[e.target.name]: e.target.value})
    };
    /**Object destructiring de la cita para uso de las variables */
    const {mascota,propietario,fecha,hora,sintomas} = cita;
    /**Funcion para crear la cita por medio del formulario */
    const submitCita = e =>{
        //Para evitar que el objeto no este en el query del navegador
        e.preventDefault();
        //Validacion del formulario
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' ||
            hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }
        //Cambia el estado del error
        actualizarError(false);
        //Asignar unico ID
        cita.id = uuid();
        //crear cita
        crearCita(cita);
        //Reiniciar Formulario
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }
    return (
        <Fragment>
            <h1>Crear cita</h1>
            <form onSubmit={submitCita}>
                {error ?
                <p className="alerta-error">Todos los campos son obligatorios</p>
                :null}
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de la mascota."
                    onChange={handleState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la mascota."
                    onChange={handleState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea 
                    name="sintomas"
                    className="u-full-width"
                    placeholder="Descripcion de los sintomas de la mascota"
                    onChange={handleState}
                    value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar</button>
            </form>
        </Fragment>
    );
}

Formulario.propTypes = {
  crearCita: PropTypes.func
}
 
export default Formulario;