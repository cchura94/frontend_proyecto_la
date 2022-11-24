import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ProductoService } from 'src/app/core/services/producto.service';
interface Producto {
  id: number,
  nombre: string,
  precio: number,
  stock: number,
  descripcion: string,
  imagen: string,
  categoria_id?: number
}

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.scss']
})
export class NuevoPedidoComponent implements OnInit {

   products: Producto[] = [];


  totalRecords: number = 0;

  loading: boolean = false;
  carrito: any[] = []

  constructor(private productService: ProductoService) { }

  ngOnInit(): void {
    this.getProductos()
  }

getProductos(page = 1) {
    this.loading = true
    this.productService.listarProductos(page).subscribe(
      (res: any) => {
        this.products = res.data
        this.totalRecords = res.total


      },
      (error: any) => {
        console.log(error)
      }
    )

    this.loading = false
  }

  loadProductos(event: LazyLoadEvent) {
    this.loading = true;
    console.log(event.first)
    let page: number | undefined = 1;
    let limit: number | undefined = 5;

    let pagina = event.first;
    let limite = event.rows;

    if (pagina && limite) {
      page = (pagina / limite) + 1;
      limit = limite
    }

    this.getProductos(page)

    this.loading = false;

  }

  seleccionarProduct(prod: any){
    console.log(prod)
    let producto = {
      producto_id: prod.id,
      nombre: prod.nombre,
      cantidad: 1,
      precio: prod.precio

    }
    this.carrito.push(producto)
  }

}
