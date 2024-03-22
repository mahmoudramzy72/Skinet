import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: true }) searchTerm: ElementRef;

  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild ('search', {static: true}) searchTerm: ElementRef;

  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [

    { name: 'Alphabetical', value: 'name' },
    { name: 'Price : Low To High', value: 'priceAsc' },
    { name: 'Price : High To Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}
    {name: 'Alphabetical' , value: 'name'},
    {name: 'Price : Low To High', value: 'priceAsc'},
    {name: 'Price : High To Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {

    this.shopService.getProducts(this.shopParams).subscribe(
      (response) => {
        this.products = response.data;
        console.log('List of products', this.products);
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBrands() {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
        // console.log(this.brands);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
        // console.log(this.types);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandID: number) {
    debugger;
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      debugger;

        this.products = response.data;
        console.log(this.products)
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      }, error => { 
        console.log(error);
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
      // console.log(this.brands);
    }, error => {
      console.log(error);
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
      // console.log(this.types);
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandID : number) {
    this.shopParams.brandId = brandID;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }


  onTypeSelected(typeID: number) {

  onTypeSelected(typeID : number) {

    this.shopParams.typeId = typeID;
    this.shopParams.pageNumber = 1;

    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }


  onPageChanged(event: any) {

  onPageChanged (event: any) {

    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }



  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
