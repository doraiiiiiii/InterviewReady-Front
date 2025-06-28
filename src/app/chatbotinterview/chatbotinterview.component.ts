import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface LoginResponse {
    token: string;
}

interface StartResponse {
    message: string;
}

interface QuestionResponse {
    question: string;
}

interface AnswerResponse {
    score: number;
    feedback: string;
    platform_suggestion?: string;
}

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
    jwtToken: string | null = null;

    constructor(private http: HttpClient) {}

    ngOnInit() {}

    authenticate(): Observable<any> {
        const credentials = { username: 'user', password: 'password' };
        return this.http.post<LoginResponse>('api/auth/login', credentials, {
            headers: { 'Content-Type': 'application/json' }
        }).pipe(
            tap((response: LoginResponse) => {
                this.jwtToken = response.token;
                console.log('Authenticated, token:', this.jwtToken);
            })
        );
    }

    openChatbot() {
        console.log('openChatbot called');
        this.isChatOpen = true;
        this.authenticate().subscribe({
            next: () => this.startInterview(),
            error: (error: any) => {
                console.error('Authentication error:', error);
                this.chatMessages = [`Interview Coach: Error authenticating: ${error.statusText || 'Unknown error'}`];
                this.scrollToBottom();
            }
        });
    }

    closeChatbot() {
        console.log('closeChatbot called');
        this.isChatOpen = false;
        this.chatMessages = [];
        this.currentQuestionIndex = null;
        this.interviewStarted = false;
        this.jwtToken = null;
    }

    startInterview() {
        console.log('startInterview called');
        this.http.get<StartResponse>('api/questions/start', {
            headers: { Authorization: `Bearer ${this.jwtToken || ''}` }
        }).subscribe({
            next: (response: StartResponse) => {
                console.log('startInterview response:', response);
                this.chatMessages = [`Interview Coach: ${response.message}`];
                this.interviewStarted = true;
                this.getNextQuestion();
                this.scrollToBottom();
            },
            error: (error: any) => {
                console.error('startInterview error:', error);
                this.chatMessages = [`Interview Coach: Error starting interview: ${error.statusText || 'Unknown error'}`];
                this.scrollToBottom();
            }
        });
    }

    getNextQuestion() {
        console.log('getNextQuestion called, token:', this.jwtToken);
        this.http.get<QuestionResponse>('api/questions/question', {
            headers: { Authorization: `Bearer ${this.jwtToken || ''}` }
        }).subscribe({
            next: (response: QuestionResponse) => {
                console.log('getNextQuestion response:', response);
                this.currentQuestionIndex = (this.currentQuestionIndex || 0) + 1;
                this.chatMessages.push(`Interview Coach: ${response.question}`);
                this.scrollToBottom();
            },
            error: (error: any) => {
                console.error('getNextQuestion error:', error);
                this.chatMessages.push(`Interview Coach: Error getting question: ${error.statusText || 'Unknown error'}`);
                this.scrollToBottom();
            }
        });
    }

    sendAnswer(answer: string) {
        if (answer.trim() && this.currentQuestionIndex !== null && this.interviewStarted) {
            console.log('sendAnswer called with:', answer);
            this.chatMessages.push(`You: ${answer}`);
            this.scrollToBottom();

            const requestBody = {
                index: this.currentQuestionIndex,
                answer,
                action: 'submit',
                wantPlatform: false
            };

            this.http.post<AnswerResponse>('api/questions/answer', requestBody, {
                headers: { Authorization: `Bearer ${this.jwtToken || ''}` }
            }).subscribe({
                next: (response: AnswerResponse) => {
                    console.log('sendAnswer response:', response);
                    this.chatMessages.push(`Interview Coach: Score: ${response.score}, Feedback: ${response.feedback}`);
                    if (response.platform_suggestion) {
                        this.chatMessages.push(`Interview Coach: Platform Suggestion: ${response.platform_suggestion}`);
                    }
                    this.getNextQuestion();
                    this.scrollToBottom();
                },
                error: (error: any) => {
                    console.error('sendAnswer error:', error);
                    this.chatMessages.push(`Interview Coach: Error submitting answer: ${error.statusText || 'Unknown error'}`);
                    this.scrollToBottom();
                }
            });
        }
    }

    private scrollToBottom() {
        setTimeout(() => {
            if (this.chatContainer?.nativeElement) {
                this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
            }
        }, 0);
    }
}