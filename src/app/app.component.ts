import { Component } from '@angular/core';
import { ChatbotInterviewComponent } from './chatbotinterview/chatbotinterview.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Added for *ngIf

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomepageComponent, ChatbotInterviewComponent, HttpClientModule, CommonModule], // Added CommonModule
  template: `
    <nav class="bg-white shadow-md fixed w-full z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex-shrink-0">
            <a href="#" class="text-xl font-bold text-blue-600">InternReady</a>
          </div>
          <div class="hidden md:flex space-x-8">
            <a href="#" (click)="showPage('home', $event)" class="text-gray-700 hover:text-blue-600 transition-colors duration-300">Home</a>
            <a href="#" (click)="showPage('interview', $event)" class="text-gray-700 hover:text-blue-600 transition-colors duration-300">Interview</a>
          </div>
          <div class="md:hidden">
            <button id="menu-button" (click)="toggleMobileMenu()" class="text-gray-700 hover:text-blue-600 focus:outline-none">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div id="mobile-menu" class="hidden md:hidden bg-white shadow-md absolute w-full top-16 left-0" [class.active]="mobileMenuOpen">
        <a href="#" (click)="showPage('home', $event); toggleMobileMenu()" class="block px-4 py-2 text-gray-700 hover:bg-blue-50">Home</a>
        <a href="#" (click)="showPage('interview', $event); toggleMobileMenu()" class="block px-4 py-2 text-gray-700 hover:bg-blue-50">Interview</a>
      </div>
    </nav>
    <div class="pt-16">
      <app-homepage *ngIf="currentPage === 'home'"></app-homepage>
      <app-chatbotinterview *ngIf="currentPage === 'interview'"></app-chatbotinterview>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pfe-frontend';
  currentPage: string = 'home'; // Default page
  mobileMenuOpen: boolean = false;

  showPage(page: string, event: Event) {
    event.preventDefault(); // Prevent default link behavior
    this.currentPage = page;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}