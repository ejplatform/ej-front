import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash'

@Component({
  selector: 'app-slider-modal',
  templateUrl: './slider-modal.component.html',
  styleUrls: ['./slider-modal.component.css'],
})
export class SliderModalComponent implements OnInit {

  title: string;
  details: string;
  content: string;
  bsModalRef: NgbActiveModal;
  
  constructor( public activeModal: NgbActiveModal) {
    this.bsModalRef = activeModal;
  }
    
  ngOnInit() {
    setTimeout(() => {
        if(this.content === 'plataforms'){
          this.plataformsText();
        }
        else if(this.content === 'writers'){
          this.writersText();
        }
        else if(this.content === 'cities'){
          this.citiesText();
        }
      },
    0);
  }

  plataformsText(){
    this.title = 'Plataforma'
    this.details = `<p>Para ampliar a possibilidade de participação, a FPA lançou mão de uma ferramenta que pode ser 
      acessada em qualquer lugar do Brasil.</p><p> É muito fácil: você só precisa acessar um computador ou smartphone. 
      Funciona assim: basta se cadastrar na plataforma (pelo Facebook, Twitter ou cadastro simplificado 
      na própria plataforma) e participar das conversas abertas, que falarão de diferentes assuntos selecionados 
      pela Fundação Perseu Abramo. Opinar é bem simples. Seja pelo celular ou pelo computador você só precisa clicar se 
      concorda ou discorda nas opiniões que forem aparecendo ou incluir suas próprias ideias para os outros participantes 
      opinarem.</p><p> A partir de outubro será possível sugerir os temas das próximas conversas!</p>`
  }

  writersText(){
    this.title = 'Relatores'
    this.details = `<p>A FPA está mobilizando acadêmicos e ativistas de movimentos sociais com histórico de atuação nos eixos 
    temáticos propostos para formar grupos de estudo.</p>
    <p>Estes grupos estarão atentos ao que será produzido na Plataforma Digital de Participação, proporão debates, e 
    produzirão conteúdo, informação e dados para ajudar na formulação de opiniões dos participantes. Além disso, estarão 
    responsáveis pela sistematização das opiniões ao final do processo.</p>
    <p>Todos os encontros deste grupo serão transmitidos ao vivo.</p>`    
  }


  citiesText(){
    this.title = 'Cidades'
    this.details = `<p>Para ampliar a possibilidade de participação, a FPA lançou mão de uma ferramenta que pode ser 
      acessada em qualquer lugar do Brasil.</p><p> É muito fácil: você só precisa acessar um computador ou smartphone. 
      Funciona assim: basta se cadastrar na plataforma (pelo Facebook, Twitter ou cadastro simplificado 
      na própria plataforma) e participar das conversas abertas, que falarão de diferentes assuntos selecionados 
      pela Fundação Perseu Abramo. Opinar é bem simples. Seja pelo celular ou pelo computador você só precisa clicar se 
      concorda ou discorda nas opiniões que forem aparecendo ou incluir suas próprias ideias para os outros participantes 
      opinarem.</p><p> A partir de outubro será possível sugerir os temas das próximas conversas!</p>`
  }

}
