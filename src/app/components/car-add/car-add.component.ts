import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm: FormGroup;
  brands:Brand[]=[]
  colors:Color[]=[]
  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }
createCarAddForm(){
this.carAddForm=this.formBuilder.group({
  brandId: ["",Validators.required],
    colorId:["",Validators.required],
    carName:["",Validators.required],
    modelYear: ["",Validators.required],
    dailyPrice: ["",Validators.required],
    description: ["",Validators.required],

})
}
add(){
  if(this.carAddForm.valid){
    let carModel = Object.assign({},this.carAddForm.value)
    this.carService.add(carModel).subscribe(response=>{
      this.toastrService.success("Araç eklendi","Başarılı")
      this.back();
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
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }
  back(){
    this.router.navigate(["cars"])
  }

}
