import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import idiomas from 'src/assets/Opciones/idiomas.json';


@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit {

  idiomas:any = idiomas

  idiomasForm!: FormGroup;

  user:any

  constructor(
    private formBuilder: FormBuilder,
    private AuthService:AuthService,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService,
    private titleService: Title
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Idiomas | ACTION HUMAN CAPITAL CONSULTING');
    
    this.idiomasForm = this.formBuilder.group({
      idiomas: this.formBuilder.array([this.createIdiomaFormGroup()])
    });
    this.AuthService.getUserAfsSinId().pipe(take(1))
    .subscribe(user =>{
       this.user=user
       if(this.user){
          if(this.user['idiomas']){

            this.user.idiomas.forEach((idioma:any, i:any) => {
              if(i!=0){
                this.addIdiomaFormGroup()
              }
          // console.log((this.idiomasForm.get('idiomas') as FormArray).controls);
          // this.idiomasForm.value.idiomas[i] = idioma
          (this.idiomasForm.get('idiomas') as FormArray).controls[i].setValue(idioma);
        });
      }
      }
      })

  }
  public addIdiomaFormGroup() {
    const idiomas = this.idiomasForm.get('idiomas') as FormArray
    idiomas.push(this.createIdiomaFormGroup())
 
  }

  public removeOrClearIdioma(i: number) {
    const idiomas = this.idiomasForm.get('idiomas') as FormArray
    if (idiomas.length > 1) {
      idiomas.removeAt(i)
    } else {
      idiomas.reset()
    }
  }

  private createIdiomaFormGroup(): FormGroup {
    return new FormGroup({
      'idioma': new FormControl('', Validators.required),
      'nivel_oral': new FormControl('', Validators.required),
      'nivel_escrito': new FormControl('', Validators.required)
    })
  }
  getControls() {
    return (this.idiomasForm.get('idiomas') as FormArray).controls;
  }

  GuardarPerfil(){
    console.log(this.idiomasForm.value)
    if(this.idiomasForm.valid){
      this.spinner.show()
      this.AuthService.updateUser(this.user.id, this.idiomasForm.value)
      .then(data =>{
        this.toastr.success('Perfil actualizado con exito!')
        this.spinner.hide()

      },
      err => {
        this.toastr.error('No se pudo actualizar el perfil, intente mas tarde.')
        this.spinner.hide()
      })
    }
    
  }

  

}
