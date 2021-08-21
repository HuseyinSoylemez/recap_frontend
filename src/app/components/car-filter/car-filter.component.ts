import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {
  brands: Brand[];
  colors: Color[];

  filterText="";
  selectedBrand:string=null;
  selectedColor:string=null;
  constructor(  private brandService: BrandService,
    private colorService: ColorService,) { }

  ngOnInit(): void {
    this.getBrands();
        this.getColors();
  }
  checkFilterClass()
  {
    if(this.selectedBrand||this.selectedColor)
    {
      return "btn btn-primary me-3"
    }
    else
    {
      return "btn btn-primary disabled me-3"
    }
  }
  routingLink()
  {
    if(this.selectedBrand!=null&&this.selectedColor!=null)
    {
      return "/cars/brand/"+this.selectedBrand+"/color/"+this.selectedColor

    }
    else if(this.selectedBrand!=null&&this.selectedColor==null)
    {

      return "/cars/brand/"+this.selectedBrand
    }
     else if(this.selectedColor!=null&&this.selectedBrand==null)
    {
      return "/cars/color/"+this.selectedColor

    }
    else{

    return "/cars"
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

}
