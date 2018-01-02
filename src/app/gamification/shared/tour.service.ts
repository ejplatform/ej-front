import { Injectable } from '@angular/core';
import { Tour } from './tour-model';

@Injectable()
export class TourService {

  nextStep(step: string){
    switch (step) {  
      case '': {
        return Tour.STEP_TWO
      }
      case Tour.STEP_TWO: {
        return Tour.STEP_THREE
      }
      case Tour.STEP_THREE: {
        return Tour.STEP_FOUR
      }
      case Tour.STEP_FOUR: {
        return Tour.STEP_FIVE
      }
      case Tour.STEP_FIVE: {
        return Tour.STEP_SIX
      }
      case Tour.STEP_SIX: {
        return Tour.STEP_SEVEN
      }
      case Tour.STEP_SEVEN: {
        return Tour.STEP_EIGHT
      }
      case Tour.STEP_EIGHT: {
        return Tour.STEP_NINE
      }
      case Tour.STEP_NINE: {
        return Tour.STEP_TEN
      }
      case Tour.STEP_TEN: {
        return Tour.STEP_ELEVEN
      }
      case Tour.STEP_ELEVEN: {
        return Tour.STEP_TWELVE
      }
      case Tour.STEP_TWELVE: {
        return Tour.STEP_THIRTEEN
      }
      case Tour.STEP_THIRTEEN: {
        return Tour.STEP_FINISH
      }
    }
  }
}
