import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {
  /**Carga de las citas que se encuentren en el local storage */
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  /**Validar si la carga de citas es vacia, de tal manera lo
   * guardamos como un array vacio
   */
  if(!citasIniciales){
    citasIniciales=[];
  }
  /**State para agregar las citas y guardarlas */
  const [citas, guardarCitas] = useState(citasIniciales);
  /**Use effect con las dependencias de citas y citasIniciales
   * para que cuando estos states cambien el use efect se ejecute
   */
  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas',JSON.stringify([]));
    }
  },[citas, citasIniciales]);
  /**Funcion para crear una cita */
  const crearCita = cita =>{
    guardarCitas([...citas,cita]);
  }
  /**Funcion para eliminar una cita */
  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  };
  /**Condicional ternario para tener el titulo segun la
   * disponibilidad de las citas */
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'; 
  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h1>{titulo}</h1>
            {citas.map(cita=>(
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
