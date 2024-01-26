import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ProbesService } from '../../core/services/probes.service';
import { Probes } from '../../core/interfaces/probes.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-probes',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './probes.component.html',
  styleUrl: './probes.component.scss'
})
export class ProbesComponent implements OnInit {
  @Input() chartName:string|undefined;


  public title:string = "Probes"
  probes: Probes[] = [];

  constructor(private probesService: ProbesService) {}

  ngOnInit(): void {
    this.probesService.getALL().subscribe((probes) => {
    this.probes = probes;
    });
  }

}
