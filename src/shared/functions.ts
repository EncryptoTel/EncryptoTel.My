import {FormGroup} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';

export function  FadeAnimation(time: string) {
  return trigger('Fade', [
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate(`${time} ease-in`, style({opacity: 1}))
    ]),
    transition(':leave', [
      style({
        opacity: 1
      }),
      animate(`${time} ease-out`, style({opacity: 0}))
    ])
  ]);
}

export function SwipeAnimation(axis: 'x' | 'y', time: string) {
  switch (axis) {
    case 'x': {
      return trigger('Swipe', [
        transition(':enter', [
          style({
            width: 0
          }),
          animate(`${time} ease-in`)
        ]),
        transition(':leave', [
          animate(`${time} ease-out`, style({width: 0}))
        ])
      ]);
    }
    case 'y': {
      return trigger('Swipe', [
        transition(':enter', [
          style({
            height: 0
          }),
          animate(`${time} ease-in`)
        ]),
        transition(':leave', [
          animate(`${time} ease-out`, style({height: 0}))
        ])
      ]);
    }
    default: {
      break;
    }
  }
}

export function validateForm(form: FormGroup): void {
  form.updateValueAndValidity();
  Object.keys(form.controls).forEach(field => {
    const control = form.get(field);
    control.markAsTouched();
  });
}


export function inputValidation(form: FormGroup, name: string, errorType?: string): boolean {
  if (errorType) {
    const field = form.controls[name];
    return field && field.errors[errorType] && (field.dirty || field.touched);
  } else {
    const field = form.controls[name];
    return field && field.invalid && (field.dirty || field.touched);
  }
}
