import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup;
  brands:Brand[]=[]
  colors:Color[]=[]
  cars:Car[]=[]
  car:Car;
  id:number;
  carName:string;
  brandId:number;
  colorId:number;
  modelYear:number;
  dailyPrice:number;
  gearType:string;
  enginePower:string;
  fuelType:string;
  description:string;
  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService,

    private router:Router,
    private activatedRoute:ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {


      if(params["carId"]){
        this.getCarsById(params["carId"])
        this.createCarForm();
        this.getBrands();
        this.getColors();
      }
    })


  }




  // getCarsById(id:number){
  //   this.carService.getCarsById(id).subscribe(response=>{

  //     this.car = response.data[0];
  //         })
  // }
  getCarsById(carId:number){
    this.carService.getCarsById(this.activatedRoute.snapshot.params["carId"]).subscribe(response=>{

     this.car = response.data[0];

      this.id = this.car.id
      this.carName = this.car.carName
      this.brandId = this.car.brandId
      this.colorId = this.car.colorId
      this.modelYear = this.car.modelYear
      this.dailyPrice = this.car.dailyPrice

      this.description = this.car.description
    })
  }
createCarForm(){
this.carUpdateForm=this.formBuilder.group({
  id:["",Validators.required],
  brandId: ["",Validators.required],
    colorId:["",Validators.required],
    carName:["",Validators.required],
    modelYear: ["",Validators.required],
    dailyPrice: ["",Validators.required],
    description: ["",Validators.required],

})
}
update(){
  if (this.carUpdateForm.valid) {
    let carModel = Object.assign({}, this.carUpdateForm.value);
    this.carService.update(carModel).subscribe(response=>{
      this.toastrService.success("Araç güncellendi","Başarılı")
      this.back();
    }
    ,
    (responseError)=>
    {
          this.toastrService.error(responseError.error.Message,"İşlem başarısız")
          console.log(responseError);
    }
    );
  }
  else {
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
