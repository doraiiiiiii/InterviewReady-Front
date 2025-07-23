import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { timeout, retry } from 'rxjs/operators';
import { TimeoutError } from 'rxjs';

interface AnalysisResult {
  issues: { title: string; description: string; corrections: string | null }[];
  suggestions: { title: string; description: string }[];
}

@Component({
  selector: 'app-cv-optimizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cv-optimizer.component.html',
  styleUrls: ['./cv-optimizer.component.css']
})
export class CvOptimizerComponent implements OnInit {
  isUploadOpen: boolean = false;
  selectedFiles: File[] = []; // Support for multiple files
  uploadError: string | null = null;
  analysisResults: AnalysisResult | null = null;
  @ViewChild('resultsContainer') resultsContainer: ElementRef | undefined;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setupScrollReveal();
  }

  openUpload() {
    this.isUploadOpen = true;
    this.cdr.detectChanges(); // Force change detection
    console.log('Upload section opened at', new Date().toLocaleString('en-US', { timeZone: 'CET' }));
  }

  closeUpload() {
    this.isUploadOpen = false;
    this.selectedFiles = [];
    this.uploadError = null;
    this.analysisResults = null;
    console.log('Upload section closed at', new Date().toLocaleString('en-US', { timeZone: 'CET' }));
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
      this.uploadError = null;
      console.log('Files selected:', this.selectedFiles.map(f => f.name), 'at', new Date().toLocaleString('en-US', { timeZone: 'CET' }));
    } else {
      console.log('No files selected at', new Date().toLocaleString('en-US', { timeZone: 'CET' }));
    }
  }

  analyzeCv() {
    console.log('Analyze CV clicked at', new Date().toLocaleString('en-US', { timeZone: 'CET' }));
    if (this.selectedFiles.length === 0) {
      this.uploadError = 'No files selected. Please upload a CV.';
      console.error('No files selected at', new Date().toLocaleString('en-US', { timeZone: 'CET' }));
      return;
    }

    const formData = new FormData();
    this.selectedFiles.forEach(file => formData.append('file', file)); // Match server expectation
    for (let pair of formData.entries()) {
      console.log('FormData entry:', pair[0], pair[1]);
    }
    console.log('Sending request to http://localhost:8081/api/cv/analyze with files:', this.selectedFiles.map(f => f.name));

    this.http.post('http://localhost:8080/api/cv/analyze', formData)
      .pipe(
        timeout(300000), // Increased to 5 minutes
        retry(2) // Retry up to 2 times on failure
      )
      .subscribe({
        next: (response: any) => {
          console.log('Raw analysis response received at', new Date().toLocaleString('en-US', { timeZone: 'CET' }), ':', JSON.stringify(response, null, 2));
          try {
            if (!response || typeof response !== 'object') {
              this.uploadError = 'Invalid response format at ' + new Date().toLocaleString('en-US', { timeZone: 'CET' });
              return;
            }

            this.analysisResults = {
              issues: [
                ...(response.structure ? Object.keys(response.structure).map(key => ({
                  title: key.replace('_', ' ').toUpperCase(),
                  description: response.structure[key]
                    ? `${key.replace('_', ' ')} section detected.`
                    : `${key.replace('_', ' ')} section missing.`,
                  corrections: response.structure[key] ? null : `Add a ${key.replace('_', ' ')} section.`
                })) : []),
                ...(response.grammarErrors ? response.grammarErrors.map((error: any) => ({
                  title: 'Grammar/Spelling Error',
                  description: error.message,
                  corrections: error.suggestions && error.suggestions.length > 0
                    ? error.suggestions.join(', ')
                    : 'No suggestions available.'
                })) : [])
              ],
              suggestions: [
                ...(response.quality ? Object.keys(response.quality).map(key => ({
                  title: key.replace('_', ' ').toUpperCase(),
                  description: response.quality[key]
                })) : [])
              ]
            };
            console.log('analysisResults populated:', JSON.stringify(this.analysisResults, null, 2));
            this.cdr.detectChanges(); // Force UI update after setting analysisResults
            this.uploadError = null;
            // Re-run scroll reveal after data is available
            setTimeout(() => this.setupScrollReveal(), 0);
          } catch (e) {
            const error = e as Error;
            this.uploadError = `Error processing response at ${new Date().toLocaleString('en-US', { timeZone: 'CET' })}: ${error.message}`;
            console.error('Processing error at', new Date().toLocaleString('en-US', { timeZone: 'CET' }), ':', e);
          }
          this.scrollToResults();
        },
        error: (error: HttpErrorResponse | TimeoutError) => {
          console.error('Full error details:', error);
          this.uploadError = `Error analyzing CV: ${error instanceof HttpErrorResponse 
            ? `${error.status} - ${error.statusText} - ${JSON.stringify(error.error) || 'No details'}` 
            : 'Request timed out'} at ${new Date().toLocaleString('en-US', { timeZone: 'CET' })}`;
          console.error('Analysis error at', new Date().toLocaleString('en-US', { timeZone: 'CET' }), ':', error);
        },
        complete: () => {
          console.log('Request completed at', new Date().toLocaleString('en-US', { timeZone: 'CET' }));
        }
      });
  }

  private scrollToResults() {
    setTimeout(() => {
      if (this.resultsContainer?.nativeElement) {
        this.resultsContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

  private setupScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
            console.log('IntersectionObserver triggered for', entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const items = document.querySelectorAll('.result-card');
    items.forEach(item => observer.observe(item));
    console.log('Setup scroll reveal for', items.length, 'result cards');
  }

  removeFile(file: File): void {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    console.log('Removed file:', file.name, 'at', new Date().toLocaleString('en-US', { timeZone: 'CET' }));
  }
}