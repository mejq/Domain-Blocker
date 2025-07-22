import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {  //viewchild HTML sablonunaki bir DOm vy Angular bileşenine erişmek içn (iframe)
  @ViewChild('mfe1Iframe') mfe1Iframe!: ElementRef<HTMLIFrameElement>; //htmldeki etktle element olrk alıyoruz
  @ViewChild('mfe2Iframe') mfe2Iframe!: ElementRef<HTMLIFrameElement>;

  title = 'shell';
  allowedOrigins = ['http://localhost:4201', 'http://localhost:4202'];

  ngOnInit() {
    window.addEventListener('message', this.handleMessageFromMfe.bind(this)); //postmessage dinliyor
  }

  handleMessageFromMfe(event: MessageEvent) {
    if (!this.allowedOrigins.includes(event.origin)) {
      console.warn('Origin not allowed:', event.origin);
      return;
    }
    if (event.data?.type === 'add-domain') {
      console.log('Shell received domain:', event.data.domainName, 'from', event.origin);
      const targetIframe = event.origin === 'http://localhost:4201' ? this.mfe2Iframe.nativeElement : this.mfe1Iframe.nativeElement;  //gelen id ye gore hefed digerı olmus oluyo
      const targetOrigin = event.origin === 'http://localhost:4201' ? 'http://localhost:4202' : 'http://localhost:4201';//01 den geldıyse 02 ...

      if (targetIframe && targetIframe.contentWindow) {
        console.log('Posting message to:', targetIframe.id);
        targetIframe.contentWindow.postMessage(event.data, targetOrigin); //mfex den gleeni mfey ye gonderdeik
      }
    }
  }
}
