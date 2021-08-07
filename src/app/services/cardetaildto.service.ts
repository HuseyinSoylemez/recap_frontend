import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailDto } from '../models/carDetailDto';
import { CarImage } from '../models/carImage';

import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CardetaildtoService {

  apiUrl = "https://localhost:44329/api/";

  constructor(private httpClient: HttpClient) { }

  getCarDetails(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath=this.apiUrl+"cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
}

getDetailsById(carId : number):Observable<ListResponseModel<CarDetailDto>>{
  let newPath = this.apiUrl + "cars/getbyid?id="+ carId;
  return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
}
getDetailsByCarId(carId : number):Observable<ListResponseModel<CarDetailDto>>{
  let newPath = this.apiUrl + "cars/getcardetailsbycarid?id="+ carId;
  return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
}
getCarsByBrand(brandId:number): Observable<ListResponseModel<CarDetailDto>> {
  let newPath=this.apiUrl+"cars/getcardetailsbybrandid?id="+brandId
  return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
}
getCarsByColor(colorId:number): Observable<ListResponseModel<CarDetailDto>> {
  let newPath=this.apiUrl+"cars/getcardetailsbycolorid?colorid="+colorId
  return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
}
getCarImagesById(carId:number):Observable<ListResponseModel<CarImage>> {
  let newPath=this.apiUrl+"carimages/getimagesbycarid?id"+carId;
  return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
}

}
