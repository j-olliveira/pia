import { Injectable, OnChanges } from '@angular/core';

import { Router } from '@angular/router';
import * as introJs from 'intro.js/intro.js';

import { TranslateService } from '@ngx-translate/core';
import { SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class IntrojsService {
  public sectionsLoaded: Boolean = null;
  sectionsChange: Subject<any> = new Subject<any>();
  public evaluationsLoaded: Boolean = null;
  evaluationsChange: Subject<any> = new Subject<any>();

  public entrySideView = 'knowledge';
  entrySideViewChange: Subject<any> = new Subject<any>();

  constructor(private router: Router, private _translateService: TranslateService) {
    console.log('Introjs connected');

    this.sectionsChange.subscribe(bool => {
      console.log('changements sections', bool);
      this.sectionsLoaded = bool;
      this.autoSelectOnBoarding();
    });
    this.evaluationsChange.subscribe(bool => {
      console.log('changements evaluations', bool);
      this.evaluationsLoaded = bool;
      this.autoSelectOnBoarding();
    });
  }

  sections(bool) {
    this.sectionsChange.next(bool);
  }

  evaluations(bool) {
    this.evaluationsChange.next(bool);
  }

  public autoSelectOnBoarding() {
    if (this.sectionsLoaded !== null && this.evaluationsLoaded !== null) {
      if (this.evaluationsLoaded === true) {
        this.start('evaluation');
      } else {
        if (!localStorage.getItem('onboardingEntryConfirmed')) {
          this.start('entry');
        }
      }
    }
  }

  /**
   * Prepare onboarding for the Dashboard page
   */
  private prepareDashboardOnBoarding() {
    const INTROJS = introJs();
    INTROJS.addStep({
      element: document.querySelector('.pia-newBlock-item.front'),
      tooltipClass: 'pia-onboarding-dashboard-1',
      intro: `
      <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.dashboard.step2.title')}</div>
      <div class='pia-onboarding-description'>
        ${this._translateService.instant('onboarding.dashboard.step1.description')}
      </div>
      <div class='pia-onboarding-steps'>1/5</div>
    `,
      position: 'right'
    })
      .addStep({
        element: document.querySelector('.pia-cardsBlock.pia-editBlock.back'),
        tooltipClass: 'pia-onboarding-dashboard-2',
        intro: `
      <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.dashboard.step2.title')}</div>
      <div class='pia-onboarding-description'>
        ${this._translateService.instant('onboarding.dashboard.step2.description')}
      </div>
      <div class='pia-onboarding-steps'>2/5</div>
    `,
        position: 'right'
      })
      .addStep({
        element: document.querySelector('.pia-cardsBlock.pia-editBlock.back'),
        tooltipClass: 'pia-onboarding-dashboard-3',
        intro: `
      <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.dashboard.step3.title')}</div>
      <div class='pia-onboarding-description'>
        ${this._translateService.instant('onboarding.dashboard.step3.description')}
      </div>
      <div class='pia-onboarding-steps'>3/5</div>
    `,
        position: 'right'
      })
      .addStep({
        element: document.querySelector('.pia-cardsBlock.pia-editBlock.back'),
        tooltipClass: 'pia-onboarding-dashboard-4',
        intro: `
      <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.dashboard.step4.title')}</div>
      <div class='pia-onboarding-description'>
        ${this._translateService.instant('onboarding.dashboard.step4.description')}
      </div>
      <div class='pia-onboarding-steps'>4/5</div>
    `,
        position: 'right'
      })
      .addStep({
        element: document.querySelector('.pia-cardsBlock.pia-editBlock.back'),
        tooltipClass: 'pia-onboarding-dashboard-5',
        intro: `
      <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.dashboard.step5.title')}</div>
      <div class='pia-onboarding-description'>
        ${this._translateService.instant('onboarding.dashboard.step5.description')}
      </div>
      <div class='pia-onboarding-steps'>5/5</div>
    `,
        position: 'right'
      })
      .onbeforechange(targetElement => {
        if (targetElement.classList.contains('back')) {
          const cardsToSwitch = document.getElementById('cardsSwitch');
          cardsToSwitch.classList.add('flipped');
        }
      })
      .onexit(() => {
        localStorage.setItem('onboardingDashboardConfirmed', 'true');
      })
      .setOption('exitOnOverlayClick', false)
      .setOption('disableInteraction', true)
      .setOption('nextLabel', this._translateService.instant('onboarding.general.next'))
      .setOption('skipLabel', this._translateService.instant('onboarding.general.skip'))
      .setOption('doneLabel', this._translateService.instant('onboarding.general.done'))
      .setOption('showBullets', false)
      .start();
  }

  /**
   * Prepare onboarding for a PIA edit page
   */
  private prepareEntryOnBoarding() {
    var i = 0;
    const INTROJS = introJs();
    INTROJS.addStep({
      tooltipClass: 'pia-onboarding-entry-1',
      element: document.querySelector('.pia-sectionsBlock'),
      intro: `
          <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.entry.step1.title')}</div>
          <div class='pia-onboarding-description'>
            ${this._translateService.instant('onboarding.entry.step1.description')}
          </div>
          <div class='pia-onboarding-steps'>1/7</div>
        `,
      position: 'right'
    })
      .addStep({
        tooltipClass: 'pia-onboarding-entry-2',
        element: document.querySelector('.pia-sectionsBlock'),
        intro: `
        <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.entry.step2.title')}</div>
        <div class='pia-onboarding-description'>
          ${this._translateService.instant('onboarding.entry.step2.description')}
        </div>
        <div class='pia-onboarding-steps'>2/7</div>
      `,
        position: 'right'
      })
      .addStep({
        tooltipClass: 'pia-onboarding-entry-3',
        element: document.querySelector('.pia-sectionsBlock'),
        intro: `
        <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.entry.step3.title')}</div>
        <div class='pia-onboarding-description'>
          ${this._translateService.instant('onboarding.entry.step3.description')}
        </div>
        <div class='pia-onboarding-steps'>3/7</div>
      `,
        position: 'right'
      })
      .addStep({
        tooltipClass: 'pia-onboarding-entry-4',
        element: document.querySelector('.pia-sectionsBlock'),
        intro: `
        <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.entry.step4.title')}</div>
        <div class='pia-onboarding-description'>
          ${this._translateService.instant('onboarding.entry.step4.description')}
        </div>
        <div class='pia-onboarding-steps'>4/7</div>
      `,
        position: 'right'
      })
      .addStep({
        tooltipClass: 'pia-onboarding-entry-5',
        element: document.querySelector('.pia-sectionsBlock'),
        intro: `
        <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.entry.step5.title')}</div>
        <div class='pia-onboarding-description'>
          ${this._translateService.instant('onboarding.entry.step5.description')}
        </div>
        <div class='pia-onboarding-steps'>5/7</div>
      `,
        position: 'right'
      })
      .addStep({
        tooltipClass: 'pia-onboarding-entry-6',
        element: document.querySelector('.pia-rightSidebarBlock'),
        intro: `
        <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.entry.step6.title')}</div>
        <div class='pia-onboarding-description'>
          ${this._translateService.instant('onboarding.entry.step6.description')}
        </div>
        <div class='pia-onboarding-steps'>6/7</div>
      `,
        position: 'left'
      })
      .addStep({
        tooltipClass: 'pia-onboarding-entry-7',
        element: document.querySelector('.pia-rightSidebarBlock'),
        intro: `
        <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.entry.step7.title')}</div>
        <div class='pia-onboarding-description'>
          ${this._translateService.instant('onboarding.entry.step7.description')}
        </div>
        <div class='pia-onboarding-steps'>7/7</div>
      `,
        position: 'left'
      })
      .onbeforechange(targetElement => {
        if (targetElement.classList.contains('pia-rightSidebarBlock')) {
          if (i == 1) {
            this.entrySideViewChange.next('export');
          }
          i++;
        }
      })
      .onexit(() => {
        this.entrySideViewChange.next('knowledge');
        localStorage.setItem('onboardingEntryConfirmed', 'true');
      })
      .setOption('exitOnOverlayClick', false)
      .setOption('disableInteraction', true)
      .setOption('nextLabel', this._translateService.instant('onboarding.general.next'))
      .setOption('skipLabel', this._translateService.instant('onboarding.general.skip'))
      .setOption('doneLabel', this._translateService.instant('onboarding.general.done'))
      .setOption('showBullets', false)
      .start();
  }

  /**
   * Prepare onboarding for evaluation blocks
   */
  private prepareEvaluationsOnBoarding() {
    console.log('evaluation', document.querySelectorAll('.pia-evaluationBlock')[0]);

    let stepsQuantity = 4;
    if (document.querySelectorAll('.pia-evaluationBlock-buttons button').length > 2) {
      stepsQuantity = 5;
    }

    let INTROJS = introJs();
    INTROJS.addStep({
      // Main evaluation block
      tooltipclass: 'pia-onboarding-evaluation-step-evaluationBlock',
      element: document.querySelectorAll('.pia-evaluationBlock')[0],
      intro: `
          <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.evaluation.step1.title')}</div>
          <div class='pia-onboarding-description'>
            ${this._translateService.instant('onboarding.evaluation.step1.description')}
          </div>
          <div class='pia-onboarding-steps'>1/${stepsQuantity}</div>
        `,
      position: 'top'
    }).addStep({
      // "Cancel" button
      tooltipclass: 'pia-onboarding-evaluation-step-refuseButton',
      element: document.querySelectorAll('.pia-evaluationBlock-buttons button')[0],
      intro: `
          <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.evaluation.step2.title')}</div>
          <div class='pia-onboarding-description'>
            ${this._translateService.instant('onboarding.evaluation.step2.description')}
          </div>
          <div class='pia-onboarding-steps'>2/${stepsQuantity}</div>
        `,
      position: 'top'
    });

    if (document.querySelectorAll('.pia-evaluationBlock-buttons button').length > 2) {
      INTROJS.addStep({
        // "Action plan" button
        tooltipclass: 'pia-onboarding-evaluation-step-actionPlanButton',
        element: document.querySelectorAll('.pia-evaluationBlock-buttons button')[1],
        intro: `
              <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.evaluation.step3.title')}</div>
              <div class='pia-onboarding-description'>
                ${this._translateService.instant('onboarding.evaluation.step3.description')}
              </div>
              <div class='pia-onboarding-steps'>3/${stepsQuantity}</div>
            `,
        position: 'top'
      }).addStep({
        // "Acceptable" button
        tooltipclass: 'pia-onboarding-evaluation-step-acceptableButton',
        element: document.querySelectorAll('.pia-evaluationBlock-buttons button')[2],
        intro: `
              <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.evaluation.step4.title')}</div>
              <div class='pia-onboarding-description'>
                ${this._translateService.instant('onboarding.evaluation.step4.description')}
              </div>
              <div class='pia-onboarding-steps'>4/${stepsQuantity}</div>
            `,
        position: 'top'
      });
    } else {
      INTROJS.addStep({
        tooltipclass: 'pia-onboarding-evaluation-step-acceptableButton',
        element: document.querySelectorAll('.pia-evaluationBlock-buttons button')[1],
        intro: `
                <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.evaluation.step4.title')}</div>
                <div class='pia-onboarding-description'>
                  ${this._translateService.instant('onboarding.evaluation.step4.description')}
                </div>
                <div class='pia-onboarding-steps'>4/${stepsQuantity}</div>
              `,
        position: 'top'
      });
    }
    // Top evaluation block (cancel block)
    INTROJS.addStep({
      tooltipclass: 'pia-onboarding-evaluation-step-cancelEvaluationBlock',
      element: document.querySelectorAll('.pia-evaluationBlock-buttons button')[1],
      intro: `
              <div class='pia-onboarding-title'>${this._translateService.instant('onboarding.evaluation.step4.title')}</div>
              <div class='pia-onboarding-description'>
                ${this._translateService.instant('onboarding.evaluation.step4.description')}
              </div>
              <div class='pia-onboarding-steps'>4/${stepsQuantity}</div>
            `,
      position: 'top'
    });
    INTROJS.setOption('exitOnOverlayClick', false)
      .setOption('disableInteraction', true)
      .setOption('nextLabel', this._translateService.instant('onboarding.general.next'))
      .setOption('skipLabel', this._translateService.instant('onboarding.general.skip'))
      .setOption('doneLabel', this._translateService.instant('onboarding.general.done'))
      .setOption('showBullets', false)
      .start();
  }

  /**
   * Start the corresponding onboarding
   * @param onBoarding the name of the onboarding to start
   */
  public start(onBoarding: string) {
    console.log('start');
    switch (onBoarding) {
      case 'dashboard':
        setTimeout(() => {
          this.prepareDashboardOnBoarding();
        }, 1000);
        break;
      case 'entry':
        setTimeout(() => {
          this.prepareEntryOnBoarding();
        }, 1000);
        break;
      case 'evaluation':
        setTimeout(() => {
          this.prepareEvaluationsOnBoarding();
        }, 1000);
        break;
      default:
        break;
    }
  }
}