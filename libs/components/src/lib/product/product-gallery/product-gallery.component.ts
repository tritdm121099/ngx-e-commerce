import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  Signal,
  signal
} from '@angular/core';
import { GalleryItem } from './gallery-item.i';

@Component({
  selector: 'ngx-e-com-product-gallerry',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (validItems()) {
    <div
      class="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      <div class="relative aspect-video bg-gray-200 dark:bg-gray-700">
        @if (selectedItem()!; as selected) { @switch (selected.type) { @case
        ('image') {
        <img
          [src]="selected.src"
          [alt]="selected.alt || 'Gallery image'"
          class="absolute inset-0 w-full h-full object-cover"
        />
        } @default {
        <div
          class="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400"
        >
          <span class="text-xl">Unsupported format: {{ selected.type }}</span>
        </div>
        } } }

        <div
          *ngIf="!selectedItem"
          class="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400"
        >
          No image selected
        </div>
      </div>

      <div class="p-2 sm:p-3 bg-gray-50 dark:bg-gray-900">
        <div class="flex items-center justify-between space-x-2">
          <button
            type="button"
            (click)="previousItem()"
            [disabled]="!canGoPrevious()"
            class="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div
            class="flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800 py-1"
          >
            <div class="flex space-x-2 px-1">
              <button
                *ngFor="let item of items(); let i = index"
                type="button"
                (click)="selectItem(i)"
                class="flex-shrink-0 w-16 h-10 sm:w-20 sm:h-12 rounded-md overflow-hidden focus:outline-none transition-all duration-150 ease-in-out"
                [ngClass]="{
                  'ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-gray-900':
                    i === selectedIndex(),
                  'opacity-70 hover:opacity-100': i !== selectedIndex()
                }"
                [attr.aria-current]="i === selectedIndex() ? 'true' : 'false'"
                [attr.aria-label]="'View image ' + (i + 1)"
              >
                <img
                  *ngIf="item.type === 'image'"
                  [src]="getThumbnailSource(item)"
                  [alt]="item.alt || 'Thumbnail ' + (i + 1)"
                  class="w-full h-full object-cover"
                />
                <div
                  *ngIf="item.type !== 'image'"
                  class="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400"
                >
                  {{ item.type }}
                </div>
              </button>
            </div>
          </div>

          <button
            type="button"
            (click)="nextItem()"
            [disabled]="!canGoNext()"
            class="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    } @else {
    <div class="text-center text-gray-500 dark:text-gray-400 py-10">
      No items to display in the gallery.
    </div>
    }
  `,
  styles: [``],
})
export class ProductGalleryComponent {
  @Input({ required: true, alias: 'items' }) setItems(items: GalleryItem[]) {
    console.log('aaaaa', items);
    this.items.set(items);
    this.selectedIndex.set(0);
  }
  @Input() isLoop = true;

  items = signal<GalleryItem[]>([]);
  validItems = computed(() => this.items() && this.items().length > 0);
  selectedIndex = signal(0);
  selectedItem: Signal<GalleryItem | undefined> = computed(() => {
    if (this.items().length) {
      return this.items()[this.selectedIndex()];
    } else {
      return;
    }
  });
  canGoPrevious: Signal<boolean> = computed(() => {
    return (
      this.items &&
      this.items.length > 1 &&
      (this.isLoop ? true : this.selectedIndex() !== 0)
    );
  });
  canGoNext: Signal<boolean> = computed(() => {
    return (
      this.items &&
      this.items.length > 1 &&
      (this.isLoop ? true : this.items().length - 1 > this.selectedIndex())
    );
  });

  selectItem(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.selectedIndex.set(index);
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
  }

  getThumbnailSource(item: GalleryItem): string {
    return item.thumbnailSrc || item.src;
  }
}
