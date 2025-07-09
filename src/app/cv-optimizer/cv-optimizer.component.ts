import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv-optimizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-optimizer.component.html',
  styleUrls: ['./cv-optimizer.component.css']
})
export class CvOptimizerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('uploadSection') uploadSection!: ElementRef;
  selectedFile: File | null = null;
  uploadError: string | null = null;
  analysisResults: any = null;
  private observer: IntersectionObserver | null = null;

  ngOnInit() {}

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  scrollToUpload() {
    this.uploadSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(file.type)) {
        this.selectedFile = file;
        this.uploadError = null;
      } else {
        this.uploadError = 'Please upload a valid file (.pdf, .doc, or .docx)';
        this.selectedFile = null;
      }
    }
  }

  analyzeCv() {
    if (!this.selectedFile) {
      this.uploadError = 'No file selected. Please upload a CV.';
      return;
    }

    // Simulate CV analysis (replace with actual backend API call)
    this.analysisResults = {
      issues: [
        { title: 'Missing Contact Information', description: 'Your CV lacks a phone number or email address, which are essential for recruiters to contact you.' },
        { title: 'Inconsistent Formatting', description: 'Font sizes and styles vary across sections, making the CV look unprofessional.' },
        { title: 'Weak Action Verbs', description: 'Using generic verbs like "did" or "worked" instead of strong verbs like "developed" or "implemented".' }
      ],
      suggestions: [
        { title: 'Add Contact Details', description: 'Include a professional email and phone number at the top of your CV.' },
        { title: 'Use Consistent Formatting', description: 'Ensure uniform font sizes, styles, and spacing throughout your CV.' },
        { title: 'Incorporate Keywords', description: 'Add industry-specific keywords to pass Applicant Tracking Systems (ATS).' }
      ]
    };
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
          const cards = entry.target.querySelectorAll('.result-card, .suggestion-card');
          cards.forEach((card: Element) => card.classList.add('in-view'));
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    const sections = document.querySelectorAll('.cv-upload-content, .results-content, .suggestions-content');
    sections.forEach(section => this.observer?.observe(section));
  }
}