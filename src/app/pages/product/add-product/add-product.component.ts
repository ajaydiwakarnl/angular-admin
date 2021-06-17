import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductItem, ProductService} from '../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../notification.service';
import {MapsAPILoader} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';
import {environment as env} from '../../../../environments/environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, AfterViewInit {
  productSubmitted = false;
  productForm: FormGroup;
  id: any;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  fileToUpload: File;
  src: any;
  productDetails: ProductItem;

  constructor(
    public formBuilder: FormBuilder,
    public productService: ProductService,
    public route: Router,
    public toast: NotificationService,
    private activRoute: ActivatedRoute,
    public mapApiLoader: MapsAPILoader,
    private ngZone: NgZone,
    private httpClient: HttpClientModule,
  ) {}


  @ViewChild('search')
  public searchElementRef: ElementRef;

  initializeFormGroup() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      allow_product_condition: [false],
      condition: ['', ],
      category: ['', [Validators.required]],
      sub_category: ['', [Validators.required]],
      child_category: ['', [Validators.required]],
      allow_product_size: [false],
      size_name: ['', ],
      size_price: ['', ],
      size_qty: ['', ],
      allow_product_whole_sell: [false],
      whole_sale_qty: [''],
      whole_sale_discount: [''],
      stock: ['', [Validators.required]],
      description: ['', [Validators.required]],
      youtube_url: [''],
      image: ['', this.id ? [] : [Validators.required]],
      allow_estimation_shiping_time: [false],
      estimate_shipping_time: [''],
      return_policy: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      price : ['', [Validators.required]],
    });

    this.setConditionalValidations('allow_product_condition', 'condition', [Validators.required]);
    this.setConditionalValidations('allow_estimation_shiping_time', 'estimate_shipping_time', [Validators.required]);
    this.setConditionalValidations('allow_product_size', 'size_name', [Validators.required]);
    this.setConditionalValidations('allow_product_size', 'size_qty', [Validators.required]);
    this.setConditionalValidations('allow_product_size', 'size_price', [Validators.required]);
  }

  ngOnInit() {
    this.id = this.activRoute.snapshot.params['id'];
    this.initializeFormGroup();
    if (this.id !== undefined) {
      this.productService.getProductById(this.id).toPromise().then(response => {
        this.productDetails = response.data;
        this.src = 'http://localhost:2000/product/images/' + this.productDetails?.image;

        this.productForm.controls['name'].setValue(this.productDetails?.name);
        this.productForm.controls['sku'].setValue(this.productDetails?.sku);
        this.productForm.controls['allow_product_condition'].setValue(!!this.productDetails?.condition);
        this.productForm.controls['condition'].setValue(this.productDetails?.condition);
        this.productForm.controls['category'].setValue(this.productDetails?.category);
        this.productForm.controls['sub_category'].setValue(this.productDetails?.sub_category);
        this.productForm.controls['child_category'].setValue(this.productDetails?.child_category);
        this.productForm.controls['allow_product_size'].setValue(!!this.productDetails?.size_name);
        this.productForm.controls['size_name'].setValue(this.productDetails?.size_name);
        this.productForm.controls['size_price'].setValue(this.productDetails?.size_price);
        this.productForm.controls['size_qty'].setValue(this.productDetails?.size_qty);
        this.productForm.controls['allow_product_whole_sell'].setValue(!!this.productDetails?.whole_sale_qty);
        this.productForm.controls['whole_sale_qty'].setValue(this.productDetails?.whole_sale_qty);
        this.productForm.controls['whole_sale_discount'].setValue(this.productDetails?.whole_sale_discount);
        this.productForm.controls['stock'].setValue(this.productDetails?.stock);
        this.productForm.controls['description'].setValue(this.productDetails?.description);
        this.productForm.controls['youtube_url'].setValue(this.productDetails?.youtube_url);
        this.productForm.controls['allow_estimation_shiping_time'].setValue(!!this.productDetails?.estimate_shipping_time);
        this.productForm.controls['estimate_shipping_time'].setValue(this.productDetails?.estimate_shipping_time);
        this.productForm.controls['return_policy'].setValue(this.productDetails?.return_policy);
        this.productForm.controls['address'].setValue(this.productDetails?.address);
        this.productForm.controls['city'].setValue(this.productDetails?.city);
        this.productForm.controls['country'].setValue(this.productDetails?.country);
        this.productForm.controls['postal_code'].setValue(this.productDetails?.postal_code);
        this.productForm.controls['price'].setValue(this.productDetails?.price);
        this.productForm.controls['image'].setValue(this.productDetails?.image);
      });
    }
  }

  ngAfterViewInit() {
    // Map Logic
    this.mapApiLoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      console.log(autocomplete);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

  }

  setConditionalValidations(dependsOn, control, validators) {
    this.productForm.get(dependsOn).valueChanges.subscribe(value => {
      this.productForm.get(control).setValidators(value ? validators : null);
      this.productForm.get(control).updateValueAndValidity();
    });
  }

  get productControlName() {
    return this.productForm.controls;
  }

  getFormData() {
    const formValue = this.productForm.value;
    const payload = new FormData();
    Object.keys(formValue).forEach(k => {
      payload.append(k, formValue[k]);
    });
    payload.append('image', this.fileToUpload);
    return payload;
  }

  saveProduct() {
    this.productSubmitted = true;
    if (this.productForm.invalid) {
      console.log(this.productForm.value);
      return;
    } else {
      const serviceCall = !this.id ? 'saveProduct' : 'updateProduct';
      this.productService[serviceCall](this.id, this.getFormData()).subscribe(res => {
        console.log(res);
        if (res.success === true) {
          this.route.navigate(['/admin/product']);
          this.toast.showSuccess(res.message, 'Success');
        } else {
          this.toast.showError(res.message, 'Error');
        }
      });
    }
  }



  checkValueExist(dependsOn, control) {
    if (this.productForm.get(dependsOn)) {
      this.productForm.get(control).setValue('checked');
    }
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      }));
    }
  }

  private getAddress(latitude, longitude) {
    this.geoCoder.geocode({'location': {lat: latitude, lng: longitude}}, (results, status) => {
      if (results[0]) {
        this.zoom = 12;
        this.address = results[0].formatted_address;
      } else {
        console.log('No Records Found');
      }
    });
  }

  // File Upload
  handleFileInput(files) {
    this.fileToUpload = files.target.files[0];
    console.log(this.fileToUpload);
  }
}
