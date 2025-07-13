import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, HttpClientModule, LoginComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy, AfterViewInit {
  showAuthModal: boolean = false;
  titleText: string[] = 'Your Dream Internship Within Reach!'.split('');
  charStates: boolean[] = [];
  private animationInterval: any;
  private observer: IntersectionObserver | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.charStates = new Array(this.titleText.length).fill(false);
    this.startAnimation();
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  toggleAuthModal() {
    console.log('Toggling modal, showAuthModal:', this.showAuthModal); // Debug
    this.showAuthModal = !this.showAuthModal;
    this.cdr.detectChanges();
  }

  getDelay(index: number): string {
    return `${index * 0.1}s`;
  }

  startAnimation() {
    let currentIndex = 0;
    let writing = true;

    this.animationInterval = setInterval(() => {
      if (writing) {
        if (currentIndex < this.titleText.length) {
          this.charStates[currentIndex] = true;
          currentIndex++;
        } else {
          setTimeout(() => {
            writing = false;
            currentIndex = this.titleText.length - 1;
          }, 1000);
        }
      } else {
        if (currentIndex >= 0) {
          this.charStates[currentIndex] = false;
          currentIndex--;
        } else {
          setTimeout(() => {
            writing = true;
            currentIndex = 0;
          }, 500);
        }
      }
      this.charStates = [...this.charStates];
      this.cdr.detectChanges();
    }, 100);
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    const featuresSection = document.querySelector('.features-content');
    const testimonialsSection = document.querySelector('.testimonials-content');

    if (featuresSection) {
      this.observer.observe(featuresSection);
    }
    if (testimonialsSection) {
      this.observer.observe(testimonialsSection);
    }
  }
}