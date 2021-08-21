import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm : FormGroup;
  colors:Color[]=[];
  color:Color;
  colorId:number;
  colorName:string;

  constructor(private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

      if(params["colorId"]){
        this.getByColorId(params["colorId"])
        this.createColorForm();
      }
    })
  }

  getByColorId(colorId:number){
    this.colorService.getByColorId(this.activatedRoute.snapshot.params["colorId"]).subscribe(response=>{
      this.color = response.data[0];
      this.colorId =this.color.colorId
      this.colorName = this.color.colorName
      console.log(response.data[0])
    })
  }

  createColorForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId:["",Validators.required],
      colorName:["",Validators.required]
    });
  }

  update(){
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe(response=>{
        this.toastrService.success("Renk güncellendi","Başarılı")
        this.backToList();
      }
      ,
      (responseError)=>
      {
            this.toastrService.error(responseError.error.Message,"Doğrulama hatası")
            console.log(responseError);
      }
      );
    } else {
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

  backToList(){
    this.router.navigate(["colors/list"])
  }

}
