import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showConfirm(message: string, title: string = 'Confirmar', onConfirm: () => void, onCancel?: () => void) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
        onCancel();
      }
    });
  }

  showSucces(message: string) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  showError(message: string, title: string = 'Error', canConfirm: boolean = false) {
    const options: any = {
      title: title,
      text: message,
      icon: 'error',
      showConfirmButton: canConfirm,
      confirmButtonText: 'Ok',
    };

      // Si canConfirm es falso, entonces establecemos un temporizador (por ejemplo, 3000 milisegundos)
    if (!canConfirm) {
      options.timer = 2000; // Cierra la alerta después de 3 segundos
      options.timerProgressBar = true; // Opcional: una barra de progreso para el temporizador
    }

    Swal.fire(options);
  }

  showSuccess(message: string, title: string = 'Éxito', canConfirm: boolean = false) {
    const options: any = {
      title: title,
      text: message,
      icon: 'success',
      showConfirmButton: canConfirm,
      confirmButtonText: 'Ok',
    };

      // Si canConfirm es falso, entonces establecemos un temporizador (por ejemplo, 3000 milisegundos)
    if (!canConfirm) {
      options.timer = 2000; // Cierra la alerta después de 3 segundos
      options.timerProgressBar = true; // Opcional: una barra de progreso para el temporizador
    }

    Swal.fire(options);
  }

  showInfo(message: string, title: string = 'Información', canConfirm: boolean = false) {
    const options: any = {
      title: title,
      text: message,
      icon: 'info',
      showConfirmButton: canConfirm,
      confirmButtonText: 'Ok',
    };

      // Si canConfirm es falso, entonces establecemos un temporizador (por ejemplo, 3000 milisegundos)
    if (!canConfirm) {
      options.timer = 2000; // Cierra la alerta después de 3 segundos
      options.timerProgressBar = true; // Opcional: una barra de progreso para el temporizador
    }

    Swal.fire(options);
  }
}
