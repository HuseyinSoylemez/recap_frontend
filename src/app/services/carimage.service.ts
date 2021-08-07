import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

type NewType = Observable<ListResponseModel<CarImage>>;

@Injectable({
  providedIn: 'root'
})
export class CarimageService {

  apiUrl="https://localhost:44329/api/";

  constructor(private httpClient:HttpClient) { }

  getAllImage():NewType
  {
    let newPath=this.apiUrl+"carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  };


  getImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>
  {
    let newPath=this.apiUrl+"carimages/getbyid?id="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  };
  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>
  {
    let newPath=this.apiUrl+"carimages/getimagesbycarid?id="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  };

}
