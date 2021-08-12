import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from '../models/carDetailDto';
import { FavoriteItem } from '../models/favoriteItem';
import { FavoriteItems } from '../models/FavoriteItems';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  localStorage: Storage;
  constructor(
    private toastrService:ToastrService,
    
    ) { this.localStorage = window.localStorage;}

  addToFavorite(car:CarDetailDto){
    let item = FavoriteItems.find(c => c.car.carId===car.carId);
    if(item){
      this.toastrService.info(car.carName + " favorilerinizde zaten mevcut","Favorilerde ekli")
    }else{
    let favoriteItem = new FavoriteItem();
    favoriteItem.car = car;
    FavoriteItems.push(favoriteItem);
    this.toastrService.success(car.carName, "Favorilere Eklendi!");
    //this.localStorageService.set("carId", JSON.stringify(car.id));
    this.localStorage.setItem("carId", JSON.stringify(car.carId));
    }
    }
    removeFromFavorite(car:CarDetailDto){
      let item:FavoriteItem =  FavoriteItems.find(c=>c.car.carId===car.carId);
      FavoriteItems.splice(FavoriteItems.indexOf(item),1)
      //this.localStorageService.remove("carId")
      this.localStorage.removeItem("carId");
    }
  
    list():FavoriteItem[]{
      return FavoriteItems
    }
  }

  

