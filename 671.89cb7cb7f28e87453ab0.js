(self.webpackChunkactionhconsulting=self.webpackChunkactionhconsulting||[]).push([[671],{2671:(e,t,n)=>{"use strict";n.r(t),n.d(t,{AuthModule:()=>x});var o=n(8583),r=n(8094),i=n(2559),a=n(7716),c=n(5227);const s=function(e){return{"background-image":e}};let l=(()=>{class e{constructor(e){this.router=e}ngOnInit(){console.log(this.router.url),this.router.url.includes("personal")?this.tipo="/personal":this.router.url.includes("empresa")?this.tipo="/empresa":this.router.navigate(["/personal"])}prepareRoute(e){return e&&e.activatedRouteData&&e.activatedRouteData.animation}}return e.\u0275fac=function(t){return new(t||e)(a.Y36(r.F0))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-auth"]],decls:12,vars:5,consts:[[1,"navbar","navbar-dark",2,"background-color","#313A46"],[3,"routerLink"],["aria-hidden","true",1,"fa","fa-chevron-left","fa-lg","mx-3","back"],["routerLink","/",1,"navbar-brand","mx-auto"],["src","assets/img/ablanco.png","height","50","alt","",1,""],["id","main",2,"overflow","hidden"],[1,"row"],[1,"col-6","background-image",3,"ngStyle"],[1,"col"],["outlet","outlet"]],template:function(e,t){if(1&e&&(a.TgZ(0,"nav",0),a.TgZ(1,"a",1),a._UZ(2,"i",2),a.qZA(),a.TgZ(3,"a",3),a._UZ(4,"img",4),a.qZA(),a.qZA(),a.TgZ(5,"div",5),a.TgZ(6,"div",6),a._UZ(7,"div",7),a.TgZ(8,"div",8),a._UZ(9,"router-outlet",null,9),a.qZA(),a.qZA(),a.qZA(),a._UZ(11,"app-footer")),2&e){const e=a.MAs(10);a.xp6(1),a.Q6J("routerLink","/empresa"==t.tipo?"/":"/personal"),a.xp6(6),a.Q6J("ngStyle",a.VKq(3,s,"url(/assets/img"+t.tipo+"-auth.jpg)")),a.xp6(1),a.Q6J("@routeAnimations",t.prepareRoute(e))}},directives:[r.yS,o.PC,r.lC,c.c],styles:["body[_ngcontent-%COMP%]{background:#007bff;background:linear-gradient(90deg,#0062e6,#33aeff)}.btn-login[_ngcontent-%COMP%]{font-size:.9rem;letter-spacing:.05rem;padding:.75rem 1rem}.btn-google[_ngcontent-%COMP%]{color:#fff!important;background-color:#ea4335}.btn[_ngcontent-%COMP%]{padding:12px 24px}.btn-facebook[_ngcontent-%COMP%]{color:#fff!important;background-color:#3b5998}.back[_ngcontent-%COMP%]{height:100%}.back[_ngcontent-%COMP%], .back[_ngcontent-%COMP%]:hover, .back[_ngcontent-%COMP%]:link{color:#fff;-webkit-text-decoration:#fff;text-decoration:#fff}.hover-success[_ngcontent-%COMP%]:hover{background-color:#a8cf46}#main[_ngcontent-%COMP%]{min-height:calc(100% - 96px - 50px)}.background-image[_ngcontent-%COMP%]{height:calc(100vh - 96px - 50px);min-height:500px;background-size:cover;background-position:50%;background-repeat:no-repeat}"],data:{animation:[i.R]}}),e})();var g=n(3679),u=n(6334),d=n(9829),m=n(7660),p=n(9075);function h(e,t){if(1&e&&(a.TgZ(0,"div",18),a._uU(1),a.qZA()),2&e){const e=a.oxw();a.xp6(1),a.hij(" ",e.error," ")}}const f=function(e){return[e]};let b=(()=>{class e{constructor(e,t,n,o,r){this.authService=e,this.router=t,this.afAuth=n,this.spinner=o,this.titleService=r,this.error="",this.loginForm=new g.cw({email:new g.NI(""),password:new g.NI(""),remember:new g.NI(!1)})}ngOnInit(){this.titleService.setTitle("Ingresar con Email | ACTION HUMAN CAPITAL CONSULTING"),this.router.url.includes("personal")?this.tipo="/personal":this.router.url.includes("empresa")?this.tipo="/empresa":this.router.navigate(["/personal"])}login(){this.spinner.show(),console.log(this.loginForm.value);const{email:e,password:t,remember:n}=this.loginForm.value;this.afAuth.setPersistence(n?"local":"session").then(()=>{this.authService.login(e,t).then(e=>{if(console.log(e),null!==e){if(e.code){switch(e.code){case"auth/wrong-password":this.error="La contrase\xf1a es inv\xe1lida.";break;case"auth/user-not-found":this.error="El email no corresponde a un usuario existente.";break;case"auth/invalid-email":this.error="El Email es inv\xe1lido."}return void this.spinner.hide()}this.authService.getUserAfs(e.user.uid).subscribe(e=>{this.spinner.hide(),this.router.navigate([e.tipo])})}},e=>console.log(e))})}}return e.\u0275fac=function(t){return new(t||e)(a.Y36(u.e),a.Y36(r.F0),a.Y36(d.zQ),a.Y36(m.t2),a.Y36(p.Dx))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-login-mail"]],decls:27,vars:8,consts:[["id","main",1,"container"],[1,"row"],[1,"col-md-7","col-lg-8","mx-auto"],[1,"card","border-0","shadow","rounded-3","my-5"],[1,"card-body","p-4","p-sm-5"],[1,"card-title","text-center","mb-5","fw-light","fs-5"],[3,"formGroup","ngSubmit"],[1,"form-floating","mb-3"],["type","email","formControlName","email","id","floatingInput","placeholder","Email",1,"form-control"],["type","password","formControlName","password","id","floatingPassword","placeholder","Contrase\xf1a",1,"form-control"],[1,"form-check","mb-3"],["type","checkbox","value","","formControlName","remember","id","rememberPasswordCheck",1,"form-check-input"],["for","rememberPasswordCheck",1,"form-check-label"],["class","alert alert-danger","role","alert",4,"ngIf"],[1,"d-grid"],["type","submit",1,"btn","btn-success","btn-login","text-uppercase","fw-bold"],[1,"mt-4"],[3,"routerLink"],["role","alert",1,"alert","alert-danger"]],template:function(e,t){1&e&&(a.TgZ(0,"div",0),a.TgZ(1,"div",1),a.TgZ(2,"div",2),a.TgZ(3,"div",3),a.TgZ(4,"div",4),a.TgZ(5,"h5",5),a._uU(6,"Ingresar"),a.qZA(),a.TgZ(7,"form",6),a.NdJ("ngSubmit",function(){return t.login()}),a.TgZ(8,"div",7),a._UZ(9,"input",8),a.qZA(),a.TgZ(10,"div",7),a._UZ(11,"input",9),a.qZA(),a.TgZ(12,"div",10),a._UZ(13,"input",11),a.TgZ(14,"label",12),a._uU(15," Recordarme "),a.qZA(),a.qZA(),a.YNc(16,h,2,1,"div",13),a.TgZ(17,"div",14),a.TgZ(18,"button",15),a._uU(19,"Ingresar"),a.qZA(),a.qZA(),a.TgZ(20,"p",16),a.TgZ(21,"a",17),a._uU(22,"\xbfHas olvidado tu contrase\xf1a? "),a.qZA(),a.qZA(),a.TgZ(23,"p",16),a._uU(24,"\xbfNo tienes cuenta? "),a.TgZ(25,"a",17),a._uU(26,"Registrate"),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA()),2&e&&(a.xp6(7),a.Q6J("formGroup",t.loginForm),a.xp6(9),a.Q6J("ngIf",t.error),a.xp6(5),a.Q6J("routerLink",a.VKq(4,f,t.tipo+"/auth/recuperar-password")),a.xp6(4),a.Q6J("routerLink",a.VKq(6,f,t.tipo+"/auth/register"+t.tipo)))},directives:[g._Y,g.JL,g.sg,g.Fj,g.JJ,g.u,g.Wl,o.O5,r.yS],styles:[".back[_ngcontent-%COMP%]{height:100%}.back[_ngcontent-%COMP%], .back[_ngcontent-%COMP%]:hover, .back[_ngcontent-%COMP%]:link{color:#fff;-webkit-text-decoration:#fff;text-decoration:#fff}#main[_ngcontent-%COMP%]{min-height:calc(100% - 96px - 50px)}"]}),e})();const v=function(e){return[e]};let Z=(()=>{class e{constructor(e,t,n){this.authService=e,this.router=t,this.titleService=n,this.error="",this.loginForm=new g.cw({email:new g.NI(""),password:new g.NI(""),remember:new g.NI(!1)})}ngOnInit(){this.titleService.setTitle("Ingresar | ACTION HUMAN CAPITAL CONSULTING"),this.router.url.includes("personal")?this.tipo="/personal":this.router.url.includes("empresa")?this.tipo="/empresa":this.router.navigate(["/personal"])}googleSignIn(){this.authService.SigninWithGoogle(this.tipo)}facebookSignIn(){this.authService.SigninWithFacebook(this.tipo)}}return e.\u0275fac=function(t){return new(t||e)(a.Y36(u.e),a.Y36(r.F0),a.Y36(p.Dx))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-login"]],decls:15,vars:3,consts:[["id","main",1,"container"],[1,"row"],[1,"col-md-7","col-lg-8","mx-auto"],[1,"card","border-0","shadow","rounded-3","my-5"],[1,"card-body","p-4","p-sm-5"],[1,"col"],[1,"card-title","text-center","mb-5","fw-light","fs-5"],["role","button",1,"btn","btn-google","rounded-pill","btn-block",3,"click"],["src","https://img.icons8.com/material-sharp/24/ffffff/google-logo.png",1,"mr-2",2,"margin-bottom","3px"],[1,"my-4"],["role","button",1,"btn","btn-outline-success","rounded-pill","btn-block",3,"routerLink"]],template:function(e,t){1&e&&(a.TgZ(0,"div",0),a.TgZ(1,"div",1),a.TgZ(2,"div",2),a.TgZ(3,"div",3),a.TgZ(4,"div",4),a.TgZ(5,"div",1),a.TgZ(6,"div",5),a.TgZ(7,"h5",6),a._uU(8," Ingresar "),a.qZA(),a.TgZ(9,"a",7),a.NdJ("click",function(){return t.googleSignIn()}),a._UZ(10,"img",8),a._uU(11," INGRESAR CON GOOGLE "),a.qZA(),a._UZ(12,"hr",9),a.TgZ(13,"a",10),a._uU(14," INGRESAR CON EMAIL "),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA()),2&e&&(a.xp6(13),a.Q6J("routerLink",a.VKq(1,v,t.tipo+"/auth/login-email")))},directives:[r.yS],styles:["body[_ngcontent-%COMP%]{background:#007bff;background:linear-gradient(90deg,#0062e6,#33aeff)}.btn-login[_ngcontent-%COMP%]{font-size:.9rem;letter-spacing:.05rem;padding:.75rem 1rem}.btn-google[_ngcontent-%COMP%]{color:#fff!important;background-color:#ea4335}.btn[_ngcontent-%COMP%]{padding:12px 24px}.btn-facebook[_ngcontent-%COMP%]{color:#fff!important;background-color:#3b5998}.back[_ngcontent-%COMP%]{height:100%}.back[_ngcontent-%COMP%], .back[_ngcontent-%COMP%]:hover, .back[_ngcontent-%COMP%]:link{color:#fff;-webkit-text-decoration:#fff;text-decoration:#fff}.hover-success[_ngcontent-%COMP%]:hover{background-color:#a8cf46}#main[_ngcontent-%COMP%]{min-height:calc(100% - 96px - 50px)}"]}),e})();var k=n(9699);let A=(()=>{class e{constructor(e,t,n,o){this.AuthService=e,this.toastr=t,this.activatedRoute=n,this.titleService=o,this.email=""}ngOnInit(){this.titleService.setTitle("Mail Enviado | ACTION HUMAN CAPITAL CONSULTING"),this.email=this.activatedRoute.snapshot.paramMap.get("email")||""}reenviarEmail(){this.AuthService.RecoverPassword(this.email).then(e=>{this.toastr.success("Mail enviado. Revisa tu correo.")},e=>{this.toastr.error("No se pudo enviar el email. Intenta mas tarde."),console.log(e)})}}return e.\u0275fac=function(t){return new(t||e)(a.Y36(u.e),a.Y36(k._W),a.Y36(r.gz),a.Y36(p.Dx))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-mail-enviado"]],decls:21,vars:1,consts:[[1,"navbar","navbar-dark","bg-dark"],["routerLink","/personal"],["aria-hidden","true",1,"fa","fa-chevron-left","fa-lg","mx-3","back"],["href","#",1,"navbar-brand","mx-auto"],["src","assets/img/ablanco.png","height","50","alt","",1,""],["id","main",1,"container"],[1,"row"],[1,"col-sm-9","col-md-7","col-lg-5","mx-auto"],[1,"card","border-0","shadow","rounded-3","my-5"],[1,"card-body","p-4","p-sm-5"],[1,"card-title","text-center","mb-5","fw-light","fs-5"],[1,"text-center"],["aria-hidden","true",1,"fa","fa-envelope-o","fa-5x"],[1,"my-4"],[1,"my-5","text-muted",2,"font-size","1rem"],[2,"cursor","pointer",3,"click"]],template:function(e,t){1&e&&(a.TgZ(0,"nav",0),a.TgZ(1,"a",1),a._UZ(2,"i",2),a.qZA(),a.TgZ(3,"a",3),a._UZ(4,"img",4),a.qZA(),a.qZA(),a.TgZ(5,"div",5),a.TgZ(6,"div",6),a.TgZ(7,"div",7),a.TgZ(8,"div",8),a.TgZ(9,"div",9),a.TgZ(10,"h5",10),a._uU(11,"Reestablecer Contrase\xf1a"),a.qZA(),a.TgZ(12,"div",11),a._UZ(13,"i",12),a.TgZ(14,"p",13),a._uU(15),a.qZA(),a.TgZ(16,"p",14),a._uU(17,"No lo recibiste? "),a.TgZ(18,"a",15),a.NdJ("click",function(){return t.reenviarEmail()}),a._uU(19,"Reenviar email"),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a._UZ(20,"app-footer")),2&e&&(a.xp6(15),a.hij("Te hemos enviado un email con las instrucciones a ",t.email,""))},directives:[r.yS,c.c],styles:["body[_ngcontent-%COMP%]{background:#007bff;background:linear-gradient(90deg,#0062e6,#33aeff)}.btn-login[_ngcontent-%COMP%]{font-size:.9rem;letter-spacing:.05rem;padding:.75rem 1rem}.btn-google[_ngcontent-%COMP%]{color:#fff!important;background-color:#ea4335}.btn-facebook[_ngcontent-%COMP%]{color:#fff!important;background-color:#3b5998}.back[_ngcontent-%COMP%]{height:100%}.back[_ngcontent-%COMP%], .back[_ngcontent-%COMP%]:hover, .back[_ngcontent-%COMP%]:link{color:#fff;-webkit-text-decoration:#fff;text-decoration:#fff}.hover-success[_ngcontent-%COMP%]:hover{background-color:#a8cf46}#main[_ngcontent-%COMP%]{min-height:calc(100% - 96px - 50px)}"]}),e})();function _(e,t){if(1&e&&(a.TgZ(0,"div",12),a._uU(1),a.qZA()),2&e){const e=a.oxw();a.xp6(1),a.hij(" ",e.error," ")}}const C=[{path:"",component:l,children:[{path:"login",component:Z,data:{animation:"login"}},{path:"login-email",component:b,data:{animation:"login-email"}},{path:"recuperar-password",component:(()=>{class e{constructor(e,t,n,o,r,i){this.authService=e,this.Router=t,this.afAuth=n,this.spinner=o,this.toastr=r,this.titleService=i,this.error="",this.loginForm=new g.cw({email:new g.NI("",[g.kI.required,g.kI.email])})}ngOnInit(){this.titleService.setTitle("Recuperar Contrase\xf1a | ACTION HUMAN CAPITAL CONSULTING")}recuperarContrasenia(){this.loginForm.valid?this.authService.RecoverPassword(this.loginForm.value.email).then(e=>{this.toastr.success("Mail enviado. Revisa tu correo."),this.Router.navigate(["/auth/mail-enviado/"+this.loginForm.value.email])},e=>{switch(e.code){case"auth/user-not-found":this.error="No hay un usuario con este email. Verifica si el email esta escrito correctamente."}console.log(e)}):this.error="El email no es valido."}}return e.\u0275fac=function(t){return new(t||e)(a.Y36(u.e),a.Y36(r.F0),a.Y36(d.zQ),a.Y36(m.t2),a.Y36(k._W),a.Y36(p.Dx))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-olvidaste-contrasenia"]],decls:14,vars:2,consts:[["id","main",1,"container"],[1,"row"],[1,"col-sm-9","col-md-7","col-lg-8","mx-auto"],[1,"card","border-0","shadow","rounded-3","my-5"],[1,"card-body","p-4","p-sm-5"],[1,"card-title","text-center","mb-5","fw-light","fs-5"],[3,"formGroup","ngSubmit"],[1,"form-floating","mb-3"],["type","email","formControlName","email","id","floatingInput","placeholder","Email",1,"form-control"],["class","alert alert-danger","role","alert",4,"ngIf"],[1,"d-grid"],["type","submit",1,"btn","btn-success","btn-login","text-uppercase","fw-bold"],["role","alert",1,"alert","alert-danger"]],template:function(e,t){1&e&&(a.TgZ(0,"div",0),a.TgZ(1,"div",1),a.TgZ(2,"div",2),a.TgZ(3,"div",3),a.TgZ(4,"div",4),a.TgZ(5,"h5",5),a._uU(6,"Recuperar contrase\xf1a"),a.qZA(),a.TgZ(7,"form",6),a.NdJ("ngSubmit",function(){return t.recuperarContrasenia()}),a.TgZ(8,"div",7),a._UZ(9,"input",8),a.qZA(),a.YNc(10,_,2,1,"div",9),a.TgZ(11,"div",10),a.TgZ(12,"button",11),a._uU(13,"Recuperar Contrase\xf1a"),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA()),2&e&&(a.xp6(7),a.Q6J("formGroup",t.loginForm),a.xp6(3),a.Q6J("ngIf",t.error))},directives:[g._Y,g.JL,g.sg,g.Fj,g.JJ,g.u,o.O5],styles:["body[_ngcontent-%COMP%]{background:#007bff;background:linear-gradient(90deg,#0062e6,#33aeff)}.btn-login[_ngcontent-%COMP%]{font-size:.9rem;letter-spacing:.05rem;padding:.75rem 1rem}.btn-google[_ngcontent-%COMP%]{color:#fff!important;background-color:#ea4335}.btn-facebook[_ngcontent-%COMP%]{color:#fff!important;background-color:#3b5998}.back[_ngcontent-%COMP%]{height:100%}.back[_ngcontent-%COMP%], .back[_ngcontent-%COMP%]:hover, .back[_ngcontent-%COMP%]:link{color:#fff;-webkit-text-decoration:#fff;text-decoration:#fff}.hover-success[_ngcontent-%COMP%]:hover{background-color:#a8cf46}#main[_ngcontent-%COMP%]{min-height:calc(100% - 96px - 50px)}"]}),e})(),data:{animation:"recuperar-password"}},{path:"mail-enviado/:email",component:A,data:{animation:"mail-enviado/:email"}},{path:"register",loadChildren:()=>n.e(585).then(n.bind(n,6585)).then(e=>e.RegisterModule),data:{animation:"register"}}]}];let T=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[r.Bz.forChild(C)],r.Bz]}),e})();var O=n(4466);let x=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[o.ez,T,r.Bz,g.UX,O.m]]}),e})()}}]);