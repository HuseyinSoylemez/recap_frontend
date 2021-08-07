import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Car } from '../models/car';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = "https://localhost:44329/api/";

  constructor(private httpClient: HttpClient) { }

//   getCars(): Observable<ListResponseModel<Car>> {
//     let newPath=this.apiUrl+"cars/getall"
//     return this.httpClient.get<ListResponseModel<Car>>(newPath);
// }
getCars():Observable<ListResponseModel<Car>> {
  let newURL = this.apiUrl + "cars/getall";
  return this.httpClient.get<ListResponseModel<Car>>(newURL)
}

getCarDetails(): Observable<ListResponseModel<CarDetailDto>> {
  let newPath=this.apiUrl+"cars/getcardetails";
  return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
}
getDetailsById(carId : number):Observable<ListResponseModel<CarDetailDto>>{
  let newPath = this.apiUrl + "cars/getcardetailsbycarid?id="+ carId;
  return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
}
getCarsById(carId:number): Observable<ListResponseModel<Car>> {
  let newPath=this.apiUrl+"cars/getbyid?id="+carId
  return this.httpClient.get<ListResponseModel<Car>>(newPath);
}
getCarsByBrand(brandId:number): Observable<ListResponseModel<Car>> {
  let newPath=this.apiUrl+"cars/getcarsbybrandid?brandid="+brandId
  return this.httpClient.get<ListResponseModel<Car>>(newPath);
}
getCarsByColor(colorId:number): Observable<ListResponseModel<Car>> {
  let newPath=this.apiUrl+"cars/getbycolorid?colorid="+colorId
  return this.httpClient.get<ListResponseModel<Car>>(newPath);
}

}
