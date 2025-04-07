import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-e-com-components',
  imports: [CommonModule],
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsComponent {}
