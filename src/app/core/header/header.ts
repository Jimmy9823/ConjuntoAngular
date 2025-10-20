import { Component, HostListener } from '@angular/core';
import { Imports_ } from '../../shared/imports';

@Component({
  selector: 'app-header',
  imports: [Imports_],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset;
    this.isScrolled = currentScroll > 100;
  }
}
