import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
  QueryList,
  Signal,
  signal,
  ViewChild,
  ViewChildren,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, filter, Subject } from 'rxjs';
import { GalleryItem } from './gallery-item.i';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'ngx-e-com-product-gallery',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-gallery.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ProductGalleryComponent implements OnInit, AfterViewInit {
  @Input({ required: true })
  set items(items: GalleryItem[]) {
    this._items.set(items);
    this.selectedIndex.set(0);
    setTimeout(() => {
      this.adjustThumbnailContainerWidth();
      this.scrollToSelectedIndex(false);
      this.cdr.markForCheck(); // Trigger change detection
    }, 0);
  }
  get items(): WritableSignal<GalleryItem[]> {
    return this._items;
  }
  @Input() isLoop = true;

  @ViewChild('thumbnailContainer')
  thumbnailContainerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('thumbnailStrip') thumbnailStripRef!: ElementRef<HTMLDivElement>;
  @ViewChildren('thumbnailButton') thumbnailButtonRefs!: QueryList<
    ElementRef<HTMLButtonElement>
  >;
  @ViewChild('mainVideoElement')
  mainVideoElementRef?: ElementRef<HTMLVideoElement>;

  destroyRef = inject(DestroyRef);
  cdr = inject(ChangeDetectorRef);

  _items = signal<GalleryItem[]>([]);
  validItems = computed(() => this.items() && this.items().length > 0);
  selectedIndex = signal(0);
  selectedItem: Signal<GalleryItem | undefined> = computed(() => {
    if (this.items().length) {
      this.pauseCurrentVideo();
      return this.items()[this.selectedIndex()];
    } else {
      return;
    }
  });
  canGoPrevious: Signal<boolean> = computed(() => {
    return (
      this.items() &&
      this.items().length > 1 &&
      (this.isLoop ? true : this.selectedIndex() !== 0)
    );
  });
  canGoNext: Signal<boolean> = computed(() => {
    return (
      this.items() &&
      this.items().length > 1 &&
      (this.isLoop ? true : this.items().length - 1 > this.selectedIndex())
    );
  });

  resizeSubject$$ = new Subject<void>();

  private lastCalculatedThumbWidth = 80;

  @HostListener('window:resize')
  onResize() {
    this.resizeSubject$$.next();
  }

  ngOnInit(): void {
    this.resizeSubject$$
      .pipe(debounceTime(250), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.adjustThumbnailContainerWidth();
        this.scrollToSelectedIndex(false);
        this.cdr.markForCheck();
      });
  }

  ngAfterViewInit(): void {
    this.thumbnailButtonRefs.changes
      .pipe(
        filter(
          (queryList: QueryList<ElementRef<HTMLButtonElement>>) =>
            queryList.length > 0
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.adjustThumbnailContainerWidth();
        this.scrollToSelectedIndex(false);
        this.cdr.markForCheck();
      });

    console.log('this.ngAfterViewInit', this.thumbnailContainerRef, this.thumbnailButtonRefs, this.thumbnailButtonRefs)
    if (this.thumbnailButtonRefs.length > 0) {
      this.adjustThumbnailContainerWidth();
      this.scrollToSelectedIndex(false);
      this.cdr.markForCheck();
    }
  }

  selectItem(index: number): void {
    if (
      index >= 0 &&
      index < this.items().length &&
      this.selectedIndex() !== index
    ) {
      this.selectedIndex.set(index);
      this.scrollToSelectedIndex();
    }
  }

  previousItem(): void {
    if (!this.canGoPrevious()) return;
    let newSelectedIndex = this.selectedIndex() - 1;
    if (newSelectedIndex < 0) {
      if (this.isLoop) {
        newSelectedIndex = this.items().length - 1;
      } else {
        return;
      }
    }
    this.selectedIndex.set(newSelectedIndex);
    this.scrollToSelectedIndex();
  }

  nextItem(): void {
    if (!this.canGoNext()) return;
    let newSelectedIndex = this.selectedIndex() + 1;
    if (newSelectedIndex === this.items().length) {
      if (this.isLoop) {
        newSelectedIndex = 0;
      } else {
        return;
      }
    }
    this.selectedIndex.set(newSelectedIndex);
    this.scrollToSelectedIndex();
  }

  getThumbnailSource(item: GalleryItem): string | null {
    if (item.thumbnailSrc) {
      return item.thumbnailSrc;
    }
    if (item.type === 'image') {
      return item.src;
    }
    return null;
  }

  private scrollToSelectedIndex(smooth = true): void {
    if (
      !this.thumbnailContainerRef ||
      !this.thumbnailStripRef ||
      !this.thumbnailButtonRefs ||
      this.thumbnailButtonRefs.length === 0 ||
      this.selectedIndex() < 0 ||
      this.lastCalculatedThumbWidth <= 0
    ) {
      if (this.thumbnailStripRef?.nativeElement) {
        this.thumbnailStripRef.nativeElement.style.transform =
          'translateX(0px)';
      }
      return;
    }

    const container = this.thumbnailContainerRef.nativeElement;
    const strip = this.thumbnailStripRef.nativeElement;
    const buttons = this.thumbnailButtonRefs.toArray();
    const selectedButtonEl = buttons[this.selectedIndex()]?.nativeElement;

    if (!selectedButtonEl) return;

    const containerWidth = container.clientWidth;
    const thumbWidth = this.lastCalculatedThumbWidth;

    const buttonCenterInStrip =
      this.selectedIndex() * thumbWidth + thumbWidth / 2;
    let targetTranslateX = containerWidth / 2 - buttonCenterInStrip;

    targetTranslateX = Math.min(0, targetTranslateX);
    const stripWidth = this.items().length * thumbWidth;
    const maxTranslateX = -(stripWidth - containerWidth);

    if (stripWidth > containerWidth) {
      targetTranslateX = Math.max(maxTranslateX, targetTranslateX);
    } else {
      targetTranslateX = 0;
    }

    strip.style.transition = smooth ? 'transform 0.3s ease-in-out' : 'none';
    strip.style.transform = `translateX(${targetTranslateX}px)`;
  }

  private adjustThumbnailContainerWidth(): void {
    console.log('this.thumbnailContainerRef', this.thumbnailContainerRef, this.thumbnailButtonRefs, this.thumbnailButtonRefs)
    if (
      !this.thumbnailContainerRef ||
      !this.thumbnailButtonRefs ||
      this.thumbnailButtonRefs.length === 0
    ) {
      return;
    }

    const container = this.thumbnailContainerRef.nativeElement;
    const firstButton = this.thumbnailButtonRefs.first?.nativeElement;
    if (!firstButton) return;

    const buttonStyle = window.getComputedStyle(firstButton);
    const marginLeft = parseFloat(buttonStyle.marginLeft);
    const marginRight = parseFloat(buttonStyle.marginRight);
    const horizontalMargin = marginLeft + marginRight;

    const thumbWidthWithMargin = firstButton.offsetWidth + horizontalMargin;
    this.lastCalculatedThumbWidth = thumbWidthWithMargin;

    const availableWidth =
      container.parentElement?.clientWidth ?? container.clientWidth;

    const maxVisibleItems = Math.floor(availableWidth / thumbWidthWithMargin);
    const itemsToDisplay = Math.min(maxVisibleItems, this.items().length);
    console.log('itemsToDisplay', itemsToDisplay);
    if (itemsToDisplay > 0) {
      const calculatedWidth =
        itemsToDisplay * thumbWidthWithMargin - horizontalMargin;
      container.style.maxWidth = `${calculatedWidth}px`;
      container.style.flexGrow = '0';
    } else {
      container.style.maxWidth = '0px';
      container.style.flexGrow = '0';
    }

    this.scrollToSelectedIndex(false);
  }

  private pauseCurrentVideo(): void {
    if (
      this.mainVideoElementRef?.nativeElement &&
      !this.mainVideoElementRef.nativeElement.paused
    ) {
      this.mainVideoElementRef.nativeElement.pause();
    }
  }

  getVideoControls(item: GalleryItem): boolean {
    return item.videoControls !== undefined ? item.videoControls : true;
  }

  getVideoPreload(item: GalleryItem): 'auto' | 'metadata' | 'none' {
    return item.videoPreload || 'metadata';
  }
}
