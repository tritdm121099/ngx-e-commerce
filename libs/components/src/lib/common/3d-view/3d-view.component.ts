import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'ngx-e-com-product-3d-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './3d-view.component.html',
  styleUrls: ['./3d-view.component.scss'],
})
export class ThreeDViewComponent implements OnInit {
  @Input({required: true}) modelUrl!: string;
  @Input() altText = '3D model';
  @Input() autoRotate = false;
  @Input() cameraControls = true;
  @Input() enableAR = false;
  @Input() environmentImage: string | null = null;
  @Input() skyboxImage: string | null = null;
  @Input() shadowIntensity = 1;
  @Input() exposure = 1;

  ngOnInit(): void {
    import('@google/model-viewer')
      .then(() => {
        console.log('model-viewer loaded.');
      })
      .catch((error) => console.error('Error loading model-viewer:', error));
  }
}
