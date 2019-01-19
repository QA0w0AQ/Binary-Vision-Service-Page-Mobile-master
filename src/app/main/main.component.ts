import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {Spinner} from 'spin.js';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import { fn } from '@angular/compiler/src/output/output_ast';
import * as $ from 'jquery';
declare var emailjs;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isMenuOpened: boolean = false;
  navbarHeight: number;
  lastScrollTop: number = 0;
  delta: number = 5;
  didScroll: boolean;
  phoneHeight: number;
  isLoading: boolean = false;
  isMessageWritten: boolean = false;
  isNameWritten: boolean = false;
  message: string = '';
  name: string = '';
  email: string = '';

  constructor(private _vcr: ViewContainerRef,
    private toastr: ToastsManager) {
        this.toastr.setRootViewContainerRef(_vcr)
     }

  openMenu() {
    if (!this.isMenuOpened) {
        document.getElementById('menu').style.display = 'flex';
        document.getElementById('menu').className = 'menu-wrapper animated fadeInRight';
    } else {
        document.getElementById('menu').className = 'menu-wrapper animated fadeOutRight';
    }
    this.isMenuOpened = !this.isMenuOpened;
}

    scrollTo(type) {
        window.scrollBy({
            top: type === 'header' ? document.getElementById('case-studies-section binaryvision').offsetTop - document.documentElement.scrollTop :
                document.getElementById('case-studies-section').offsetTop - document.documentElement.scrollTop,
            behavior: 'smooth'
        });
    }
    routeTo(page) {
      // location.href = location.href.split('/')[0] + '/' + page;
  }

    hasScrolled() {
      let st;
      const ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('chrome') > -1 || ua.indexOf('firefox') > -1) {
          st = document.documentElement.scrollTop;
      } else {
          st = document.body.scrollTop;
      }
      if (Math.abs(this.lastScrollTop - st) <= this.delta) {
          return;
      }

      if (st > this.lastScrollTop && st > this.navbarHeight) {
          document.getElementById('logo-nav-box').style.top = '-4vw';
          document.getElementById('menu').className = 'menu-wrapper animated fadeOutRight';
          this.isMenuOpened = false;
      } else {
          if (st < this.lastScrollTop || st < this.navbarHeight) {
              document.getElementById('logo-nav-box').style.top = '4vw';
          }
      }

      this.lastScrollTop = st;
  }
  clearFields() {
    document.getElementById('footer-name-box').style.display = 'none';
    document.getElementById('footer-name-box').className = 'name-box animated fadeOut';
    document.getElementById('footer-email-box').style.display = 'none';
    document.getElementById('footer-email-box').className = 'email-box animated fadeOut';
}

clearForm() {
    this.isMessageWritten = false;
    this.isNameWritten = false;
    this.message = '';
    this.name = '';
    this.email = '';
    this.isLoading = false;
}

nextField(value) {
    if (value === 'message') {
        this.isMessageWritten = true;
        document.getElementById('footer-name-box').style.display = 'inline-flex';
        document.getElementById('footer-name-box').className = 'name-box animated fadeIn';
    } else if (value === 'name') {
        this.isNameWritten = true;
        document.getElementById('footer-email-box').style.display = 'inline-flex';
        document.getElementById('footer-email-box').className = 'email-box animated fadeIn';
    }
}
replaceSpaces(value) {
    if (value === 'email') {
        this[value] = this[value].replace(/\s/gi, '');
    } else {
        this[value] = this[value].replace(/\s{2,}/gi, '');
    }
}

