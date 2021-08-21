import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css']
})
export class BrandDeleteComponent implements OnInit {
  brandDeleteForm : FormGroup;
  brand:Brand;
  brandId:number;
  brandName:string;

  constructor(private brandService:BrandService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"]){
        this.getByBrandId(params["brandId"])
        this.createBrandForm();
      }
    })
  }

  getByBrandId(brandId:number){
    this.brandService.getByBrandId(this.activatedRoute.snapshot.params["brandId"]).subscribe(response=>{
      this.brand = response.data[0]
      this.brandId =this.brand.brandId
      this.brandName = this.brand.brandName
    })
  }

  createBrandForm(){
    this.brandDeleteForm = this.formBuilder.group({
      brandId:["",Validators.required]
    });
  }

  delete(){
    if (this.brandDeleteForm.valid) {
      let brandModel = Object.assign({}, this.brandDeleteForm.value);
      this.brandService.delete(brandModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.backToList();
      }
      ,
      (responseError)=>
      {
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      }
      );
    } else {
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
  backToList(){
    this.router.navigate(["brands/list"]);
  }


}
