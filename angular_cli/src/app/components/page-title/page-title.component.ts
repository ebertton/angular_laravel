import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent {
  //POR PADRÃO CASO NÃO SEJA PASSADO NENHUM TITULO ATRAVÉS DO COMPONENT PAI, ELE VAI RECEBER COMO PADRÃO O 'Título da página'
    @Input() title = 'Título da página';
}
