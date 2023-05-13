import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  baseapi ="https://fakestoreapi.com/";
  getAllProduct(){
     return this.http.get( this.baseapi +'products')
  }

  getAllCategories(){
    return this.http.get(this.baseapi +'products/categories')
  }

  getProductByCategory(category :string){
    return this.http.get(this.baseapi+'products/category/'+ category)
  }

  getproductbyid(id:number){
    return this.http.get(this.baseapi+'products/' + id)
  }
}
