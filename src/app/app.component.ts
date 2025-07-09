import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { ChatbotInterviewComponent } from './chatbotinterview/chatbotinterview.component';
import { CvOptimizerComponent } from './cv-optimizer/cv-optimizer.component';
import { CompanyListingComponent } from './company-listing/company-listing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    HomepageComponent,
    ChatbotInterviewComponent,
    CvOptimizerComponent,
    CompanyListingComponent
  ],
  template: `
    <nav class="nav">
      <div class="max-w-7xl">
        <div class="flex">
          <div class="flex-shrink-0">
            <a href="#" class="logo">
              <img src="/assets/logo.png" alt="InterReady Logo" class="logo-image">
              <span class="logo-text">InterReady</span>
            </a>
          </div>
          <div class="nav-links">
            <a href="#" (click)="showPage('home', $event)" class="nav-link">Home</a>
            <a href="#" (click)="showPage('interview', $event)" class="nav-link">Interview</a>
            <a href="#" (click)="showPage('cv-optimizer', $event)" class="nav-link">CV Optimizer</a>
            <a href="#" (click)="showPage('company-listing', $event)" class="nav-link">Company Listings</a>
          </div>
          <div class="mobile-menu-toggle">
            <button id="menu-button" (click)="toggleMobileMenu()" class="menu-button">
              <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div id="mobile-menu" class="mobile-menu" [class.active]="mobileMenuOpen">
        <a href="#" (click)="showPage('home', $event); toggleMobileMenu()" class="mobile-link">Home</a>
        <a href="#" (click)="showPage('interview', $event); toggleMobileMenu()" class="mobile-link">Interview</a>
        <a href="#" (click)="showPage('cv-optimizer', $event); toggleMobileMenu()" class="mobile-link">CV Optimizer</a>
        <a href="#" (click)="showPage('company-listing', $event); toggleMobileMenu()" class="mobile-link">Company Listings</a>
      </div>
    </nav>
    <div class="content">
      <app-homepage *ngIf="currentPage === 'home'"></app-homepage>
      <app-chatbotinterview *ngIf="currentPage === 'interview'"></app-chatbotinterview>
      <app-cv-optimizer *ngIf="currentPage === 'cv-optimizer'"></app-cv-optimizer>
      <app-company-listing *ngIf="currentPage === 'company-listing'"></app-company-listing>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pfe-frontend';
  currentPage: string = 'home';
  mobileMenuOpen: boolean = false;

  showPage(page: string, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}