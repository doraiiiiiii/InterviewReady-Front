import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbotinterview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbotinterview.component.html',
  styleUrls: ['./chatbotinterview.component.css']
})
export class ChatbotInterviewComponent implements OnInit {
  isChatOpen: boolean = false;
  chatMessages: string[] = [];
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  currentQuestionIndex: number | null = null;
  interviewStarted: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

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
    this.http.get<any>('api/questions/start', {
      headers: { 'Authorization': 'Basic YWRtaW46YWRtaW4=' }
    }).subscribe(response => {
      console.log('startInterview response:', response);
      this.chatMessages = [`Interview Coach: ${response.message}`];
      this.interviewStarted = true;
      this.getNextQuestion();
      this.scrollToBottom();
    }, error => {
      console.error('startInterview error:', error);
      this.chatMessages = [`Interview Coach: Error starting interview: ${error.statusText}`];
      this.scrollToBottom();
    });
  }

  getNextQuestion() {
    console.log('getNextQuestion called');
    this.http.get<any>('api/questions/question', {
      headers: { 'Authorization': 'Basic YWRtaW46YWRtaW4=' }
    }).subscribe(response => {
      console.log('getNextQuestion response:', response);
      this.currentQuestionIndex = parseInt(response.index, 10);
      this.chatMessages.push(`Interview Coach: ${response.question}`);
      this.scrollToBottom();
    }, error => {
      console.error('getNextQuestion error:', error);
      this.chatMessages.push(`Interview Coach: Error getting question: ${error.statusText}`);
      this.scrollToBottom();
    });
  }

  sendAnswer(answer: string) {
    if (answer.trim() && this.currentQuestionIndex !== null && this.interviewStarted) {
      console.log('sendAnswer called with:', answer);
      this.chatMessages.push(`You: ${answer}`);
      this.scrollToBottom();

      const requestBody = {
        index: this.currentQuestionIndex,
        answer: answer,
        action: "submit",
        wantPlatform: false
      };

      this.http.post<any>('api/questions/answer', requestBody, {
        headers: { 'Authorization': 'Basic YWRtaW46YWRtaW4=' }
      }).subscribe(response => {
        console.log('sendAnswer response:', response);
        this.chatMessages.push(`Interview Coach: Score: ${response.score}, Feedback: ${response.feedback}`);
        if (response.platform_suggestion) {
          this.chatMessages.push(`Interview Coach: Platform Suggestion: ${response.platform_suggestion}`);
        }
        this.getNextQuestion();
        this.scrollToBottom();
      }, error => {
        console.error('sendAnswer error:', error);
        this.chatMessages.push(`Interview Coach: Error submitting answer: ${error.statusText}`);
        this.scrollToBottom();
      });
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 0);
  }
}