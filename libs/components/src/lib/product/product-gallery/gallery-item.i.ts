export interface GalleryItem {
  id: string | number;
  type: 'image' | 'video' | '3d';
  src: string;
  alt?: string;
  thumbnailSrc?: string;

  // video
  videoAutoplay?: boolean;
  videoMuted?: boolean;
  videoLoop?: boolean;
  videoControls?: boolean;
  videoPreload?: 'auto' | 'metadata' | 'none';
}
