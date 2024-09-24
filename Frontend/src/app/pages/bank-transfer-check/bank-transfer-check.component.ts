import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fixWidth } from '../../functions/utils.html';

interface Movement {
  firstName: string;
  lastName: string;
  iban: string;
  amount: number;
  description: string;
}

@Component({
  selector: 'app-bank-transfer-check',
  templateUrl: './bank-transfer-check.component.html',
  styleUrls: ['./bank-transfer-check.component.css'],
})
export class BankTransferCheckComponent implements OnInit {
  @Input() dataTransfer?: Movement;

  ngOnInit() {
    fixWidth('btn-submit', 'btn-submit', 40);
  }

  onSubmit() {
    if (this.dataTransfer) {
      console.log('Form inviato', this.dataTransfer);
      // Logica di invio del bonifico (chiamata backend o altro)
    } else {
      console.log('Form non valido');
    }
  }
}
