import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';

export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  originalPrice?: number;
  discountedPrice?: number;
  discountPercentage?: number; // ví dụ 31% => discountPercentage = 31
}

@Component({
  selector: 'ngx-e-com-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnDestroy, AfterViewInit {
  @Input({ required: true }) product!: Product;
  @Input() badges: string[] = [];

  @ViewChild('scrollingContent', { static: false })
  scrollingContent!: ElementRef;

  private player?: AnimationPlayer;
  private destroy = false;

  constructor(private builder: AnimationBuilder) {}

  ngAfterViewInit(): void {
    this.startScrollingAnimation();
  }

  startScrollingAnimation() {
    if (!this.scrollingContent) return;

    const animation: AnimationFactory = this.builder.build([
      style({ transform: 'translateX(0%)' }),
      animate('15s linear', style({ transform: 'translateX(-50%)' })),
    ]);

    const element = this.scrollingContent.nativeElement;
    this.player = animation.create(element);
    this.player.onDone(() => {
      if (!this.destroy) {
        element.style.transform = 'translateX(0%)';
        this.startScrollingAnimation();
      }
    });

    this.player.play();
  }

  ngOnDestroy(): void {
    this.destroy = true;
    this.player?.destroy();
  }
}
