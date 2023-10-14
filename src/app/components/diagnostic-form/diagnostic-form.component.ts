import {Component, OnInit, OnDestroy} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import {DictionaryService} from "../../services/dictionary.service";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  takeUntil, Subject, Observable,
} from "rxjs";
import {MatOptionSelectionChange} from '@angular/material/core';
import {Condition, IObjEncounter, Option} from '../../interfaces/interfaces'
import {v4 as uuidv4} from 'uuid';


@Component({
  selector: 'app-diagnostic-form',
  templateUrl: './diagnostic-form.component.html',
  styleUrls: ['./diagnostic-form.component.scss'],

})

export class DiagnosticFormComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  currentDate: Date | string = '';
  rowForm!: FormGroup
  diagForm!: FormGroup
  options$: Observable<Option[]> | undefined
  upDataEncounter!: IObjEncounter | {}
  upConditions!: Condition[]
  selectedOption: Option | null = null;


  constructor(
    private fb: FormBuilder,
    private dictionaryService: DictionaryService,
  ) {
  }


  ngOnInit() {
    this.currentDate = new Date();

    this.diagForm = this.fb.group({
      currentDate: '',
      selectedDate: [
        this.currentDate,
        [Validators.required, this.dateValidator(this.currentDate)],
      ],
      rows: this.fb.array([]),
    });


    this.addDiagnose();

    this.options$ = this.diagForm.get('rows')?.valueChanges
      .pipe(
        startWith([]),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((rows: { options: any; }[]): any[] => {
          const optionValues = rows.map(row => row.options)

          let therm = optionValues[optionValues.length - 1];


          if (therm && therm.length > 2) {
            // @ts-ignore
            return this.dictionaryService.search(therm)
          } else
            // @ts-ignore
            return this.dictionaryService.search()


        }),

        map((options: any[]): Option[] => {
          return (options || []).map(option => {
            return {
              value: option.name || '',
              ...option
            } as Option;
          });
        }),

        takeUntil(this.destroy$)
      );


  }

  get selectedDate(): FormControl {
    return this.diagForm.get('selectedDate') as FormControl;
  }

  get arrayOfInputs() {
    return this.diagForm.get('rows') as FormArray;
  }

  addDiagnose() {
    this.rowForm = this.fb.group({
      options: [''],
      comment: ['']
    });
    this.arrayOfInputs.push(this.rowForm);
  }


  roundToDate(date: Date) {
    const rounded = new Date(date);
    rounded.setHours(0, 0, 0, 0);
    if (rounded.getTime() < date.getTime()) {
      rounded.setDate(rounded.getDate());
    }
    return rounded;
  }

  dateValidator(minDate: Date) {
    return (control: { value: Date }) => {
      const selectedDate = control.value;
      if (selectedDate && selectedDate < this.roundToDate(minDate)) {
        return {minDateViolation: true};
      }
      return null;
    };
  }


  selectionChange(event: MatOptionSelectionChange, option: Option) {

    let tmpUpConditions!: Condition[]

    if (event.isUserInput) {

      tmpUpConditions = [
        {
          id: uuidv4(),
          context: {
            identifier: {
              type: {coding: [{system: 'eHealth/resources', code: ''}]},
              value: option.id,
            },
          },
          code: {coding: [{system: 'eHealth/ICPC2/condition_codes', code: option.code}]},
          notes: this.diagForm.getRawValue().rows[0]['comment'],
          onset_date: '',
        },
      ]

      if (this.upConditions) {
        this.upConditions = this.upConditions.concat(tmpUpConditions);
      } else
        this.upConditions = tmpUpConditions
      this.selectedOption = option;
    }
  }

  handleDataEncounter(date: string, rows: { options: string; comment: string }[]) {
    let tmpConditions: Condition[]
    if (!rows[0]?.options) {

      tmpConditions = []
    } else

      tmpConditions = this.upConditions.map((item, index) => {
        return {
          ...item,
          notes: rows[index].comment,
          onset_date: date,
        };
      })


    this.upDataEncounter = {
      encounter: {date: date},
      conditions: [tmpConditions]
    };
  }


  onSubmit() {
    if (this.diagForm.valid) {
      const isoDate = this.diagForm.get('selectedDate')!.value.toISOString();
      let row = this.diagForm.value.rows
      this.handleDataEncounter(isoDate, row)
    } else {
      console.log('Помилка');
    }

    this.diagForm.reset({
      currentDate: '',
      selectedDate: '',
      rows: []
    });
  }

  ngOnDestroy() {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
}
