import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
@Directive({ selector: '[clickOutside]' })
export class ClickOutsideDirective implements OnInit, OnChanges, OnDestroy {

  @Input() attachOutsideOnClick = false;
  @Input() delayClickOutsideInit = false;
  @Input() exclude = '';
  @Input() excludeBeforeClick = false;
  @Input() clickOutsideEvents = '';

  @Output() clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  private _nodesExcluded: Array<HTMLElement> = [];
  private _events: Array<string> = ['click'];

  constructor(private _el: ElementRef,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this._initOnClickBody = this._initOnClickBody.bind(this);
    this._onClickBody = this._onClickBody.bind(this);
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) { return; }

    this._init();
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) { return; }

    if (this.attachOutsideOnClick) {
      this._events.forEach(e => this._el.nativeElement.removeEventListener(e, this._initOnClickBody));
    }

    this._events.forEach(e => document.body.removeEventListener(e, this._onClickBody));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!isPlatformBrowser(this.platformId)) { return; }

    if (changes['attachOutsideOnClick'] || changes['exclude']) {
      this._init();
    }
  }

  private _init() {
    if (this.clickOutsideEvents !== '') {
      this._events = this.clickOutsideEvents.split(',').map(e => e.trim());
    }

    this._excludeCheck();

    if (this.attachOutsideOnClick) {
      this._events.forEach(e => this._el.nativeElement.addEventListener(e, this._initOnClickBody));
    } else {
      this._initOnClickBody();
    }
  }

  private _initOnClickBody() {
    if (this.delayClickOutsideInit) {
      setTimeout(this._initClickListeners.bind(this));
    } else {
      this._initClickListeners();
    }
  }

  private _initClickListeners() {
    this._events.forEach(e => document.body.addEventListener(e, this._onClickBody));
  }

  private _excludeCheck() {
    if (this.exclude) {
      try {
        const nodes = Array.from(document.querySelectorAll(this.exclude)) as Array<HTMLElement>;
        if (nodes) {
          this._nodesExcluded = nodes;
        }
      } catch (err) {
        console.error('[ng-click-outside] Check your exclude selector syntax.', err);
      }
    }
  }

  private _onClickBody(ev: Event) {
    if (this.excludeBeforeClick) {
      this._excludeCheck();
    }

    if (!this._el.nativeElement.contains(ev.target) && !this._shouldExclude(ev.target)) {
      this.clickOutside.emit(ev);

      if (this.attachOutsideOnClick) {
        this._events.forEach(e => document.body.removeEventListener(e, this._onClickBody));
      }
    }
  }

  private _shouldExclude(target): boolean {
    for (const excludedNode of this._nodesExcluded) {
      if (excludedNode.contains(target)) {
        return true;
      }
    }

    return false;
  }
}
