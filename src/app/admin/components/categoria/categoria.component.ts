import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/core/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  categorias: any = [];
  categoriaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    detalle: new FormControl(''),
  })

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.listaCategorias()
  }

  listaCategorias(){
    this.categoriaService.listarCategorias().subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (error: any) => {
        console.log(error);
      }
    )

  }

  enviarCategoria(){
    this.categoriaService.guardarCategoria(this.categoriaForm.value).subscribe(
      (res: any) => {
        this.listaCategorias()
      },
      (error: any) => {
        console.log(error);
      }
    )
    
  }

  mostrarCategoria(){
    
  }

  actualizarCategoria(){

  }

  eliminarCategoria(){

  }

}