sendForm() {
    this.isLoading = true;
    const spinner = new Spinner({color: '#fff', lines: 12});
    const target = document.getElementById('loader');
    spinner.spin(target);

    const templateParams = {
        name: this.name,
        email: this.email,
        message: this.message
    };

    emailjs.send('hello_binary_vision', 'template_HsKrfsH2', templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            this.clearFields();
            this.toastr.success('Email has been sent!');
            spinner.spin(target).stop();
        })
        .catch((error) => {
            console.log('FAILED...', error);
            this.clearFields();
            this.toastr.error(`Email hasn't been sent!`);
            spinner.spin(target).stop();
        });

    this.clearForm();
}

  ngOnInit() {
    // window.addEventListener("DOMContentLoaded",scrollLoop, false);

    // var pic1 = document.querySelector("#binaryvision-development-pic1");
    // // var pic2 = document.querySelector("#binaryvision-digital-pic2");
    
    // var xScrollPosition;
    // var yScrollPosition;
    
    // function scrollLoop(e){
    //     xScrollPosition = window.scrollX;
    //     yScrollPosition = window.scrollY;
    
    //     setTranslate(0,yScrollPosition *0.01, pic1);
    
    //     requestAnimationFrame(scrollLoop);
    // }
    
    // function setTranslate(xPos,yPos, el) {
    //     el.style.transform = "translate3d(" + xPos + ", " + yPos + "px, 0";
    // }

    this.navbarHeight = document.getElementById('logo-nav-box').offsetHeight;
    setTimeout(() => {
      document.getElementById('logo-nav-box').style.display = 'flex';
      document.getElementById('logo-nav-box').className = 'logo-nav-box animated fadeInDown';
  }, 100);
  document.getElementById('menu-btn').onmouseover = () => {
      document.getElementById('menu-btn').setAttribute('src', 'assets/Services/menu-hover.png');
  };
  document.getElementById('menu-btn').onmouseout = () => {
      document.getElementById('menu-btn').setAttribute('src', 'assets/Services/menu.png');
  };
  document.getElementById('logo-nav-box').addEventListener('animationend', () => {
      document.getElementById('header-title').style.display = 'block';
      document.getElementById('header-title').className = 'headertitle animated fadeInRight';
  });
  setTimeout(() => {
    document.getElementById('main-header').style.display = 'block';
    document.getElementById('main-header').className = 'main-header animated fadeInLeft';
}, 2400);
document.getElementById('header-title').addEventListener('animationend', () => {
    document.getElementById('header-subtitle').style.display = 'block';
    document.getElementById('header-subtitle').className = 'headersubtitle animated fadeInRight';
});
// document.getElementById('case-studies-section').addEventListener('animationend', () => {
//   document.getElementById('binaryvision').style.display = 'block';
//   document.getElementById('binaryvision').className = 'binaryvision animated fadeInLeft';
// });

var wt = window.addEventListener
    if(wt){
        wt("mousewheel", MouseWheelHandler, false);
        wt("DOMMouseScroll", MouseWheelHandler, false);
    }
    else
    {
        wt("onmousewheel",MouseWheelHandler);
    }

  function  MouseWheelHandler(e){
    var e = window.event || e;
    if(e.wheelDelta >=0){
        // ('Scroll up');
        document.getElementById('binaryvision-digital-pic1').className='pic1CC animated fadeDown11';
        document.getElementById('binaryvision-digital-pic2').className='pic2CC animated fadeDown22';
        document.getElementById('binaryvision-uiux-pic-box-pic1').className='binaryvision-uiux-pic-box-pic1 animated uipic1FadeUp';
        document.getElementById('binaryvision-uiux-pic-box-pic2').className='binaryvision-uiux-pic-box-pic2 animated uipic2FadeUp';
        document.getElementById('binaryvision-uiux-pic-box-pic3').className='binaryvision-uiux-pic-box-pic3 animated uipic3FadeUp';
    }
    else
    {
        // 'Scroll down');
        document.getElementById('binaryvision-digital-pic1').className='pic1C animated fadeDown1';
        document.getElementById('binaryvision-digital-pic2').className='pic2C animated fadeDown2';
        document.getElementById('binaryvision-uiux-pic-box-pic1').className='binaryvision-uiux-pic-box-pic11 animated uipic1FadeDown';
        document.getElementById('binaryvision-uiux-pic-box-pic2').className='binaryvision-uiux-pic-box-pic22 animated uipic2FadeDown';
        document.getElementById('binaryvision-uiux-pic-box-pic3').className='binaryvision-uiux-pic-box-pic33 animated uipic3FadeDown';
    }
  }

  var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 20;

function moveBackground() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;

  var translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

  $('.binaryvision-development-pic').css({
    '-webit-transform': translate,
    '-moz-transform': translate,
    'transform': translate
  });

  window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {

  var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
  var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
  lFollowX = (50 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (15 * lMouseY) / 100;

});

moveBackground();


  window.addEventListener('scroll',()=>{
    this.didScroll = true;
    this.hasScrolled();
    this.didScroll = false;
    let top;
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('chrome') > -1 || ua.indexOf('firefox') > -1) {
        top = document.documentElement.scrollTop;
    } else {
        top = document.body.scrollTop;
    }


    const caseStudiesSection = document.getElementById('case-studies-section').offsetTop;
    const binaryvisionSection = document.getElementById('case-studies-section binaryvision').offsetTop -  (window.innerHeight * 14 / 100) -
    (window.innerHeight * 12 / 100) * 2;
    const caseStudiesSectionEnd = document.getElementById('case-studies-section').offsetTop +
        document.getElementById('case-studies-section').offsetHeight;
    
    const binaryvisionDevelopment = document.getElementById('background1').offsetTop + (window.innerHeight * 1326 / 1000);
  
    
    if (top >= caseStudiesSection && top <= caseStudiesSectionEnd) {
        document.getElementById('logo-image').setAttribute('src', 'assets/Services/logo_black.png');
    } else {
        document.getElementById('logo-image').setAttribute('src', 'assets/Services/logo.png');
    }
    //Binary Vision content
    if (top>=binaryvisionSection){
      document.getElementById('binaryvision').style.display = 'block';
      document.getElementById('binaryvision').className = 'binaryvision animated fadeInLeft';
      document.getElementById('binaryvision').addEventListener("animationend",()=>{
        document.getElementById('content').style.display = 'block';
        document.getElementById('content').className = 'content animated fadeInUp';
      });
    
    //binaryvision-development
    if(top>=binaryvisionDevelopment){
      document.getElementById('binaryvision-development-pic1').style.display="block";
      document.getElementById('binaryvision-development-pic1').className='binaryvision-development-pic animated fadeInRight'; 
      document.getElementById('background1').style.opacity="1";
      document.getElementById('background1').className='background1 animated fadeInLeft'; 
      document.getElementById('development-brand-content').style.display="block";
      document.getElementById('development-brand-content').className='development-brand-content animated fadeInUp'; 
      document.getElementById('development-services').style.display="block";
      document.getElementById('development-services').className='development-services animated fadeInUp';
      document.getElementById('development-brand').style.display="block";
      document.getElementById('development-brand').className='development-brand animated developmentBrand'; 
      document.getElementById('development-brand-span').style.display="block";
      document.getElementById('development-brand-span').className='development-brand-span animated developmentBrandSpan'; 
    }
    const binaryvisionUi = document.getElementById('background2').offsetTop + window.innerHeight*1.69

    if(top>=2189){
    document.getElementById('binaryvision-uiux-pic-box').style.display="block";
    document.getElementById('binaryvision-uiux-pic-box').className='binaryvision-uiux-pic-box animated fadeInLeft'; 
    document.getElementById('background2').style.opacity="1";
    document.getElementById('background2').className='background2 animated fadeInRight';
    document.getElementById('ui-brand-content').style.display="block";
    document.getElementById('ui-brand-content').className='ui-brand-content animated fadeInUp'; 
    document.getElementById('ui-services').style.display="block";
    document.getElementById('ui-services').className='ui-services animated fadeInUp';
    document.getElementById('ui-brand').style.display="block";
    document.getElementById('ui-brand').className='ui-brand animated uiBrand'; 
    document.getElementById('ui-brand-span').style.display="block";
    document.getElementById('ui-brand-span').className='ui-brand-span animated uiBrandSpan';
    }

    const binaryvisionDigita = document.getElementById('case-studies-section').offsetTop + innerHeight*3 - (window.innerHeight * 14 / 100) -
    (window.innerHeight * 12 / 100) * 2;

    if(top>=3393.25){
        // document.getElementById('binaryvision-digital-pic1').style.display="block";
        // document.getElementById('binaryvision-digital-pic1').className='pic1 animated fadeInRight'; 
        // document.getElementById('binaryvision-digital-pic2').style.display="block";
        // document.getElementById('binaryvision-digital-pic2').className='pic2 animated fadeInRight';
        document.getElementById('binaryvision-digital-pic-box').style.display="block";
        document.getElementById('binaryvision-digital-pic-box').className='binaryvision-digital-pic-box animated fadeFromRight';
        document.getElementById('backgroud3').style.opacity="1";
        document.getElementById('backgroud3').className='backgroud3 animated fadeInLeft';
        document.getElementById('digital-brand-content').style.display="block";
        document.getElementById('digital-brand-content').className='digital-brand-content animated fadeInUp'; 
        document.getElementById('digital-services').style.display="block";
        document.getElementById('digital-services').className='digital-services animated fadeInUp';
        document.getElementById('digital-brand').style.display="block";
        document.getElementById('digital-brand').className='digital-brand animated digitalBrand'; 
        document.getElementById('digital-brand-span').style.display="block";
        document.getElementById('digital-brand-span').className='digital-brand-span animated digitalBrandSpan';
        }
    // if(top>=3500.25){
    //         document.getElementById('binaryvision-digital-pic1').className='pic1';
    //     }
    // if(top>=3585.25){

        // var $ = window.addEventListener();
        // $(window).bind('mousewheel', function(event) {
        //     if (event.originalEvent.wheelDelta  >= 0 ) {
        //         // ('Scroll up');
        //         document.getElementById('binaryvision-digital-pic1').className='pic1CC animated fadeDown11';
        //         document.getElementById('binaryvision-digital-pic2').className='pic2CC animated fadeDown22';
        //     }
        //     else {
        //         // 'Scroll down');
        //         document.getElementById('binaryvision-digital-pic1').className='pic1C animated fadeDown1';
        //         document.getElementById('binaryvision-digital-pic2').className='pic2C animated fadeDown2';
                
        //     }
        // });


        // document.getElementById('binaryvision-digital-pic1').className='pic1C animated fadeDown1';
        // document.getElementById('binaryvision-digital-pic2').className='pic2C animated fadeDown2';
    // }
    // this.phoneHeight = document.getElementById('binaryvision-digital-pic-box').offsetHeight;
    // if (top>=3585.25) {
    //     if( top > this.lastScrollTop && top > this.phoneHeight){
    //         document.getElementById('binaryvision-digital-pic1').className='pic1C animated fadeDown1';
    //         document.getElementById('binaryvision-digital-pic2').className='pic2C animated fadeDown2';
    //     }
    //     else{
    //         document.getElementById('binaryvision-digital-pic1').className='pic1';
    //         document.getElementById('binaryvision-digital-pic2').className='pic2';
    //     }
    // } 
    // else {
    //     if (top < this.lastScrollTop || top < this.navbarHeight) {
            
    //     }
    // }

    const binaryvisionBrand = document.getElementById('case-studies-section').offsetTop + innerHeight*4.8 - (window.innerHeight * 14 / 100) -
    (window.innerHeight * 12 / 100) * 2;
    
    if(top>=4531){
        document.getElementById('binaryvision-brand-box1').style.display="block";
        document.getElementById('binaryvision-brand-box1').className='box1 animated fadeInLeft'; 
        document.getElementById('binaryvision-brand-box2').style.display="block";
        document.getElementById('binaryvision-brand-box2').className='box2 animated fadeInLeft';
        document.getElementById('backgroud4').style.opacity="1";
        document.getElementById('backgroud4').className='backgroud4 animated fadeInRight';
        document.getElementById('brand-brand-content').style.display="block";
        document.getElementById('brand-brand-content').className='brand-brand-content animated fadeInUp'; 
        document.getElementById('brand-services').style.display="block";
        document.getElementById('brand-services').className='brand-services animated fadeInUp';
        document.getElementById('brand-brand').style.display="block";
        document.getElementById('brand-brand').className='brand-brand animated brandBrand'; 
        document.getElementById('brand-brand-span').style.display="block";
        document.getElementById('brand-brand-span').className='brand-brand-span animated brandBrandSpan';
        }

    }
    if (top > caseStudiesSection) {
        document.getElementById('out-of-thought-section').style.display = 'none';
        document.getElementById('footer').style.display = 'flex';

    } else {
        document.getElementById('out-of-thought-section').style.display = 'flex';
        document.getElementById('footer').style.display = 'none';
    }
  });
  }

}
