(self.webpackChunkactionhconsulting=self.webpackChunkactionhconsulting||[]).push([[585],{352:(e,r,t)=>{"use strict";t.d(r,{P:()=>u});var i=t(5917),o=t(5257),s=t(4612),a=t(7716),n=t(6178),c=t(6334),l=t(9351);let u=(()=>{class e{constructor(e,r,t){this.afs=e,this.AuthService=r,this.storage=t}agregarExperienciaLaboral(e,r){return this.afs.collection("users").doc(e).collection("experiencias_laborales").add(r)}leerExperienciasLaborales(e){return this.afs.collection("users").doc(e).collection("experiencias_laborales").valueChanges({idField:"id"})}updateExperiencia(e,r,t){return this.afs.collection("users").doc(e).collection("experiencias_laborales").doc(r).set(t)}eliminarExperiencia(e,r){return this.afs.collection("users").doc(e).collection("experiencias_laborales").doc(r).delete()}agregarFormacion(e,r){return this.afs.collection("users").doc(e).collection("formaciones").add(r)}leerFormacion(e){return this.afs.collection("users").doc(e).collection("formaciones").valueChanges({idField:"id"})}updateFormacion(e,r,t){return this.afs.collection("users").doc(e).collection("formaciones").doc(r).update(t)}eliminarFormacion(e,r){return this.afs.collection("users").doc(e).collection("formaciones").doc(r).delete()}agregarDatosContacto(e,r){return this.afs.collection("users").doc(e).collection("datos_contacto").add(r)}leerDatosContacto(e){return this.afs.collection("users").doc(e).collection("datos_contacto").valueChanges({idField:"id"}).pipe((0,o.q)(1))}updateDatosContacto(e,r,t){return this.afs.collection("users").doc(e).collection("datos_contacto").doc(r).update(t)}updateUserUsuariosRevelados(e,r,t){return this.afs.collection("users").doc(e).collection("usuarios_revelados").doc(r).set(t,{merge:!0})}eliminarUsuarioRevelado(e){return this.AuthService.getUserLogged().pipe((0,s.b)(r=>r?this.afs.collection("users").doc(r.uid).collection("usuarios_revelados").doc(e).delete():(0,i.of)(!1)),(0,o.q)(1))}leerUserUsuariosRevelados(){return this.AuthService.getUserLogged().pipe((0,s.b)(e=>e?this.afs.collection("users").doc(e.uid).collection("usuarios_revelados").valueChanges({idField:"id"}).pipe((0,o.q)(1)):(0,i.of)(!1)),(0,o.q)(1))}subirFoto(e,r,t,i){return this.storage.upload(e+"/foto/"+r+i,t)}ObtenerFoto(e,r,t){return this.storage.ref(e+"/foto/"+r+t).getDownloadURL()}deleteAllFolder(e){return this.storage.ref(e+"/foto/").listAll()}}return e.\u0275fac=function(r){return new(r||e)(a.LFG(n.ST),a.LFG(c.e),a.LFG(l.Q1))},e.\u0275prov=a.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},6585:(e,r,t)=>{"use strict";t.r(r),t.d(r,{RegisterModule:()=>N});var i=t(8583),o=t(8094),s=t(8049),a=t(8002),n=t(7716),c=t(6334);let l=(()=>{class e{constructor(e,r){this.router=e,this.AuthService=r}canActivate(e,r){return this.AuthService.getUserLogged().pipe((0,s.P)(),(0,a.U)(e=>e&&!e.emailVerified||(this.router.navigate(["/personal"]),!1)))}canActivateChild(e,r){return this.AuthService.getUserLogged().pipe((0,s.P)(),(0,a.U)(e=>!e||(e.emailVerified?(this.router.navigate(["/personal"]),!1):(this.router.navigate(["/auth/register/verificar-email"]),!1))))}}return e.\u0275fac=function(r){return new(r||e)(n.LFG(o.F0),n.LFG(c.e))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var u=t(3679),d=t(9548),p=t(7660),h=t(9075);function m(e,r){if(1&e&&(n.TgZ(0,"div",17),n._uU(1),n.qZA()),2&e){const e=n.oxw();n.xp6(1),n.hij(" ",e.error," ")}}const g=function(){return["/auth/login"]};let f=(()=>{class e{constructor(e,r,t,i){this.authService=e,this.router=r,this.spinner=t,this.titleService=i,this.error="",this.errorArchivo=!1,this.registerForm=new u.cw({tipo:new u.NI("empresa"),nombre:new u.NI("",u.kI.required),email:new u.NI(""),password:new u.NI(""),password2:new u.NI("")})}ngOnInit(){this.titleService.setTitle("Registrarse | ACTION HUMAN CAPITAL CONSULTING"),this.router.url.includes("personal")?this.tipo="/personal":this.router.url.includes("empresa")?this.tipo="/empresa":this.router.navigate(["/personal"])}register(){if(this.spinner.show(),console.log(this.registerForm.value),this.registerForm.value.password==this.registerForm.value.password2){if(0==this.errorArchivo){const{email:e,password:r,nombre:t}=this.registerForm.value;this.authService.register(e,r).then(r=>{if(console.log(r),r.code){switch(r.code){case"auth/invalid-email":this.error="El Email es inv\xe1lido.";break;case"auth/weak-password":this.error="La contrase\xf1a debe tener una longitud de 6 o mas.";break;case"auth/email-already-in-use":this.error="El email ya est\xe1 en uso."}return void this.spinner.hide()}r.user.updateProfile({displayName:`${t}`});let i=d.find(e=>"Est\xe1ndar"==e.categoria);this.authService.saveUser({tipo:this.registerForm.value.tipo,nombre:t,email:e,admin:!1,categoria:"Est\xe1ndar",avisos:null==i?void 0:i.avisos,curriculums:null==i?void 0:i.curriculums},r.user.uid).then(e=>{this.spinner.hide()}),this.authService.verifyEmail(r.user),this.router.navigate([this.tipo+"/auth/register/verificar-email"])})}}else this.error="Las contrase\xf1as no coinciden",this.spinner.hide()}}return e.\u0275fac=function(r){return new(r||e)(n.Y36(c.e),n.Y36(o.F0),n.Y36(p.t2),n.Y36(h.Dx))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-empresa-form"]],decls:24,vars:4,consts:[["id","main",1,"container"],[1,"row"],[1,"col-sm-9","col-md-7","col-lg-8","mx-auto"],[1,"card","border-0","shadow","rounded-3","my-5"],[1,"card-body","p-4","p-sm-5"],[1,"card-title","text-center","mb-5","fw-light","fs-5"],[3,"formGroup","ngSubmit"],[1,"form-floating","mb-3"],["type","text","formControlName","nombre","placeholder","Nombre de la empresa",1,"form-control"],["type","email","formControlName","email","placeholder","Email",1,"form-control"],["type","password","formControlName","password","placeholder","Contrase\xf1a",1,"form-control"],["type","password","formControlName","password2","placeholder","Repita la contrase\xf1a",1,"form-control"],["class","alert alert-danger","role","alert",4,"ngIf"],[1,"d-grid"],["type","submit",1,"btn","btn-success","btn-login","text-uppercase","fw-bold"],[1,"my-4"],[3,"routerLink"],["role","alert",1,"alert","alert-danger"]],template:function(e,r){1&e&&(n.TgZ(0,"div",0),n.TgZ(1,"div",1),n.TgZ(2,"div",2),n.TgZ(3,"div",3),n.TgZ(4,"div",4),n.TgZ(5,"h5",5),n._uU(6,"Registrarse"),n.qZA(),n.TgZ(7,"form",6),n.NdJ("ngSubmit",function(){return r.register()}),n.TgZ(8,"div",7),n._UZ(9,"input",8),n.qZA(),n.TgZ(10,"div",7),n._UZ(11,"input",9),n.qZA(),n.TgZ(12,"div",7),n._UZ(13,"input",10),n.qZA(),n.TgZ(14,"div",7),n._UZ(15,"input",11),n.qZA(),n.YNc(16,m,2,1,"div",12),n.TgZ(17,"div",13),n.TgZ(18,"button",14),n._uU(19,"Registrarse"),n.qZA(),n.qZA(),n.TgZ(20,"p",15),n._uU(21,"Ya tienes cuenta? "),n.TgZ(22,"a",16),n._uU(23,"Ingresar"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&e&&(n.xp6(7),n.Q6J("formGroup",r.registerForm),n.xp6(9),n.Q6J("ngIf",r.error),n.xp6(6),n.Q6J("routerLink",n.DdM(3,g)))},directives:[u._Y,u.JL,u.sg,u.Fj,u.JJ,u.u,i.O5,o.yS],styles:[""]}),e})();var v=t(352);function Z(e,r){if(1&e&&(n.TgZ(0,"div",17),n._uU(1),n.qZA()),2&e){const e=n.oxw();n.xp6(1),n.hij(" ",e.error," ")}}const A=function(e){return[e]};let w=(()=>{class e{constructor(e,r,t,i,o){this.authService=e,this.router=r,this.spinner=t,this.titleService=i,this.MiPerfilService=o,this.error="",this.errorArchivo=!1,this.registerForm=new u.cw({tipo:new u.NI("personal"),nombre:new u.NI("",u.kI.required),email:new u.NI(""),password:new u.NI(""),password2:new u.NI("")})}ngOnInit(){this.titleService.setTitle("Registrarse | ACTION HUMAN CAPITAL CONSULTING"),this.router.url.includes("personal")?this.tipo="/personal":this.router.url.includes("empresa")?this.tipo="/empresa":this.router.navigate(["/personal"])}register(){if(this.spinner.show(),console.log(this.registerForm.value),this.registerForm.value.password==this.registerForm.value.password2){if(0==this.errorArchivo){const{email:e,password:r,nombre:t}=this.registerForm.value;this.authService.register(e,r).then(r=>{if(console.log(r),r.code){switch(r.code){case"auth/invalid-email":this.error="El Email es inv\xe1lido.";break;case"auth/weak-password":this.error="La contrase\xf1a debe tener una longitud de 6 o mas.";break;case"auth/email-already-in-use":this.error="El email ya est\xe1 en uso."}this.spinner.hide()}else r.user.updateProfile({displayName:`${t}`}),this.authService.saveUser({tipo:this.registerForm.value.tipo,admin:!1},r.user.uid).then(i=>{this.MiPerfilService.agregarDatosContacto(r.user.uid||"",{email:e,nombre:t}).then(e=>this.spinner.hide())}),this.authService.verifyEmail(r.user),this.router.navigate([this.tipo+"/auth/register/verificar-email"])})}}else this.error="Las contrase\xf1as no coinciden",this.spinner.hide()}}return e.\u0275fac=function(r){return new(r||e)(n.Y36(c.e),n.Y36(o.F0),n.Y36(p.t2),n.Y36(h.Dx),n.Y36(v.P))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-personal-form"]],decls:24,vars:5,consts:[["id","main",1,"container"],[1,"row"],[1,"col-sm-9","col-md-7","col-lg-8","mx-auto"],[1,"card","border-0","shadow","rounded-3","my-5"],[1,"card-body","p-4","p-sm-5"],[1,"card-title","text-center","mb-5","fw-light","fs-5"],[3,"formGroup","ngSubmit"],[1,"form-floating","mb-3"],["type","text","formControlName","nombre","placeholder","Nombre y Apellido",1,"form-control"],["type","email","formControlName","email","placeholder","Email",1,"form-control"],["type","password","formControlName","password","placeholder","Contrase\xf1a",1,"form-control"],["type","password","formControlName","password2","placeholder","Repita la contrase\xf1a",1,"form-control"],["class","alert alert-danger","role","alert",4,"ngIf"],[1,"d-grid"],["type","submit",1,"btn","btn-success","btn-login","text-uppercase","fw-bold"],[1,"my-4"],[3,"routerLink"],["role","alert",1,"alert","alert-danger"]],template:function(e,r){1&e&&(n.TgZ(0,"div",0),n.TgZ(1,"div",1),n.TgZ(2,"div",2),n.TgZ(3,"div",3),n.TgZ(4,"div",4),n.TgZ(5,"h5",5),n._uU(6,"Registrarse"),n.qZA(),n.TgZ(7,"form",6),n.NdJ("ngSubmit",function(){return r.register()}),n.TgZ(8,"div",7),n._UZ(9,"input",8),n.qZA(),n.TgZ(10,"div",7),n._UZ(11,"input",9),n.qZA(),n.TgZ(12,"div",7),n._UZ(13,"input",10),n.qZA(),n.TgZ(14,"div",7),n._UZ(15,"input",11),n.qZA(),n.YNc(16,Z,2,1,"div",12),n.TgZ(17,"div",13),n.TgZ(18,"button",14),n._uU(19,"Registrarse"),n.qZA(),n.qZA(),n.TgZ(20,"p",15),n._uU(21,"Ya tienes cuenta? "),n.TgZ(22,"a",16),n._uU(23,"Ingresar"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&e&&(n.xp6(7),n.Q6J("formGroup",r.registerForm),n.xp6(9),n.Q6J("ngIf",r.error),n.xp6(6),n.Q6J("routerLink",n.VKq(3,A,r.tipo+"/auth/login-email")))},directives:[u._Y,u.JL,u.sg,u.Fj,u.JJ,u.u,i.O5,o.yS],styles:[""]}),e})();var b=t(2559);let T=(()=>{class e{constructor(){}ngOnInit(){}prepareRoute(e){return e&&e.activatedRouteData&&e.activatedRouteData.animation}}return e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-register"]],decls:3,vars:1,consts:[["id","main"],["outlet","outlet"]],template:function(e,r){if(1&e&&(n.TgZ(0,"div",0),n._UZ(1,"router-outlet",null,1),n.qZA()),2&e){const e=n.MAs(2);n.Q6J("@routeAnimations",r.prepareRoute(e))}},directives:[o.lC],styles:[".back[_ngcontent-%COMP%], .back[_ngcontent-%COMP%]:hover, .back[_ngcontent-%COMP%]:link{color:#fff;-webkit-text-decoration:#fff;text-decoration:#fff}.back[_ngcontent-%COMP%]{height:100%}#main[_ngcontent-%COMP%]{min-height:calc(100% - 96px - 50px)}"],data:{animation:[b.R]}}),e})();var q=t(9699);const U=[{path:"",component:T,children:[{path:"",canActivateChild:[l],children:[{path:"empresa",component:f,data:{animation:"empresa"}},{path:"personal",component:w,data:{animation:"personal"}}]},{path:"verificar-email",canActivate:[l],component:(()=>{class e{constructor(e,r,t){this.AuthService=e,this.toastr=r,this.titleService=t}ngOnInit(){this.titleService.setTitle("Verificar Email | ACTION HUMAN CAPITAL CONSULTING"),this.AuthService.getUserLogged().subscribe(e=>this.user=e)}reenviarEmail(){this.AuthService.verifyEmail(this.user).then(e=>{this.toastr.success("Se ha enviado el email para verificar. Revisa tu correo.")},e=>{this.toastr.error("Se han enviado muchas peticiones. Intenta mas tarde.")})}}return e.\u0275fac=function(r){return new(r||e)(n.Y36(c.e),n.Y36(q._W),n.Y36(h.Dx))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-verificar-email"]],decls:15,vars:1,consts:[["id","main",1,"container"],[1,"row"],[1,"col-sm-9","col-md-7","col-lg-8","mx-auto"],[1,"card","border-0","shadow","rounded-3","my-5"],[1,"card-body","p-4","p-sm-5"],[1,"card-title","text-center","mb-5","fw-light","fs-5"],[1,"text-center"],["aria-hidden","true",1,"fa","fa-envelope-o","fa-5x"],[1,"my-4"],[1,"my-5","text-muted",2,"font-size","1rem"],[2,"cursor","pointer",3,"click"]],template:function(e,r){1&e&&(n.TgZ(0,"div",0),n.TgZ(1,"div",1),n.TgZ(2,"div",2),n.TgZ(3,"div",3),n.TgZ(4,"div",4),n.TgZ(5,"h5",5),n._uU(6,"Verificar email"),n.qZA(),n.TgZ(7,"div",6),n._UZ(8,"i",7),n.TgZ(9,"p",8),n._uU(10),n.qZA(),n.TgZ(11,"p",9),n._uU(12,"No lo recibiste? "),n.TgZ(13,"a",10),n.NdJ("click",function(){return r.reenviarEmail()}),n._uU(14,"Reenviar email"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&e&&(n.xp6(10),n.hij("Te hemos enviado un email a ",null==r.user?null:r.user.email,""))},styles:[""]}),e})(),data:{animation:"verificar-email"}}]}];let y=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[o.Bz.forChild(U)],o.Bz]}),e})();var _=t(4466);let N=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[i.ez,y,_.m,u.UX]]}),e})()}}]);