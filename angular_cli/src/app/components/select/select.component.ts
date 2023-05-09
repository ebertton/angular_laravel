import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() name = '';
  @Input() label = '';
  @Input() options: string[] = [];
  @Input() selectedValues: string[] = [];
  @Output() selectionChange = new EventEmitter<string>();
  // @ts-ignore
  @Input() control = new FormControl();

  ngOnInit() {
    this.control = new FormControl(this.selectedValues);

  }

  //EMISOR DE EVENTO CHANGE PARA O COMPONENTE PAI RECEBER O VALOR
  onSelectionChange() {
    this.selectionChange.emit(this.control.value);

  }
}
