import { Component , OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})

export class AllProductsComponent implements OnInit{

  products:any[] = []
  categories:any[] = []
  cartproduct:any[]= []
  load :boolean = false
  constructor(private service:ProductsService){

  }
  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }

  getProducts(){
    this.load=true
    this.service.getAllProduct().subscribe((res:any) =>{
      this.products= res
      this.load=false
       console.log(res)
    } , error =>{
      alert("Error")
      this.load=false
      console.log(error)
    } )

  }

  getCategories(){
    this.load=true
    this.service.getAllCategories().subscribe((cat:any)=>{
      console.log(cat)
      this.categories=cat
      this.load=false
    } , error =>{
      alert("Error")
      this.load=false
      console.log("error in categories")
    })
  }


  filterCategory(event:any){
   let value = event.target.value;
   console.log(value);
   if(value==="All"){
    this.getProducts();
    console.log("hiiiiii")
   }
   else{
   this.getCategoryProduct(value);
   }
  }

  getCategoryProduct(cat:string ){
    this.load=true
    this.service.getProductByCategory(cat).subscribe((res:any)=>{
    console.log(res)    
    this.products=res;
    this.load=false
   } , error=>{
    this.load=false
    alert("Error")
   })
  }


  addToCart(event:any){
    console.log(event);
    if("cart" in localStorage ){
      this.cartproduct=JSON.parse(localStorage.getItem("cart")!)
      let findproduct = this.cartproduct.find(i=>i.item.id == event.item.id)
      if (findproduct){
        alert(" this product already added to cart ")
      }
      else{
      this.cartproduct.push(event)       
      localStorage.setItem("cart" , JSON.stringify(this.cartproduct))
      }
    }
    else{
      this.cartproduct.push(event)
      localStorage.setItem("cart" , JSON.stringify(this.cartproduct))
    }
    
}
}
