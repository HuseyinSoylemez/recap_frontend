import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colors:Color[]=[];
  colorAddForm : FormGroup;


  constructor(private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {

    this.createColorAddForm();
  }


  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorId:[Validators.required],
      colorName:["",Validators.required]
    })
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({},this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response=>{
        this.toastrService.success("Renk eklendi","Başarılı")
        this.back();
        console.log("geri döndü")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
                   this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
                   console.log(responseError.error.Errors[i].ErrorMessage);

        }
      }

    })

    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }

  }





  back(){

    this.router.navigate(["colors/list"])
    window.location.reload();
  }

}
