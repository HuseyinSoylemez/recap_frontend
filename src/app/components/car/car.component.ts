import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';
import { CardetaildtoService } from 'src/app/services/cardetaildto.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carsDetailDto:CarDetailDto[]=[];
  dataLoaded=false;
  constructor(private carService: CarService,private carDetailDtoService:CardetaildtoService) {}

  ngOnInit(): void {
    this.getCars();
    this.getCarDetails();
  }
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data
      console.log(response)
    })    
  }
  getCarDetails(){
    this.carDetailDtoService.getCarDetails().subscribe(response=>{
      this.carsDetailDto=response.data;
      this.dataLoaded=true;
    })
  }
}
