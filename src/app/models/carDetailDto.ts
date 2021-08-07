import { CarImage } from "./carImage";

export interface CarDetailDto{
   
    carName: string,
    brandName:string,
    colorName:string,
    dailyPrice: number
    carId : number;
    
    brandId:number;
    colorId:number;
    
    modelYear:number;
    description:string;
    carImage: CarImage[];
    imagePath : string[];
   

}