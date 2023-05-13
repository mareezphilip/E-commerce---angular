import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private service:CartsService){

  }
  cartproduct :any = []
  total:any=0;
  success:boolean =false
  text:string=""
  ngOnInit(): void {
    this.getcartproducts()
  }

  getcartproducts(){
  if("cart" in localStorage ){
    this.cartproduct=JSON.parse(localStorage.getItem("cart")!)
  }
  this.gettotalprice()
}

  gettotalprice(){
    this.total=0;
    for(let x in this.cartproduct){
      this.total+=this.cartproduct[x].item.price * this.cartproduct[x].quantity
    }

  }
  
  detectchange(){
    localStorage.setItem("cart" , JSON.stringify(this.cartproduct))
    this.gettotalprice()
  }

  deleteproduct(index :number){
      this.cartproduct.splice(index,1)
      localStorage.setItem("cart" , JSON.stringify(this.cartproduct))
      this.gettotalprice()
  }

  deleteallcart(){
    this.cartproduct=[]
    localStorage.setItem("cart" , JSON.stringify(this.cartproduct))
    this.gettotalprice()


  }

  addcart(){
    let products = this.cartproduct.map((i:any)=>{
      return {productId:i.item.id , quantity:i.quantity }
    })
    let model = {
      userId:5,
      date:new Date(),
      products:products
    }

    this.service.createnewcart(model).subscribe(res=>
      {
        this.success=true
      })
    console.log(model)
  }

  
}

