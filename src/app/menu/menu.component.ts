import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {
    elm: any;
    path: any;
    numPoints: number = 2;
    duration: number = 600;
    delayPointsArray: Array<number> = [];
    delayPointsMax: number = 0;
    delayPerPath: number = 200;
    timeStart: number = Date.now();
    isOpened: boolean = false;
    isAnimating: boolean = false;
    isHas: boolean = false;
    ease: any = {
      exponentialIn: (t) => {
        return t == 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
      },
      exponentialOut: (t) => {
        return t == 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
      },
      exponentialInOut: (t) => {
        return t == 0.0 || t == 1.0
          ? t
          : t < 0.5
            ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
            : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0;
      },
      sineOut: (t) => {
        const HALF_PI = 1.5707963267948966;
        return Math.sin(t * HALF_PI);
      },
      circularInOut: (t) => {
        return t < 0.5
            ? 0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t))
            : 0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
      },
      cubicIn: (t) => {
        return t * t * t;
      },
      cubicOut: (t) => {
        const f = t - 1.0;
        return f * f * f + 1.0;
      },
      cubicInOut: (t) => {
        return t < 0.5
          ? 4.0 * t * t * t
          : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
      },
      quadraticOut: (t) => {
        return -t * (t - 2.0);
      },
      quarticOut: (t) => {
        return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
      },
    }

    elmHamburger: any;
    gNavItems: any;
    elmOverlay: any;
    logo: any;
    projects:any;
    medias:any;
    capabilities:any;
    team:any;
    connect:any;
    content:any;
    menu__item:any;
    shapeOverlays:any;
    x:any;
    c:any;
    projectSupStyle:any="vertical-align:super;font-weight:bold;font-size:10px;margin-left:0.4vw";
    projectBoxsStyle:any="line-height: 15vw;font-size: 20px;font-family: 'Montserrat';color: white;font-weight: bold;"
    projectBoxStyle:any="animation-name:showup;transition-duration: 0.6s;display: flex;flex-direction: column;color: white;font-size: 20px;margin-left:38px;"
    public view = ``;
    projectView = `<div class="projectbox animated showup" style="${this.projectBoxStyle}">
    <div class="box1" style="${this.projectBoxsStyle}">
      <span>Looper</span><sup style="color:#FFD93E;${this.projectSupStyle}">New</sup><br>
      <span>Arvin</span><sup style="color:#535fff;${this.projectSupStyle}">New</sup><br>
      <span>Giggl</span><sup style="color:#00ffd2;${this.projectSupStyle}">New</sup><br>
      <span>Vier</span><sup style="${this.projectSupStyle}">COMING SOON</sup>
    </div>
    <div class="box2" style="${this.projectBoxsStyle}">
      <span>Alpha Crypto</span><sup style="color:#ff8b45;${this.projectSupStyle}">New</sup><br>
      <span>Iraqi Souq</span><sup style="${this.projectSupStyle}">COMING SOON</sup><br>
      <span>NextWave Girls</span><sup style="color:#ff4b63;${this.projectSupStyle}">New</sup><br>
      <span>Kenergy Active</span><sup style="${this.projectSupStyle}">COMING SOON</sup>
    </div>
    <div class="box3" style="${this.projectBoxsStyle}">
      <span>Rent Your Ride</span><sup style="color:#ff4b63;${this.projectSupStyle}">New</sup><br>
      <span>Iungo Social</span><sup style="color:#ffe500;${this.projectSupStyle}">New</sup><br>
      <span>Kenergy Ventures</span><sup style="${this.projectSupStyle}">COMING SOON</sup><br>
      <span>KenergyLabs</span><sup style="${this.projectSupStyle}">COMING SOON</sup>
    </div>
    </div>`;


  constructor() { }



  showProject(){
    this.menu__item.setAttribute("style", "opacity:0;");
    this.shapeOverlays.style.height = "945px";
    this.content.innerHTML = this.projectView;
    // this.content.className = 'case-content animated showup';
  }
  showCapabilities(){
    this.content.innerHTML = this.view;
  }

  showTeam(){
    this.content.innerHTML = this.view;
  }

  showMedia(){
    this.content.innerHTML = this.view;
  }

  showConnect(){
    this.content.innerHTML = this.view;
  }

  hamburger(){
    if (this.isAnimating) {
      return false;
    }
    this.toggle();
    if (this.isOpened === true) {
      this.elmHamburger.classList.add('is-opened-navi');
      for (var i = 0; i < this.gNavItems.length; i++) {
        this.gNavItems[i].classList.add('is-opened');
      }
      this.elmHamburger.setAttribute("style", "position:fixed")
      this.content.setAttribute("style", "opacity:1;");
      this.logo.setAttribute("style", "opacity:1;");
      this.menu__item.setAttribute("style", "opacity:1");
    } else {
      this.elmHamburger.classList.remove('is-opened-navi');
      for (var i = 0; i < this.gNavItems.length; i++) {
        this.gNavItems[i].classList.remove('is-opened');
        this.content.innerHTML='';
        this.shapeOverlays.style.height="686px";
        this.menu__item.style.opacity="1";
      }
      // this.logo.setAttribute("style", "opacity:0;");

    }
  }


  ngOnInit() {

    this.demo();

    this.elm = document.querySelector('.shape-overlays');
    this.path = this.elm.querySelectorAll('path');
    this.elmHamburger = document.querySelector('.hamburger');
    this.gNavItems = document.querySelectorAll('.global-menu__item');
    this.elmOverlay = document.querySelector('.shape-overlays');
    this.logo = document.getElementById('logo');
    this.projects = document.querySelector('.menu__item-name.projects');
    this.medias = document.querySelector('.menu__item-name.medias');
    this.capabilities = document.querySelector('.menu__item-name.capabilities');
    this.team = document.querySelector('.menu__item-name.team');
    this.connect = document.querySelector('.menu__item-name.connect');
    this.content = document.getElementById('case-content');
    this.menu__item = document.getElementById('global-menu__wrap');
    this.shapeOverlays = document.getElementById('shape-overlays');
    
  }


  toggle() {
    this.isAnimating = true;
    for (var i = 0; i < this.numPoints; i++) {
      this.delayPointsArray[i] = 0;
    }
    if (this.isOpened === false) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    this.isOpened = true;
    this.elm.classList.add('is-opened');
    this.timeStart = Date.now();
    this.renderLoop();
  }
  close() {
    this.isOpened = false;
    this.elm.classList.remove('is-opened');
    this.timeStart = Date.now();
    this.renderLoop();
  }

  updatePath(time) {
    const points = [];
    for (var i = 0; i < this.numPoints; i++) {
      const thisEase = this.isOpened ? 
                        (i == 1) ? this.ease.cubicOut : this.ease.cubicInOut:
                        (i == 1) ? this.ease.cubicInOut : this.ease.cubicOut;
      points[i] = thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100
    }

    let str = '';
    str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
    for (var i = 0; i < this.numPoints - 1; i++) {
      const p = (i + 1) / (this.numPoints - 1) * 100;
      const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
      str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
    }
    str += (this.isOpened) ? `V 0 H 0` : `V 100 H 0`;
    return str;
  }

  render() {
    if (this.isOpened) {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
      }
    } else {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
      }
    }
  }

  renderLoop() {
    this.render();
    if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
      requestAnimationFrame(() => {
        this.renderLoop();
      });
    }
    else {
      this.isAnimating = false;
    }
  }

  demo() {
    setTimeout(() => document.body.classList.add('render'), 60);
	const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
	const total = navdemos.length;
	const current = navdemos.findIndex(el => el.classList.contains('demo--current'));
	const navigate = (linkEl) => {
		document.body.classList.remove('render');
		// document.body.addEventListener('transitionend', () => window.location = linkEl.href);
	};
	navdemos.forEach(link => link.addEventListener('click', (ev) => {
		ev.preventDefault();
		navigate(ev.target);
	}));
	document.addEventListener('keydown', (ev) => {
		const keyCode = ev.keyCode || ev.which;
		let linkEl;
		if ( keyCode === 37 ) {
			linkEl = current > 0 ? navdemos[current-1] : navdemos[total-1];
		}
		else if ( keyCode === 39 ) {
			linkEl = current < total-1 ? navdemos[current+1] : navdemos[0];
		}
		else {
			return false;
		}
		navigate(linkEl);
	});
  }
}
