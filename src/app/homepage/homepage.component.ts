import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy, AfterViewInit {
  showAuthModal: boolean = false;
  titleText: string[] = 'Your Dream Internship Within Reach!'.split('');
  charStates: boolean[] = [];
  private animationInterval: any;
  private observer: IntersectionObserver | null = null;

  ngOnInit() {
    // Initialiser tous les caractères comme invisibles
    this.charStates = new Array(this.titleText.length).fill(false);
    this.startAnimation();
  }

  ngAfterViewInit() {
    // Configurer l'IntersectionObserver après que la vue soit initialisée
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    // Nettoyer l'intervalle pour éviter les fuites de mémoire
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    // Nettoyer l'IntersectionObserver
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  toggleAuthModal() {
    console.log('Get Started Now clicked, showAuthModal:', this.showAuthModal);
    this.showAuthModal = !this.showAuthModal;
  }

  getDelay(index: number): string {
    return `${index * 0.1}s`; // Délai pour chaque caractère
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
    }, 100); // Intervalle de 100ms entre chaque caractère
  }

  setupIntersectionObserver() {
    // Options pour l'IntersectionObserver
    const options = {
      root: null, // Utiliser le viewport comme racine
      rootMargin: '0px',
      threshold: 0.1 // Déclencher quand 10% de l'élément est visible
    };

    // Callback pour l'IntersectionObserver
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Ajouter la classe 'visible' quand l'élément entre dans le viewport
          entry.target.classList.add('visible');
          // Optionnel : arrêter d'observer cet élément après l'animation
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    // Observer les sections 'features-content' et 'testimonials-content'
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