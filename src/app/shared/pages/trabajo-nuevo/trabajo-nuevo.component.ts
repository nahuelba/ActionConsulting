import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorComponent } from 'ng2-ckeditor';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { job } from 'src/app/interfaces/card.interface';
import { pais, Provincia } from 'src/app/interfaces/pais';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import paises from 'src/assets/Opciones/ubicaciones.json';
import puestos from 'src/assets/Opciones/trabajos/puestos.json'
import tipo_trabajo from 'src/assets/Opciones/trabajos/tipo_trabajo.json'
import rubros from 'src/assets/Opciones/trabajos/rubros.json'

declare var $: any;
@Component({
  selector: 'app-trabajo-nuevo',
  templateUrl: './trabajo-nuevo.component.html',
  styleUrls: ['./trabajo-nuevo.component.css'],
})
export class TrabajoNuevoComponent implements OnInit {
  @Input() job!: job;

  error = {
    puesto: false,
    tipo_trabajo: false,
    pais: false,
    provincia: false,
    ciudad: false,
    descripcion: false,
    rubro:false
  };

  form: job = {
    tipo_trabajo: '',
    descripcion: '',
    fecha_publicacion: new Date(),
    puesto: '',
    pais: {
      pais: '',
      provincia: {
        provincia: '',
        ciudad: {
          ciudad: '',
        },
      },
    },
    estado: 'Pendiente',
    empresa_id: '',
    destacado:false,
    categoria:'estandar',
    rubro:''
  };


  puestos = puestos
  tipo_trabajo = tipo_trabajo
  rubros = rubros

  
  @ViewChild(CKEditorComponent) 'ckEditor': CKEditorComponent;

  paises: string[] = paises;
  paisSeleccionado: string = '';

  provincias: Provincia[] = [];
  provinciaSeleccionada: Provincia | null = null;

  ciudadSeleccionada: string = '';

  constructor(
    private UbicacionesService: UbicacionesService,
    private AuthService: AuthService,
    private CardService: CardService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // //Error Ngfor y Selectpicker
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
    }, 0);

    this.AuthService.getUserLogged().subscribe((data: any) => {
      this.form.empresa_id = data.uid;
    });

    //Setear forms si es editar Admin
    //  console.log(this.job)
  }
  ngOnChanges() {
    if (this.job) {
      this.form.puesto = this.job.puesto;
      this.form.tipo_trabajo = this.job.tipo_trabajo;
      this.form.descripcion = this.job.descripcion;
      this.form.rubro = this.job.rubro
      var e = {
        target: {
          value: this.job.pais.pais,
        },
      };
      this.setProvincias(e);
    }
    // setTimeout(function () {
    //   $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
    // }, 50);
  }

  ngAfterViewChecked() {
    let editor = this.ckEditor.instance;
    editor.config.height = 300;
    editor.config.extraPlugins = 'autogrow';
    editor.config.autoGrow_minHeight = 300;
    editor.config.autoGrow_maxHeight = 450;
    editor.config.toolbarGroups = [
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'clipboard', groups: ['clipboard', 'undo'] },
      {
        name: 'editing',
        groups: ['find', 'selection', 'spellchecker', 'editing'],
      },
      { name: 'forms', groups: ['forms'] },
      '/',
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      {
        name: 'paragraph',
        groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'],
      },
      { name: 'links', groups: ['links'] },
      '/',
      { name: 'styles', groups: ['styles'] },
      { name: 'colors', groups: ['colors'] },
      { name: 'tools', groups: ['tools'] },
      { name: 'others', groups: ['others'] },
      { name: 'about', groups: ['about'] },
    ];

    editor.config.removeButtons =
      'Source,Save,NewPage,ExportPdf,Preview,Print,Templates,Cut,Undo,Redo,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Subscript,Superscript,Strike,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Table,Smiley,PageBreak,Iframe,ShowBlocks,Maximize,About';
  }

  setProvincias(e: any) {


    this.provinciaSeleccionada = null;
    
    this.paisSeleccionado = e.target.value;
    if (e.target.value) {
      this.UbicacionesService.getProvincias(e.target.value).subscribe(
        (data: pais) => {
          this.provincias = data.provincias;

          //Si el documento se esta editando
          if (this.job) {
            console.log(this.provincias);
            this.provinciaSeleccionada = this.provincias.find( (provincia) => provincia.provincia == this.job.pais.provincia.provincia) || null;
            this.ciudadSeleccionada = this.job.pais.provincia.ciudad.ciudad;
            //Error Ngfor y Selectpicker
          }
          setTimeout(function () {
            $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
          }, 0);
        }
        );
    }
    console.log(this.provinciaSeleccionada);
  }

  setCiudad() {
    console.log(this.provinciaSeleccionada);
    //Error Ngfor y Selectpicker
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
    }, 50);
  }

  publicar() {
    this.spinner.show()

    this.error = {
      puesto: false,
      tipo_trabajo: false,
      pais: false,
      provincia: false,
      ciudad: false,
      descripcion: false,
      rubro:false
    };

    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
    }, 50);

    if (this.form.puesto == '') {
      this.error.puesto = true;
    }
    if (this.form.tipo_trabajo == '') {
      this.error.tipo_trabajo = true;
    }
    if (this.form.rubro == '') {
      this.error.rubro = true;
    }
    if (this.paisSeleccionado == '') {
      this.error.pais = true;
    }
    if (!this.provinciaSeleccionada) {
      this.error.provincia = true;
    }
    if (!this.ciudadSeleccionada) {
      this.error.ciudad = true;
    }
    if (this.form.descripcion == '') {
      this.error.descripcion = true;
    }

    if (Object.values(this.error).every((item) => item === false)) {
      //Armar nuevo Trabajo
      this.form['pais']['pais'] = this.paisSeleccionado;
      this.form['pais']['provincia']['provincia'] = this.provinciaSeleccionada!['provincia'];
      this.form['pais']['provincia']['ciudad']['ciudad'] = this.ciudadSeleccionada;
      if(this.job){
        //si es editar
        this.form['estado'] = this.job.estado

        this.CardService.actualizarTrabajo(this.job.id, this.form)
        .then (data =>{
          console.log(data)
          this.spinner.hide()
          this.router.navigate(['/empresa/admin/' + this.job.id]);
          this.toastr.success('Se modificó el Aviso con exito!')
        },
        err => {
          this.router.navigate(['/empresa/avisos'])
          this.toastr.warning('No se ha podido modificar el Aviso, intente mas tarde.')
        }
        )
      }else{
        //Si es crear nuevo
        this.CardService.setTrabajo(this.form).then((data) => {
          this.spinner.hide()
          this.router.navigate(['/empresa/avisos']);
          this.toastr.success('Se ha creado el Aviso. Queda pendiente a aprobación.')
        },
        err => {
          this.spinner.hide()
          this.router.navigate(['/empresa/avisos'])
          this.toastr.warning('No se ha podido crear el Aviso, intente mas tarde.')
        });
      }

      console.log(this.form);

     
    }else{
      this.spinner.hide()
    }


    
  }




}
