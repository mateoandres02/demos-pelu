import { modalGetTurn, modalTurnContent } from "../components/modalGetTurn";
import { modalUpdateTurn } from "../components/modalUpdateTurn";
import { modalPostTurn } from "../components/modalPostTurn";
import { removeAllModals } from "./modal";

const body = document.body;

const eventInfo = (info, data, clients) => {
  
  /**
   * Permite ver la información del evento almacenado en la base de datos. Hace un get del evento generado.
   * Quita todos los popovers para mostrar de manera correcta la modal.
   * param: info -> información provista por fullcalendar de la celda seleccionada.
   * data -> información del usuario logueado.
   */

  document.querySelectorAll('.fc-popover').forEach(popover => popover.remove());

  body.insertAdjacentHTML('beforeend', modalTurnContent);
  modalGetTurn(info, data, clients);

  document.querySelectorAll('.modal').forEach(modal => removeAllModals(modal));

}


const dateInfo = (info, data, modalElement, clients) => {

  /**
   * Obtiene la info de la celda clickeada para hacer un post.
   * param: info -> información provista por fullcalendar de la celda seleccionada.
   * param: data -> información del usuario logueado
   * param: modalElement -> elemento html de la modal para poder hacer el post.
   */

  body.insertAdjacentHTML('beforeend', modalElement);
  modalPostTurn(info, data, clients);
  document.querySelector('.modal').addEventListener('hidden.bs.modal', function () {
    this.remove();
  });

};


const dateSetStyles = () => {

  /**
   * Setea estilos en la columna del dia actual.
   */

  const fcColDayToday = document.querySelectorAll('.fc-timegrid-col');
  fcColDayToday.forEach(el => {
    if (el.classList.contains('fc-day-today')) {
      el.style.backgroundColor = "#fffcdc";
      el.style.height = "800px";
    }
  });

}


const getInitialDate = (isMobile) => {

  /**
   * Obtiene el lunes o el día actual como fecha inicial.
   * param: isMobile -> contiene la cantidad de pixeles para saber si estamos en un celular o en una computadora.
   */

  const today = new Date();

  if (!isMobile) {
    const day = today.getDay();
    const diff = day === 0 ? - 6 : 1 - day;
    today.setDate(today.getDate() + diff);
  }

  today.setHours(today.getHours() - 3); // Antes estaba en - 6

  return today.toISOString().split('T')[0];

};


function determinateRangeOfDays(currentDate, isMobile) {

  /**
   * Determina el rango de días para mostrar en el calendario.
   * param: currentDate -> fecha actual.
   * param: isMobile -> contiene la cantidad de pixeles para saber si estamos en un celular o en una computadora.
   */

  const start = new Date(currentDate);
  const end = new Date(currentDate);
  start.setDate(start.getDate() - (isMobile ? 0 : start.getDay() - 1));
  end.setDate(start.getDate() + days - 1);

  return { 
    start, 
    end
  };
  
}


// const putChangeHourOfTurn = async (idTurn, dateStart, dateEnd, idBarber) => {
//   const response = await fetch('')

// }

export {
  eventInfo,
  dateInfo,
  dateSetStyles,
  getInitialDate,
  determinateRangeOfDays
}