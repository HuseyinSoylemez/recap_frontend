import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { FavoriteItem } from 'src/app/models/favoriteItem';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  favoriteItems:FavoriteItem[]=[];
  constructor(private favoriteService:FavoriteService,
    private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.getFavorite();
  }
  getFavorite(){
    this.favoriteItems = this.favoriteService.list();
  }
  removeFromFavorite(car:CarDetailDto){
    this.favoriteService.removeFromFavorite(car);
    this.toastrService.error(car.brandName+" " +car.carName + " favorilerinizden kaldırıldı", "Kaldırıldı")
  }
}
