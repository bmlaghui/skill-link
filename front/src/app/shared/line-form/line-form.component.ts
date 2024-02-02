import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-line-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-form.component.html',
  styleUrl: './line-form.component.scss'
})
export class LineFormComponent {
  @Input() lines: any[] = [];
  @Output() linesChange = new EventEmitter<any[]>();

  addLine() {
    this.lines.push(this.lines[this.lines.length - 1] || '');
    this.emitChanges();
  }

  removeLine(index: number) {
    this.lines.splice(index, 1);
    this.emitChanges();
  }

 private emitChanges() {
    this.linesChange.emit(this.lines);
  }

}
