import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
   parallaxOffset = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
      this.parallaxOffset = scrolled * 0.3;
    }
  }

  onPortalClick() {
    console.log('Navegando a portal de residentes');
  }

  onPropiedadesClick() {
    const propiedadesSection = document.querySelector('[id="propiedades"]');
    if (propiedadesSection) {
      propiedadesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
