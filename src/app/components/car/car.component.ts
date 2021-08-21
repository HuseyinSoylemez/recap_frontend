import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';

import { CarService } from 'src/app/services/car.service';
import { CardetaildtoService } from 'src/app/services/cardetaildto.service';
import { CarimageService } from 'src/app/services/carimage.service';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carsDetailDto:CarDetailDto[]=[];
  carImages:CarImage[];
  carId:number;
  currentCar : CarDetailDto;
  car : Car;
  imgUrl:string="https://localhost:44329";
  defaultImage="/images/dyr1.jpg";
  dataLoaded=false;
  filterText="";

  constructor(private carService: CarService,
    private carDetailDtoService:CardetaildtoService,
    private carImageService:CarimageService,

    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"]) {
        //this.getCarsByBrand(params["brandId"]);
        this.getCarsByBrandDto(params["brandId"]);

      } else if (params["colorId"]) {
        //this.getCarsByColor(params["colorId"]);
        this.getCarsByColorDto(params["colorId"]);
      }
      else if(params["carId"]){
        this.getCarDetailsById(params["carId"])
        this.getCarImagesByCarId(params["carId"])
      }
      else {

        this.getCars();
        this.getCarDetails();


      }
    })
    // this.getCars();
    // this.getCarDetails();
  }
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data;
      // console.log(response)
      this.dataLoaded=true;
    })
  }

  getCarsById(carId:number){
    this.carService.getCarsById(carId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded=true;
    })
  }
  getCarDetails(){
    this.carDetailDtoService.getCarDetails().subscribe(response=>{
      this.carsDetailDto=response.data;
      this.dataLoaded=true;

    })
  }
  getCarDetailsById(carId:number){
    this.carDetailDtoService.getDetailsById(carId).subscribe(response=>{
      this.carsDetailDto=response.data;
      this.dataLoaded=true;

    })
  }
  getCarsByBrandDto(brandId:number){
    this.carDetailDtoService.getCarsByBrand(brandId).subscribe(response=>{
      this.carsDetailDto = response.data
      this.dataLoaded=true;
    })
  }
  getCarsByColorDto(colorId:number){
    this.carDetailDtoService.getCarsByColor(colorId).subscribe(response=>{
      this.carsDetailDto = response.data
      this.dataLoaded=true;
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded=true;
    })
  }
  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded=true;
    })
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      console.log(response.data);
    });
  }

  setCurrentCar(car:CarDetailDto){
    this.currentCar=car;
  }
  getCarImagesById(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
      this.carImages = response.data;
    })
  }
}
