import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-probes-graph',
  standalone: true,
  imports: [],
  templateUrl: './probes-graph.component.html',
  styleUrl: './probes-graph.component.scss'
})
export class ProbesGraphComponent {
  @Input() chartName:string|undefined;

}
