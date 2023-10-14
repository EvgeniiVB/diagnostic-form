import {Component, Input} from '@angular/core';
import {IObjEncounter} from "../../interfaces/interfaces";

@Component({
  selector: 'app-diagnostic-response',
  templateUrl: './diagnostic-response.component.html',
  styleUrls: ['./diagnostic-response.component.scss']
})
export class DiagnosticResponseComponent {
  @Input() data: IObjEncounter | {}=''
}
