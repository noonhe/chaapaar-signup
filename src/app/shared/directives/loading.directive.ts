import { Directive, OnInit, Input, ElementRef, Renderer2, OnChanges, SimpleChange } from '@angular/core';

@Directive({
  selector: '[loadingSpinner]',
  standalone: true
})
export class LoadingSpinnerDirective implements OnInit,OnChanges {

  @Input() loading: boolean = false;

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2) {

  }
  loadingElement: any;

  ngOnInit(): void {


  }
  ngOnChanges(changes: { [loading: string]: SimpleChange}) {

    if (changes['loading'] && changes['loading'].previousValue !== changes['loading'].currentValue) {

      if (changes['loading'].currentValue === 'true' || changes['loading'].currentValue === true) {

        this.loadingElement = this.renderer.createElement('div');
        this.loadingElement.innerHTML = `

<style type="text/css">
.spinnerl {
  margin: auto;
  width: 70px;
  text-align: center;
}

.spinnerl > div {
  width: 18px;
  height: 18px;
  background-color: var(--color01);

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinnerl .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinnerl .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>
        <div style="  width: 100%;
        height:100%;
        position: absolute;
        top: 0;
        left: 0;
        margin: 0 auto;
        background: #05050548;
        z-index:1000;">
        <table style="height:100%;width:100%">
        <tr>
        <td>
        <div class="spinnerl">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
        </td>
        </tr>
        </table>
        </div> `;

        this.renderer.appendChild(this.elementRef.nativeElement, this.loadingElement);
        this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'true');
      } else {
        if (this.loadingElement) {
          this.renderer.removeChild(this.elementRef.nativeElement, this.loadingElement);
          this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');

        }

      }
    }

  }
}
