import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSueldo'
})
export class FormatSueldoPipe implements PipeTransform {

  transform(sueldo: number)  {
    console.log(sueldo)

    if(sueldo){
      var sueldoFormateado:any[] = []
      sueldo.toString().split('').forEach( (numero:any, index) => {
        if(index % 3 == 0 && index!==0){
          sueldoFormateado.push('.')
        }
        sueldoFormateado.push(numero)
      })
      return sueldoFormateado.join('')
    }
    return sueldo;
  }

}
