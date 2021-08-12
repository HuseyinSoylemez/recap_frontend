import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CardetaildtoService } from 'src/app/services/cardetaildto.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  constructor(
    private carDetailDtoService:CardetaildtoService, 
    private carService:CarService,
    private carImageService:CarimageService, 
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private favoriteService:FavoriteService) { }

  carsDetailDto:CarDetailDto[]=[];
  cars:Car[]=[]; 
  car:CarDetailDto;
  currentCar : CarDetailDto;
  imgUrl:string="https://localhost:44329";
  defaultImage="/images/dyr1.jpg";
  carImages:CarImage[];
  currentImage:CarImage;

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"])
        this.getCarImagesByCarId(params["carId"])
      }
    })
  }
  addToFavorite(car:CarDetailDto){
    console.log(car);
    this.favoriteService.addToFavorite(car);
    
  }
  setCurrentCar(car:CarDetailDto){
    this.currentCar=car;
  }
getCarDetails(){
    this.carDetailDtoService.getCarDetails().subscribe(response=>{
      this.carsDetailDto=response.data;
     
      
    })
  }
  getCarDetailsByCarId(carId:number){
    this.carDetailDtoService.getDetailsByCarId(carId).subscribe(response=>{
      //this.carsDetailDto=response.data[0];
      this.car = response.data[0];
      
      
    })
  }
  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      
    });
  }

}
