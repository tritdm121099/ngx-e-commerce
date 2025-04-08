export interface GalleryItem {
  id: string | number;
  type: 'image' | 'video' | '3d';
  src: string;
  alt?: string;
  thumbnailSrc?: string;
}
