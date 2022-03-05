import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';

import { pais, Provincia } from 'src/app/interfaces/pais';
import { user } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { Title } from '@angular/platform-browser';
import { validateAllFormFields } from 'src/app/helpers';
import { MiPerfilService } from 'src/app/services/mi-perfil.service';
import { combineLatest, from } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class DatosPersonalesComponent implements OnInit {
  errorFormato = false;
  ErrorSize = false;

  provincias: Provincia[] = [];

  lugar: any;

  ciudades: string[] = [];
  fecha_nacimiento: any;

  email: string = '';

  idDatosContacto = '';
  datosContacto = new FormGroup({
    nombre: new FormControl('', Validators.required),
  });

  datosPersonales = new FormGroup({
    puesto: new FormControl(''),
    rubro: new FormControl(''),
    sueldo: new FormControl(),
    genero: new FormControl(),
    fecha_nacimiento: new FormControl(),
    pais: new FormControl(''),
    provincia: new FormControl(''),
    ciudad: new FormControl(''),
    licencia: new FormControl(false),
    movilidad: new FormControl(false),
    discapacidad: new FormControl(false),
    foto_perfil: new FormControl(''),
  });

  user!: user;

  constructor(
    private UbicacionesService: UbicacionesService,
    private AuthService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private titleService: Title,
    private MiPerfilService: MiPerfilService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(
      'Datos Personales | ACTION HUMAN CAPITAL CONSULTING'
    );

    this.AuthService.getUserAfsSinId().subscribe((user: any) => {
      this.user = user;
      //Nombre
      this.MiPerfilService.leerDatosContacto(user.id).subscribe((data: any) => {
        if (data[0].nombre) {
          this.datosContacto.controls.nombre.setValue(data[0].nombre);
        }
        this.idDatosContacto = data[0].id;
        this.email = data[0].email;
      });

      //puesto
      this.datosPersonales.controls.puesto.setValue(user.puesto);

      //rubro
      this.datosPersonales.controls.rubro.setValue(user.rubro);
      //Fecha nacimiento
      this.fecha_nacimiento = user.fecha_nacimiento;
      this.datosPersonales.controls.fecha_nacimiento.setValue({
        ...user.fecha_nacimiento,
      });

      //sueldo
      this.datosPersonales.controls.sueldo.setValue(user.sueldo);

      //Foto de perfil
      this.datosPersonales.controls.foto_perfil.setValue(user.foto);

      //genero
      this.datosPersonales.controls.genero.setValue(user.genero);
      //pais
      this.datosPersonales.controls.pais.setValue(user.pais);
      this.lugar = {
        pais: user.pais,
        provincia: user.provincia,
        ciudad: user.ciudad,
      };

      this.datosPersonales.controls.licencia.setValue(user.licencia);
      this.datosPersonales.controls.movilidad.setValue(user.movilidad);
      this.datosPersonales.controls.discapacidad.setValue(user.discapacidad);
    });

    this.datosPersonales.addControl('fecha_nacimiento', new FormControl(''));
  }

  GuardarPerfil() {
    validateAllFormFields(this.datosPersonales);
    if (this.datosPersonales.valid && this.datosContacto.valid) {
      this.spinner.show();
      this.datosPersonales.controls.fecha_nacimiento.setValue({
        ...this.fecha_nacimiento,
      });
      Object.keys(this.datosPersonales.value).forEach((key) => {
        if (this.datosPersonales.value[key] === undefined) {
          delete this.datosPersonales.value[key];
        }
      });

      this.MiPerfilService.updateDatosContacto(
        this.user.id || '',
        this.idDatosContacto,
        this.datosContacto.value
      );

      //guardar la demas info
      console.log(this.datosPersonales.value);
      this.AuthService.updateUser(
        this.user.id || '',
        this.datosPersonales.value
      ).then(
        (data) => {
          this.toastr.success('Perfil actualizado con exito!');
          this.spinner.hide();
        },
        (err) => {
          this.toastr.error(
            'No se pudo actualizar el perfil, intente mas tarde.'
          );
          this.spinner.hide();
        }
      );
    }
  }

  subirFotoPerfil(e: any) {
    this.errorFormato = false;
    this.ErrorSize = false;
    console.log(e.files.item(0));
    if (e.files.item(0)) {
      if (
        e.files.item(0).type == 'image/jpeg' ||
        e.files.item(0).type == 'image/png'
      ) {
        this.spinner.show();

        var tipo = '';
        //definir el tipo de documento a guardar
        switch (e.files.item(0).type) {
          case 'image/jpeg':
            var tipo = '.jpg';
            break;
          case 'image/png':
            var tipo = '.png';
            break;
        }

        var nombre = e.files.item(0).name.split(tipo)[0].replaceAll(' ', '_');
        //eliminar anterior foto
        this.MiPerfilService.deleteAllFolder(this.email)
          .pipe(take(1))
          .subscribe((listResults) => {
            debugger;
            const promises = listResults.items.map((item) => {
              return item.delete();
            });
            Promise.all(promises);
            //subir nueva foto
            from(
              this.MiPerfilService.subirFoto(
                this.email,
                nombre,
                e.files.item(0),
                tipo
              )
            )
              .pipe(take(1))
              .subscribe((rst) => {
                rst.ref.getDownloadURL().then((url) => {
                  console.log(url);
                  this.AuthService.updateUser(this.user.id || '', {
                    foto: url,
                  }).then(() => {
                    this.datosPersonales.controls.foto_perfil.setValue(url);
                    this.toastr.success('Se subio la imagen con exito!');
                    this.spinner.hide();
                  });
                });
              });
          });
      } else {
        this.errorFormato = true;
      }
      if (e.files.item(0).size > 5000000) {
        this.ErrorSize = true;
      }
    }
  }


  eliminarFoto(){
    this.spinner.show()
    //eliminar anterior foto
    this.MiPerfilService.deleteAllFolder(this.email)
    .pipe(take(1))
    .subscribe((listResults) => {
      debugger;
      const promises = listResults.items.map((item) => {
        return item.delete();
      });
      Promise.all(promises);
      this.spinner.hide()
      this.toastr.success('se elimino la foto con exito')
      this.datosPersonales.controls.foto_perfil.setValue('');
    });

    this.AuthService.updateUser(this.user.id || "", {foto: ''})
    

  }
}
