import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-listing.component.html',
  styleUrls: ['./company-listing.component.css']
})
export class CompanyListingComponent implements AfterViewInit {
  companies = [
    {
      name: 'SFM Technologies',
      interns: 3,
      sector: 'Software Development, IT Solutions',
      description: 'Provides digital and software solutions, with internship opportunities in software development.',
      linkedin: 'https://www.linkedin.com/company/sfm-technologies'
    },
    {
      name: 'Sopra HR Software',
      interns: 3,
      sector: 'HR Software, Software Development',
      description: 'Specializes in HR software solutions, offering internships in software development.',
      linkedin: 'https://www.linkedin.com/company/sopra-hr-software'
    },
    {
      name: 'STEG',
      interns: 3,
      sector: 'Energy, with IT Division',
      description: 'Public company with IT projects for energy management, offering internships in IT systems.',
      linkedin: 'https://www.linkedin.com/company/steg'
    },
    {
      name: 'Poulina Group Holding',
      interns: 3,
      sector: 'Diversified, with IT Division',
      description: 'Diversified group with internship opportunities in IT management systems.',
      linkedin: 'https://www.linkedin.com/company/poulina-group-holding'
    },
    {
      name: 'ST2i',
      interns: 3,
      sector: 'IT Services, Software Development',
      description: 'Provides IT integration and software development services, with internships in IT.',
      linkedin: 'https://www.linkedin.com/company/st2i'
    },
    {
      name: 'ELYADATA',
      interns: 3,
      sector: 'Artificial Intelligence, Data Processing',
      description: 'Specializes in AI and data processing, offering internships in machine learning and software development.',
      linkedin: 'https://www.linkedin.com/company/elyadata'
    },
    {
      name: 'Genitech Tunisie',
      interns: 3,
      sector: 'Software Development, Digital Solutions',
      description: 'Docaposte subsidiary, offering internships in software development for enterprise solutions.',
      linkedin: 'https://www.linkedin.com/company/genitech-tunisie'
    },
    {
      name: 'KPMG Tunisie',
      interns: 3,
      sector: 'Consulting, with IT/Digital Division',
      description: 'Offers internships in IT consulting or financial systems for the banking sector.',
      linkedin: 'https://www.linkedin.com/company/kpmg-tunisie'
    },
    {
      name: 'BNA',
      interns: 2,
      sector: 'Banking, with IT Division',
      description: 'Offers internships in banking systems or software development.',
      linkedin: 'https://www.linkedin.com/company/bna'
    },
    {
      name: 'Data Geeks Consulting',
      interns: 2,
      sector: 'Data Science, Software Development',
      description: 'Specializes in data science, offering internships in data analysis and software development.',
      linkedin: 'https://www.linkedin.com/company/data-geeks-consulting'
    },
    {
      name: 'Focus Corporation',
      interns: 2,
      sector: 'Software Development, IT Consulting',
      description: 'Provides software development and consulting services, with internships in IT.',
      linkedin: 'https://www.linkedin.com/company/focus-corporation'
    },
    {
      name: 'Integration Objects',
      interns: 2,
      sector: 'Automation, Software Development',
      description: 'Specializes in industrial automation, offering internships in software development.',
      linkedin: 'https://www.linkedin.com/company/integration-objects'
    },
    {
      name: 'Proxym IT',
      interns: 2,
      sector: 'IT Services, Software Development',
      description: 'Provides IT services and software solutions, with internships in development.',
      linkedin: 'https://www.linkedin.com/company/proxym-it'
    },
    {
      name: 'Think-it',
      interns: 2,
      sector: 'Software Development, AI',
      description: 'Offers internships in software development and artificial intelligence.',
      linkedin: 'https://www.linkedin.com/company/think-it'
    },
    {
      name: 'TOPNET',
      interns: 2,
      sector: 'Telecommunications, IT Solutions',
      description: 'Internet service provider, offering internships in IT systems and software development.',
      linkedin: 'https://www.linkedin.com/company/topnet'
    },
    {
      name: 'Tuninfoforyou',
      interns: 2,
      sector: 'Web Development, IT Solutions',
      description: 'Specializes in web and mobile development, offering internships in these areas.',
      linkedin: 'https://www.linkedin.com/company/tuninfoforyou'
    },
    {
      name: 'Vneuron',
      interns: 2,
      sector: 'RegTech Software, Software Development',
      description: 'Provides software solutions for regulatory compliance, with internships in development.',
      linkedin: 'https://www.linkedin.com/company/vneuron'
    },
    {
      name: 'Wevioo',
      interns: 2,
      sector: 'IT Consulting, Software Development',
      description: 'Offers IT consulting and software development services, with internship opportunities.',
      linkedin: 'https://www.linkedin.com/company/wevioo'
    },
    {
      name: 'AXE Finance',
      interns: 2,
      sector: 'Financial Software, Software Development',
      description: 'Specializes in financial software solutions, offering internships in development.',
      linkedin: 'https://www.linkedin.com/company/axe-finance'
    },
    {
      name: 'Sofia Technologies',
      interns: 2,
      sector: 'Software Development, IT',
      description: 'Provides software development services, with internships in IT.',
      linkedin: 'https://www.linkedin.com/company/sofia-technologies'
    },
    {
      name: 'Ooredoo Tunisie',
      interns: 2,
      sector: 'Telecommunications, Digital Solutions',
      description: 'Telecom operator with digital projects, offering internships in software development.',
      linkedin: 'https://www.linkedin.com/company/ooredoo-tunisie'
    },
    {
      name: 'BIAT',
      interns: 1,
      sector: 'Banking, with IT Division',
      description: 'Major bank with internship opportunities in banking systems.',
      linkedin: 'https://www.linkedin.com/company/biat'
    },
    {
      name: 'Arabsoft',
      interns: 1,
      sector: 'Software Development',
      description: 'Provides software solutions, with internships in development.',
      linkedin: 'https://www.linkedin.com/company/arabsoft'
    },
    {
      name: 'Ericsson',
      interns: 1,
      sector: 'Telecommunications, Software Development',
      description: 'Multinational with a Tunisian branch, offering internships in software and telecoms.',
      linkedin: 'https://www.linkedin.com/company/ericsson'
    },
    {
      name: 'INETUM (formerly GFI)',
      interns: 1,
      sector: 'IT Services, Software Development',
      description: 'Provides IT and digital services, with internships in software development.',
      linkedin: 'https://www.linkedin.com/company/inetum'
    },
    {
      name: 'Nokia',
      interns: 1,
      sector: 'Telecommunications, Software Development',
      description: 'Multinational with projects in Tunisia, offering internships in software and telecoms.',
      linkedin: 'https://www.linkedin.com/company/nokia'
    },
    {
      name: 'Orange',
      interns: 1,
      sector: 'Telecommunications, Digital Solutions',
      description: 'Provides digital services, with internships in software development.',
      linkedin: 'https://www.linkedin.com/company/orange'
    },
    {
      name: 'Cognira',
      interns: 1,
      sector: 'Artificial Intelligence, Software Development',
      description: 'Specializes in AI for commerce, offering internships in software development.',
      linkedin: 'https://www.linkedin.com/company/cognira'
    },
    {
      name: 'Cynoia',
      interns: 1,
      sector: 'Software Development, Startups',
      description: 'Tech startup, offering internships in software development.',
      linkedin: 'https://www.linkedin.com/company/cynoia'
    },
    {
      name: 'Sotetel',
      interns: 1,
      sector: 'Telecommunications, IT Services',
      description: 'Tunisie Telecom subsidiary, offering internships in IT and software development.',
      linkedin: 'https://www.linkedin.com/company/sotetel'
    }
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const companyCards = this.el.nativeElement.querySelectorAll('.company-card');
    companyCards.forEach((card: HTMLElement) => observer.observe(card));
  }
}