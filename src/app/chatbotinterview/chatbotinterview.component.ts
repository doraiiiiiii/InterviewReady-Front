
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbotinterview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbotinterview.component.html',
  styleUrls: ['./chatbotinterview.component.css']
})
export class ChatbotInterviewComponent implements OnInit {
  isChatOpen: boolean = false;
  chatMessages: { text: string, isUser: boolean }[] = [];
  @ViewChild('chatContainer') chatContainer: ElementRef | undefined;
  currentQuestionIndex: number | null = null;
  interviewStarted: boolean = false;
  userName: string = 'Eya'; // Placeholder for user name

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.setupScrollReveal();
  }

  openChatbot() {
    console.log('openChatbot called');
    this.isChatOpen = true;
    this.startInterview();
  }

  closeChatbot() {
    console.log('closeChatbot called');
    this.isChatOpen = false;
    this.chatMessages = [];
    this.currentQuestionIndex = null;
    this.interviewStarted = false;
  }

  startInterview() {
    console.log('startInterview called');
    this.interviewStarted = true;
    // Add welcome message
    this.chatMessages.push({ text: `Welcome ${this.userName}, Based on your CV and skills, let’s dive into some tailored interview practice!`, isUser: false });
    // Call FastAPI /start endpoint (but don't display its response)
    this.http.get<any>('http://localhost:8001/start', {
      headers: new HttpHeaders({ 'Authorization': 'Basic YWRtaW46YWRtaW4=' })
    }).subscribe(
      response => {
        console.log('startInterview response:', response);
        this.getNextQuestion();
        this.scrollToBottom();
      },
      error => {
        console.error('startInterview error:', error);
        this.chatMessages.push({ text: `Error starting interview: ${error.statusText}`, isUser: false });
        this.scrollToBottom();
      }
    );
  }

  getNextQuestion() {
    console.log('getNextQuestion called');
    this.http.get<any>('http://localhost:8001/question', {
      headers: new HttpHeaders({ 'Authorization': 'Basic YWRtaW46YWRtaW4=' })
    }).subscribe(
      response => {
        console.log('getNextQuestion response:', response);
        if (response.question) {
          this.currentQuestionIndex = response.index;
          this.chatMessages.push({ text: response.question, isUser: false });
        } else {
          this.chatMessages.push({ text: 'No more questions available.', isUser: false });
          this.currentQuestionIndex = null;
        }
        this.scrollToBottom();
      },
      error => {
        console.error('getNextQuestion error:', error);
        this.chatMessages.push({ text: `Error getting question: ${error.statusText}`, isUser: false });
        this.scrollToBottom();
      }
    );
  }

  sendAnswer(answer: string) {
    if (answer.trim() && this.currentQuestionIndex !== null && this.interviewStarted) {
      console.log('sendAnswer called with:', answer);
      this.chatMessages.push({ text: answer, isUser: true });
      this.scrollToBottom();

      const requestBody = {
        index: this.currentQuestionIndex,
        answer: answer,
        action: 'submit',
        wantPlatform: true
      };

      this.http.post<any>('http://localhost:8001/answer', requestBody, {
        headers: new HttpHeaders({ 'Authorization': 'Basic YWRtaW46YWRtaW4=' })
      }).subscribe(
        response => {
          console.log('sendAnswer response:', response);
          this.chatMessages.push({ text: `Score: ${response.score}, Feedback: ${response.feedback}`, isUser: false });
          if (response.platform_suggestion) {
            this.chatMessages.push({ text: `Platform Suggestion: ${response.platform_suggestion}`, isUser: false });
          }
          this.getNextQuestion();
          this.scrollToBottom();
        },
        error => {
          console.error('sendAnswer error:', error);
          this.chatMessages.push({ text: `Error submitting answer: ${error.statusText}`, isUser: false });
          this.scrollToBottom();
        }
      );
    }
  }

  toggleFaq(event: Event) {
    const faqItem = (event.currentTarget as HTMLElement).parentElement;
    if (faqItem) {
      faqItem.classList.toggle('active');
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer?.nativeElement) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
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
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const items = document.querySelectorAll('.feature-card, .faq-item');
    items.forEach(item => observer.observe(item));
  }
}
