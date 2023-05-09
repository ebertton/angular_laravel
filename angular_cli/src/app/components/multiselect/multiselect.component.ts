import {Component, EventEmitter, Input, Output, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";





@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent {
//AQUI SERIA PARA IMPLEMENTAR O MULTISELECT PARA SER REUTILIZAVEL
  @Input() name = '';
  @Input() label = '';
  @Input() options: string[] = [];
  @Input() selectedValues: string[] = [];
  @Output() selectionChange = new EventEmitter<string[]>();
  // @ts-ignore
  @Input() control = new FormControl();


  constructor() {
  }

  ngAfterViewInit() {

  }
  ngOnInit() {
    this.control = new FormControl(this.selectedValues);

  }

  onSelectionChange() {
    this.selectionChange.emit(this.control.value);

  }
}
