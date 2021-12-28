import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CKEditorComponent } from 'ng2-ckeditor';
import { job } from 'src/app/interfaces/card.interface';
import { pais, Provincia } from 'src/app/interfaces/pais';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import paises from 'src/assets/Opciones/ubicaciones.json'


declare var $:any;


@Component({
  selector: 'app-nuevo-trabajo',
  templateUrl: './nuevo-trabajo.component.html',
  styleUrls: ['./nuevo-trabajo.component.css']
})
export class NuevoTrabajoComponent implements OnInit {
  
  
  
  @ViewChild('closeModal') 'closeModal': ElementRef;

  error = {
    puesto : false,
    tipo_empresa : false,
    pais : false,
    provincia : false,
    ciudad : false,
    descripcion : false

  }


  form:job = {
    tipo_empresa: "",
    descripcion:"",
    fecha_publicacion:new Date(),
    puesto:"",
    pais: {
      pais: "",
      provincia: {
        provincia: "",
        ciudad: {
          ciudad: ""
      }
    }
    },
    estado:"",
    empresa_id:""

  }
  @ViewChild(CKEditorComponent) 'ckEditor': CKEditorComponent

  paises:string[] = paises
  paisSeleccionado:string = "" 

  provincias:Provincia[] = []
  provinciaSeleccionada:Provincia | null = null

  ciudadSeleccionada:string = ""

  constructor(
    private UbicacionesService:UbicacionesService, 
    private AuthService:AuthService, 
    private CardService:CardService,
    private router:Router
    ) { }

  ngOnInit(): void {

    //Error Ngfor y Selectpicker
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');   // refresh the selectpicker with fetched courses
     }, 50);


     this.AuthService.getUserLogged()
     .subscribe((data:any) =>{
      this.form.empresa_id = data.uid
     })
  }

  ngAfterViewChecked(){
    let editor = this.ckEditor.instance;
    editor.config.height = 300;
    editor.config.extraPlugins = 'autogrow';
    editor.config.autoGrow_minHeight = 300;
    editor.config.autoGrow_maxHeight = 450;
    editor.config.toolbarGroups = [
      { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
      { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
      { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
      { name: 'forms', groups: [ 'forms' ] },
      '/',
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
      { name: 'links', groups: [ 'links' ] },
      '/',
      { name: 'styles', groups: [ 'styles' ] },
      { name: 'colors', groups: [ 'colors' ] },
      { name: 'tools', groups: [ 'tools' ] },
      { name: 'others', groups: [ 'others' ] },
      { name: 'about', groups: [ 'about' ] }
    ]

    editor.config.removeButtons = 'Source,Save,NewPage,ExportPdf,Preview,Print,Templates,Cut,Undo,Redo,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Subscript,Superscript,Strike,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Table,Smiley,PageBreak,Iframe,ShowBlocks,Maximize,About';
  }

  setProvincias(e:any){
    this.provinciaSeleccionada = null
    this.paisSeleccionado= e.target.value
    if(e.target.value){

      this.UbicacionesService.getProvincias(e.target.value)
      .subscribe((data:pais) => {
        

        

        this.provincias = data.provincias
        //Error Ngfor y Selectpicker
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh');   // refresh the selectpicker with fetched courses
          }, 50);
      }
        )

    }

    console.log(this.provinciaSeleccionada)
  }


  setCiudad(){
    console.log(this.provinciaSeleccionada)
    //Error Ngfor y Selectpicker
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');   // refresh the selectpicker with fetched courses
      }, 50);


  }



  publicar(){
    this.error = {
      puesto : false,
      tipo_empresa : false,
      pais : false,
      provincia : false,
      ciudad : false,
      descripcion : false
  
    }
    
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh');   // refresh the selectpicker with fetched courses
          }, 50);

    if(this.form.puesto==""){
      this.error.puesto = true 
    }
    if(this.form.tipo_empresa==""){
      this.error.tipo_empresa = true
    }
    if( this.paisSeleccionado==""){
      this.error.pais = true

    }
    if( !this.provinciaSeleccionada){
      this.error.provincia = true
    }
    if(!this.ciudadSeleccionada){
      this.error.ciudad = true
    }
    if(this.form.descripcion==""){
      this.error.descripcion = true
    }


    if( Object.values(this.error).every(item => item === false)){
      //Armar nuevo Trabajo
      this.form['estado'] = "Pendiente"
      this.form['pais']['pais'] = this.paisSeleccionado
      this.form['pais']['provincia']['provincia'] = this.provinciaSeleccionada!['provincia']
      this.form['pais']['provincia']['ciudad']['ciudad'] = this.ciudadSeleccionada
      
      console.log(this.form)

      this.CardService.setTrabajo(this.form)
      .then(data =>{
        this.router.navigate(['/empresa/trabajos'])
        
      })
    }
    
  }

}
