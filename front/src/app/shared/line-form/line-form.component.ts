import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-line-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './line-form.component.html',
  styleUrl: './line-form.component.scss'
})
export class LineFormComponent {
  @Input() lines: any[] = [{}];
  @Input() type: any; // replace 'any' with the actual type

  @Output() linesChange = new EventEmitter<any[]>();


  addLine() {
    const lastLine = this.lines[this.lines.length - 1]; // Get the last line
    const newLine = { ...lastLine }; // Create a copy of the last line
    this.lines.push(newLine); // Push the copy to the lines array
    console.log(this.lines);

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
