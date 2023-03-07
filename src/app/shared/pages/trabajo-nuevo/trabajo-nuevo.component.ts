import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorComponent } from 'ng2-ckeditor';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, take } from 'rxjs/operators';
import { job } from 'src/app/interfaces/card.interface';
import { Provincia } from 'src/app/interfaces/pais';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import tipo_trabajo from 'src/assets/Opciones/trabajos/tipo_trabajo.json'
import categorias from 'src/assets/Opciones/trabajos/categorias.json'
import prioridad_trabajo from 'src/assets/Opciones/trabajos/prioridad_trabajo.json'

import NuevoTrabajoPlaceholder from 'src/assets/Opciones/trabajos/nuevoTrabajoPlaceholder.json'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateAllFormFields } from 'src/app/helpers';
import { ModalPreciosComponent } from 'src/app/components/modal-precios/modal-precios.component';
import { LaunchModalPreciosService } from 'src/app/services/launch-modal-precios.service';



@Component({
  selector: 'app-trabajo-nuevo',
  templateUrl: './trabajo-nuevo.component.html',
  styleUrls: ['./trabajo-nuevo.component.css'],
})
export class TrabajoNuevoComponent implements OnInit {



  @Input() job!: job;

lugar:any;
  user:any;

  trabajoNuevoForm = this.fb.group({
    titulo: ['', Validators.required],
    tipo_trabajo: ['', Validators.required],
    fecha_publicacion: [new Date(), Validators.required],
    puesto: ['', Validators.required],
    pais: ['', Validators.required],
    provincia:['', Validators.required],
    ciudad:[''],
    estado: ['Pendiente', Validators.required],
    empresa_id: ['', Validators.required],
    destacado:[false, Validators.required],
    rubro:['', Validators.required],
    descripcion: [NuevoTrabajoPlaceholder, Validators.required],
    prioridad_trabajo:['', Validators.required]
  })


  tipo_trabajo = tipo_trabajo
  prioridad_trabajo = prioridad_trabajo

  
  @ViewChild('ckeditorDescripcion') 'ckeditorDescripcion': CKEditorComponent;

  constructor(
    private fb:FormBuilder,
    private UbicacionesService: UbicacionesService,
    private AuthService: AuthService,
    private CardService: CardService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private LaunchModalService:LaunchModalPreciosService
  ) {}

  ngOnInit(): void {

    this.AuthService.getUserAfsSinId().subscribe((data: any) => {
      this.trabajoNuevoForm.controls.empresa_id.setValue(data.id);
      this.user =data 
      console.log(data)
    });

    //Setear forms si es editar Admin
    //  console.log(this.job)
  }
  ngOnChanges() {
    if (this.job) {
      this.trabajoNuevoForm.patchValue(this.job)

      this.lugar={
        pais:this.job.pais,
        provincia:this.job.provincia,
        ciudad:this.job.ciudad
      }
    }

  }

  ngAfterViewChecked() {
    let ckeditorDescripcion = this.ckeditorDescripcion.instance

    var height = 300;
    var extraPlugins = 'autogrow'
    var autoGrow_minHeight = 300
    var autoGrow_maxHeight = 400
    var toolbarGroups = [
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
    var removeButtons = 'Source,Save,NewPage,ExportPdf,Preview,Print,Templates,Cut,Undo,Redo,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Subscript,Superscript,Strike,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Table,Smiley,PageBreak,Iframe,ShowBlocks,Maximize,About';
    

    ckeditorDescripcion.config.height = height
    ckeditorDescripcion.config.extraPlugins = extraPlugins

    ckeditorDescripcion.config.autoGrow_minHeight = autoGrow_minHeight
    ckeditorDescripcion.config.autoGrow_maxHeight = autoGrow_maxHeight
    ckeditorDescripcion.config.toolbarGroups = toolbarGroups
    ckeditorDescripcion.config.removeButtons = removeButtons
    
    

      
  }

 

  publicar() {
    this.spinner.show()



    //buscar la cantidad de avisos restantes del usuario


        if(this.user.avisos==0){

            this.spinner.hide()
            this.LaunchModalService.disparaModalPrecios()
            return;
          
          
        }


        validateAllFormFields(this.trabajoNuevoForm);
    
        if (this.trabajoNuevoForm.valid) {
          console.log(this.trabajoNuevoForm.value)
    
          //Armar nuevo Trabajo
          if(this.job){
            //si es editar
            
            //Omitir reemplazar id de empresa al editar
            delete this.trabajoNuevoForm.value.empresa_id 
            this.CardService.actualizarTrabajo(this.job.id, this.trabajoNuevoForm.value)
            .then (data =>{
              console.log(data)
              this.spinner.hide()
              this.router.navigate(['/empresa/avisos/' + this.job.id]);
              this.toastr.success('Se modificó el Aviso con exito!')
            },
            err => {
              this.router.navigate(['/empresa/avisos'])
              this.toastr.warning('No se ha podido modificar el Aviso, intente mas tarde.')
            }
            )
          }else{
            //Si es crear nuevo
            console.log(this.trabajoNuevoForm.value)
    
            this.CardService.setTrabajo(this.trabajoNuevoForm.value).then((data) => {

              this.AuthService.updateUser(this.user.id, {avisos: this.user.avisos-1})
              .then(data => {
                this.spinner.hide()
                this.router.navigate(['/empresa/avisos']);
                this.toastr.success('Se ha creado el Aviso. Queda pendiente a aprobación.')
              })
          
            },
            err => {
              this.spinner.hide()
              this.router.navigate(['/empresa/avisos'])
              this.toastr.warning('No se ha podido crear el Aviso, intente mas tarde.')
            });
          }
    
    
         
        }else{
          this.spinner.hide()
        }

      
    






    
  }

}





