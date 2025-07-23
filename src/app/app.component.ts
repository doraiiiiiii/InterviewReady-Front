import { Component, OnInit } from '@angular/core';
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
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pfe-frontend';
  currentPage: string = 'home';
  mobileMenuOpen: boolean = false;
  isDarkMode: boolean = false;

  ngOnInit() {
    // Charger le thème depuis localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.updateTheme();
  }

  showPage(page: string, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private updateTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}