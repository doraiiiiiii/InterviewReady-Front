import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { timeout } from 'rxjs/operators';
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
  selectedFile: File | null = null;
  uploadError: string | null = null;
  analysisResults: AnalysisResult | null = null;
  @ViewChild('resultsContainer') resultsContainer: ElementRef | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.setupScrollReveal();
  }

  openUpload() {
    this.isUploadOpen = true;
    console.log('Upload section opened at', new Date().toLocaleString('en-US', { timeZone: 'CET' }));
  }

  closeUpload() {
    this.isUploadOpen = false;
    this.selectedFile = null;
    this.uploadError = null;
    this.analysisResults = null;
    console.log('Upload section closed at', new Date().toLocaleString('en-US', { timeZone: 'CET' }));
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadError = null;
      console.log('File selected:', this.selectedFile.name, 'at', new Date().toLocaleString('en-US', { timeZone: 'CET' }));
    } else {
      console.log('No file selected at', new Date().toLocaleString('en-US', { timeZone: 'CET' }));
    }
  }

  analyzeCv() {
    console.log('Analyze CV clicked at', new Date().toLocaleString('en-US', { timeZone: 'CET' }));
    if (!this.selectedFile) {
      this.uploadError = 'No file selected. Please upload a CV.';
      console.error('No file selected at', new Date().toLocaleString('en-US', { timeZone: 'CET' }));
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    console.log('Sending request to http://localhost:8081/api/cv/analyze with file:', this.selectedFile.name);

    this.http.post('http://localhost:8081/api/cv/analyze', formData)
      .pipe(timeout(180000)) // 3-minute timeout
      .subscribe({
        next: (response: any) => {
          console.log('Raw analysis response received at', new Date().toLocaleString('en-US', { timeZone: 'CET' }), ':', JSON.stringify(response, null, 2));
          console.log('Response structure:', response.structure);
          console.log('Response grammar_errors:', response.grammar_errors);
          console.log('Response quality:', response.quality);
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
                ...(response.grammar_errors ? response.grammar_errors.map((error: any) => ({
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
            this.uploadError = null;
          } catch (e) {
            const error = e as Error; // Type assertion
            this.uploadError = `Error processing response at ${new Date().toLocaleString('en-US', { timeZone: 'CET' })}: ${error.message}`;
            console.error('Processing error at', new Date().toLocaleString('en-US', { timeZone: 'CET' }), ':', e);
          }
          this.scrollToResults();
        },
        error: (error: HttpErrorResponse | TimeoutError) => {
          this.uploadError = `Error analyzing CV: ${error instanceof HttpErrorResponse ? `${error.status} - ${error.statusText}` : 'Request timed out'} at ${new Date().toLocaleString('en-US', { timeZone: 'CET' })}`;
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
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const items = document.querySelectorAll('.result-card');
    items.forEach(item => observer.observe(item));
  }
}