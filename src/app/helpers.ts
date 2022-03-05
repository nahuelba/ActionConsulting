import { FormControl, FormGroup } from "@angular/forms";

export function validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({onlySelf: true});
        } else if (control instanceof FormGroup) {
            validateAllFormFields(control);
        }
    })
}



export function ValidarPeriodo(fecha_fin:any, fecha_inicio:any, meses:any){
    if(fecha_fin){
        //validar si año de inicio es menor al fin
        if(parseInt(fecha_inicio.year) > parseInt(fecha_fin.year)){
          console.log('es mayor')
          return false;
        }
        
        //validar mes si son iguales los años
        if(parseInt(fecha_inicio.year) == parseInt(fecha_fin.year)){
          // const mes_inicio_index = this.meses.indexOf({"nombre" : this.experienciaLaboralForm.value.fecha_inicio.mes})
          const mes_inicio_index = meses.findIndex( (mes:any) => mes.nombre == fecha_inicio.mes);
          const mes_fin_index = meses.findIndex( (mes:any) => mes.nombre == fecha_fin.mes);

          if(mes_inicio_index>=mes_fin_index){
            return false;
          }
        } 
        
    }

    return true;
}
