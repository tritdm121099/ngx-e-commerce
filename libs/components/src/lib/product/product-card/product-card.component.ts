import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  originalPrice?: number;
  discountedPrice?: number;
  discountPercentage?: number;
}

@Component({
  selector: 'ngx-e-com-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() badges: string[] = [];
}
