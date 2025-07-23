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
      sector: 'Software Development, IT Solutions',
      description: 'Provides digital and software solutions, specializing in custom software and IT services, with internship opportunities in software development.',
      linkedin: 'https://www.linkedin.com/company/sfm-technologies',
      interns: 5
    },
    {
      name: 'Sopra HR Software',
      sector: 'HR Software, Digital Transformation',
      description: 'A Sopra Steria subsidiary offering comprehensive HR solutions, including payroll and talent management, with internships in software development and HR digitalization.',
      linkedin: 'https://www.linkedin.com/company/sopra-hr-software',
      interns: 3
    },
    {
      name: 'VERMEG for Banking & Insurance Software',
      sector: 'Financial Software, Banking & Insurance',
      description: 'Specializes in software for banking, capital markets, and insurance, offering solutions for regulatory reporting, collateral management, and digital transformation.',
      linkedin: 'https://www.linkedin.com/company/vermeg',
      interns: 4
    },
    {
      name: 'Devoteam',
      sector: 'IT Consulting, Digital Transformation',
      description: 'Provides IT consulting and digital transformation services, with internship opportunities in IT management, cloud solutions, and software development.',
      linkedin: 'https://www.linkedin.com/company/devoteam',
      interns: 6
    },
    {
      name: 'Inetum',
      sector: 'IT Services, Digital Solutions',
      description: 'A global digital services company supporting digital transformation with innovative IT solutions, offering internships in software development and IT consulting.',
      linkedin: 'https://www.linkedin.com/company/inetum',
      interns: 5
    },
    {
      name: 'ELYADATA',
      sector: 'Artificial Intelligence, Data Science',
      description: 'Specializes in AI, machine learning, and data processing solutions, offering internships in AI development and data science.',
      linkedin: 'https://www.linkedin.com/company/elyadata',
      interns: 3
    },
    {
      name: 'Genitech Tunisie',
      sector: 'Software Development, Digital Solutions',
      description: 'A Docaposte subsidiary providing enterprise software solutions, with internships in software development and digital platforms.',
      linkedin: 'https://www.linkedin.com/company/genitech-tunisie',
      interns: 4
    },
    {
      name: 'KPMG Tunisie',
      sector: 'Consulting, IT Advisory',
      description: 'Offers consulting services with a focus on IT advisory and financial systems, providing internships in IT consulting and digital transformation for the banking sector.',
      linkedin: 'https://www.linkedin.com/company/kpmg-tunisie',
      interns: 3
    },
    {
      name: 'BNA',
      sector: 'Banking, IT Systems',
      description: 'A major Tunisian bank with IT projects, offering internships in banking systems and software development.',
      linkedin: 'https://www.linkedin.com/company/bna',
      interns: 4
    },
    {
      name: 'Talan',
      sector: 'Data Science, IT Consulting',
      description: 'Specializes in data science and digital transformation, offering internships in data analysis, AI, and software development.',
      linkedin: 'https://www.linkedin.com/company/talan',
      interns: 5
    },
    {
      name: 'Focus Corporation',
      sector: 'Software Development, IT Consulting',
      description: 'Provides software development and IT consulting services, with internships in software engineering and IT solutions.',
      linkedin: 'https://www.linkedin.com/company/focus-corporation',
      interns: 4
    },
    {
      name: 'Integration Objects',
      sector: 'Automation, Software Development',
      description: 'Specializes in industrial automation and IoT solutions, offering internships in software development and automation systems.',
      linkedin: 'https://www.linkedin.com/company/integration-objects',
      interns: 3
    },
    {
      name: 'Proxym IT',
      sector: 'IT Services, Software Development',
      description: 'Provides IT services and software solutions, with internships in software development and IT infrastructure.',
      linkedin: 'https://www.linkedin.com/company/proxym-it',
      interns: 4
    },
    {
      name: 'Think-it',
      sector: 'Software Development, AI',
      description: 'Focuses on software development and AI-driven solutions, offering internships in software engineering and artificial intelligence.',
      linkedin: 'https://www.linkedin.com/company/think-it',
      interns: 3
    },
    {
      name: 'MaibornWolff GmbH',
      sector: 'IT Consulting, Software Development',
      description: 'Provides IT consulting and software development services, with internships in software engineering and IT solutions.',
      linkedin: 'https://www.linkedin.com/company/maibornwolff',
      interns: 4
    },
    {
      name: 'Tuninfoforyou',
      sector: 'Web Development, IT Solutions',
      description: 'Specializes in web and mobile app development, offering internships in web development and software engineering.',
      linkedin: 'https://www.linkedin.com/company/tuninfoforyou',
      interns: 3
    },
    {
      name: 'Vneuron',
      sector: 'RegTech, Software Development',
      description: 'Provides regulatory compliance software solutions, with internships in software development and RegTech.',
      linkedin: 'https://www.linkedin.com/company/vneuron',
      interns: 4
    },
    {
      name: 'Wevioo',
      sector: 'IT Consulting, Software Development',
      description: 'Offers IT consulting and software development services, with internship opportunities in software engineering and digital transformation.',
      linkedin: 'https://www.linkedin.com/company/wevioo',
      interns: 5
    },
    {
      name: 'AXE Finance',
      sector: 'Financial Software, Software Development',
      description: 'Specializes in financial software for banking and finance, offering internships in software development.',
      linkedin: 'https://www.linkedin.com/company/axe-finance',
      interns: 3
    },
    {
      name: 'Sofia Technologies',
      sector: 'Software Development, IT Services',
      description: 'Provides software development and IT services, with internships in software engineering.',
      linkedin: 'https://www.linkedin.com/company/sofia-technologies',
      interns: 4
    },
    {
      name: 'PwC Tunisia',
      sector: 'Consulting, Digital Transformation',
      description: 'Offers consulting services with a focus on digital transformation, providing internships in IT systems and software development.',
      linkedin: 'https://www.linkedin.com/company/pwc-tunisia',
      interns: 3
    },
    {
      name: 'BIAT',
      sector: 'Banking, IT Systems',
      description: 'A leading Tunisian bank with IT projects, offering internships in banking systems and software development.',
      linkedin: 'https://www.linkedin.com/company/biat',
      interns: 4
    },
    {
      name: 'Arabsoft',
      sector: 'Software Development, IT Solutions',
      description: 'Provides software solutions and IT services, with internships in software development.',
      linkedin: 'https://www.linkedin.com/company/arabsoft',
      interns: 3
    },
    {
      name: 'Ericsson',
      sector: 'Telecommunications, Software Development',
      description: 'Global telecom leader with a Tunisian branch, offering internships in software development and telecom systems.',
      linkedin: 'https://www.linkedin.com/company/ericsson',
      interns: 5
    },
    {
      name: 'Proxym Group',
      sector: 'IT Services, Distribution',
      description: 'Provides IT services and technology distribution, with internships in software development and IT solutions.',
      linkedin: 'https://www.linkedin.com/company/proxym-group',
      interns: 4
    },
    {
      name: 'Coficab',
      sector: 'Automotive, Cable Manufacturing',
      description: 'Specializes in automotive cables and wiring, with limited IT-related internships focused on industrial software solutions.',
      linkedin: 'https://www.linkedin.com/company/coficab',
      interns: 2
    },
    {
      name: 'Cognira',
      sector: 'Artificial Intelligence, Retail Software',
      description: 'Develops AI solutions for retail and commerce, offering internships in AI and software development.',
      linkedin: 'https://www.linkedin.com/company/cognira',
      interns: 3
    },
    {
      name: 'Cynoia',
      sector: 'Software Development, Collaboration Tools',
      description: 'A tech startup developing collaboration and productivity tools, offering internships in software development.',
      linkedin: 'https://www.linkedin.com/company/cynoia',
      interns: 3
    },
    {
      name: 'Sotetel',
      sector: 'Telecommunications, IT Services',
      description: 'A Tunisie Telecom subsidiary providing IT and telecom services, with internships in software development and network systems.',
      linkedin: 'https://www.linkedin.com/company/sotetel',
      interns: 4
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