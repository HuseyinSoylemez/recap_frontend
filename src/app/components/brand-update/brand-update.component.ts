import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm : FormGroup;
  brand:Brand;
  brandId:number;
  brandName:string;

  constructor(private brandService:BrandService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router) { }

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
      console.log( response.data[0])
    })
  }

  createBrandForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandId:["",Validators.required],
      brandName:["",Validators.required]
    });
  }

  update(){
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.backToList();
      }
      ,
      (responseError)=>
      {
            this.toastrService.error("Bu işleme yetkiniz yoktur.","Doğrulama hatası")
            console.log(responseError);

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
