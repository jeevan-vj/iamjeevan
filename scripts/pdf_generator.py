#!/usr/bin/env python3
"""
Professional Resume PDF Generator
Creates ATS-friendly PDF using ReportLab with precise formatting control
"""

import argparse
import os
from datetime import datetime
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


class ResumeData:
    """Structured resume data"""
    
    def __init__(self):
        self.personal_info = {
            'name': 'Jeevan Wijerathna',
            'title': 'AWS, Azure, and Sitecore Certified Developer with over 10 years of experience in software development. Skilled in .NET technologies, cloud-native architectures, and backend development. Passionate about delivering scalable, maintainable solutions while adhering to best practices like Domain-Driven Design, Clean Code, and Test-Driven Development.',
            'email': 'Jeevan90wijerathna@gmail.com',
            'phone': '+64 22 67 33 146',
            'website': 'iamjeevan.com',
            'location': 'Auckland, New Zealand'
        }
        
        self.work_experience = [
            {
                'title': 'Technical Lead',
                'company': 'Datacom, New Zealand',
                'duration': '2023 - Present',
                'responsibilities': [
                    'Designed and reviewed new features with architects and team members for critical business applications',
                    'Implemented scalable backend solutions using .NET, C#, and Azure technologies',
                    'Enhanced application performance and optimized Azure costs by identifying and addressing bottlenecks',
                    'Led backlog grooming, prioritization, and technical discussions with business users',
                    'Modernized legacy applications by transitioning to cloud-native, decoupled architectures'
                ],
                'projects': [
                    {
                        'name': 'Fonterra Inventory Management System',
                        'description': 'Trace It is an inventory management system for Fonterra, New Zealand\'s largest dairy company',
                        'technologies': 'Oracle Apex, PL/SQL',
                        'achievements': [
                            'Implemented a new feature to track samples inventory',
                            'Introduced software engineering best practices to avoid/minimize deployment risks'
                        ]
                    },
                    {
                        'name': 'PGDB Application Portal',
                        'description': 'Developed a portal for managing licenses and certifications for NZ practitioners',
                        'technologies': '.NET, C#, WEB-API, Identity Server, React, Redux, Azure',
                        'achievements': [
                            'Implemented proactive application monitoring to ensure business continuity',
                            'Delivered scalable architectural solutions for critical business functions'
                        ]
                    },
                    {
                        'name': 'Southern Cross Applications',
                        'description': 'Supported and modernized various business-critical applications',
                        'technologies': '.NET, C#, WEB-API, React, Redux, Azure, Angular, Sitecore',
                        'achievements': [
                            'Ensured business continuity by resolving P1/P2 issues promptly',
                            'Migrated legacy applications to microservices architecture'
                        ]
                    }
                ]
            },
            {
                'title': 'Senior Software Engineer',
                'company': 'Kinesso, Malaysia',
                'duration': '2020 - 2022',
                'responsibilities': [
                    'Designed and implemented modernized legacy applications using microservices architecture',
                    'Developed GRPC services for inter-process communication and optimized database performance',
                    'Automated deployments using Jenkins and introduced DevOps practices',
                    'Integrated various data sources like Snowflake, Redshift, and Athena for analytics tools',
                    'Monitored application performance using DataDog and implemented CI/CD pipelines'
                ],
                'projects': [
                    {
                        'name': 'Magnifiq',
                        'description': 'Developed a business intelligence analytics tool with custom ETL and reporting capabilities',
                        'technologies': '.NET, GRPC, SQL Server, AWS, Docker, Jenkins, Snowflake',
                        'achievements': [
                            'Streamlined database development with Flyway for version control',
                            'Reduced manual deployment efforts by automating processes'
                        ]
                    },
                    {
                        'name': 'Apollo ETL Platform',
                        'description': 'Built an ETL orchestration platform using Dagster and developed a dashboard UI',
                        'technologies': '.NET, Web-API, Dagster, Python, AWS, Angular',
                        'achievements': [
                            'Migrated legacy ETL processes to a modern platform',
                            'Improved ETL performance and scalability'
                        ]
                    }
                ]
            },
            {
                'title': 'Software Engineer',
                'company': 'Sitecore, Malaysia',
                'duration': '2017 - 2022',
                'responsibilities': [
                    'Developed Sitecore platform modules to enhance CMS functionality with Azure Storage and CDN support',
                    'Implemented backend services using WEB-API and C#, and developed front-end applications using Angular',
                    'Set up CI pipelines and automated deployments using PowerShell and TeamCity',
                    'Participated in R&D, sprint planning, and cross-functional team collaboration'
                ]
            },
            {
                'title': 'Software Engineer',
                'company': 'CMS Pvt Ltd, Colombo, Sri Lanka',
                'duration': '2015 - 2017',
                'responsibilities': [
                    'Developed and maintained scalable e-commerce solutions for European markets',
                    'Modernized legacy systems and implemented responsive front-end designs',
                    'Optimized database performance and implemented caching mechanisms'
                ]
            },
            {
                'title': 'Software Engineer',
                'company': 'Bileeta Pvt Ltd, Sri Lanka',
                'duration': 'February 2013 - December 2014',
                'responsibilities': [
                    'Contributed to the development of an award-winning cloud ERP solution',
                    'Designed and implemented backend services and real-time features',
                    'Optimized database performance and implemented stored procedures'
                ]
            }
        ]
        
        self.skills = {
            'Languages & Frameworks': ['C#', '.NET Core', 'ASP.NET', 'React', 'Angular', 'JavaScript', 'TypeScript'],
            'Cloud & Infrastructure': ['Azure', 'AWS', 'Docker', 'Kubernetes', 'Microservices'],
            'DevOps & CI/CD': ['Azure DevOps', 'GitHub Actions', 'Jenkins', 'TeamCity'],
            'Databases & Storage': ['SQL Server', 'PostgreSQL', 'Oracle', 'Azure Storage'],
            'Testing & Quality': ['XUnit', 'SpecFlow', 'Pester', 'TDD', 'Clean Code'],
            'Architecture & Design': ['Domain-Driven Design', 'Clean Architecture', 'SOLID Principles']
        }
        
        self.education = {
            'institution': 'National School of Business Management, Sri Lanka',
            'degree': 'Bachelor of Science in Management Information Systems',
            'year': '2014'
        }
        
        self.certifications = [
            'AWS Certified Solution Architect Associate',
            'AWS Certified Developer',
            'Azure Certified Developer',
            'Sitecore 9 Certified Developer',
            'SAFe 4.0 Practitioner'
        ]
        
        self.personal_projects = [
            {
                'name': 'Resume Pro',
                'url': 'resumepro.iamjeevan.com',
                'description': 'Built an ATS-friendly resume generator using Next.js, React, and Tailwind CSS. Implemented modern UI with real-time preview and multiple templates.',
                'technologies': 'TypeScript, Next.js, React, Tailwind CSS'
            },
            {
                'name': 'Vanish Notes',
                'url': 'vanishnotes.iamjeevan.com',
                'description': 'Developed a self-destructive note sharing application. Implemented end-to-end encryption and auto-deletion features.',
                'technologies': 'Next.js, Node.js, MongoDB, Crypto.js'
            },
            {
                'name': 'NZ Salary Calculator',
                'url': 'nzsalarycalculator.iamjeevan.com',
                'description': 'Created a comprehensive salary calculator for New Zealand employees. Includes tax calculations, KiwiSaver, and other deductions.',
                'technologies': 'React, TypeScript, Tailwind CSS'
            },
            {
                'name': 'Flash Card Fest',
                'url': 'flash-card-fest.netlify.app',
                'description': 'Designed an AI-powered study flash card generator. Integrated with OpenAI API for automated content generation.',
                'technologies': 'React, OpenAI API, Node.js, Express'
            }
        ]


class ATSFriendlyPDFGenerator:
    """Generates ATS-friendly PDF resumes with professional formatting"""
    
    def __init__(self, output_path):
        self.output_path = output_path
        self.doc = SimpleDocTemplate(
            output_path,
            pagesize=letter,
            rightMargin=0.75*inch,
            leftMargin=0.75*inch,
            topMargin=0.75*inch,
            bottomMargin=0.75*inch
        )
        self.story = []
        self.styles = self._create_styles()
        
    def _create_styles(self):
        """Create ATS-friendly paragraph styles"""
        styles = getSampleStyleSheet()
        
        # Override default styles with ATS-friendly ones
        styles.add(ParagraphStyle(
            name='ATSName',
            parent=styles['Title'],
            fontSize=20,
            spaceAfter=6,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        ))
        
        styles.add(ParagraphStyle(
            name='ATSTitle',
            parent=styles['Normal'],
            fontSize=11,
            spaceAfter=12,
            alignment=TA_CENTER,
            fontName='Helvetica'
        ))
        
        styles.add(ParagraphStyle(
            name='ATSContact',
            parent=styles['Normal'],
            fontSize=10,
            spaceAfter=20,
            alignment=TA_CENTER,
            fontName='Helvetica'
        ))
        
        styles.add(ParagraphStyle(
            name='ATSSectionHeader',
            parent=styles['Heading2'],
            fontSize=12,
            spaceAfter=8,
            spaceBefore=16,
            fontName='Helvetica-Bold',
            textColor=colors.black
        ))
        
        styles.add(ParagraphStyle(
            name='ATSJobTitle',
            parent=styles['Normal'],
            fontSize=11,
            spaceAfter=2,
            fontName='Helvetica-Bold'
        ))
        
        styles.add(ParagraphStyle(
            name='ATSCompany',
            parent=styles['Normal'],
            fontSize=10,
            spaceAfter=2,
            fontName='Helvetica-Oblique'
        ))
        
        styles.add(ParagraphStyle(
            name='ATSDuration',
            parent=styles['Normal'],
            fontSize=10,
            spaceAfter=6,
            fontName='Helvetica'
        ))
        
        styles.add(ParagraphStyle(
            name='ATSBody',
            parent=styles['Normal'],
            fontSize=10,
            spaceAfter=4,
            fontName='Helvetica',
            alignment=TA_JUSTIFY
        ))
        
        styles.add(ParagraphStyle(
            name='ATSBullet',
            parent=styles['Normal'],
            fontSize=10,
            spaceAfter=3,
            fontName='Helvetica',
            leftIndent=20,
            bulletIndent=10
        ))
        
        return styles
    
    def add_header(self, data):
        """Add professional header section"""
        # Name
        self.story.append(Paragraph(data.personal_info['name'], self.styles['ATSName']))
        
        # Contact info in a single line
        contact_info = f"{data.personal_info['email']} | {data.personal_info['phone']} | {data.personal_info['website']} | {data.personal_info['location']}"
        self.story.append(Paragraph(contact_info, self.styles['ATSContact']))
        
        # Professional summary
        self.story.append(Paragraph(data.personal_info['title'], self.styles['ATSTitle']))
        
        # Add separator line
        self.story.append(Spacer(1, 6))
        
    def add_section_header(self, title):
        """Add section header with consistent formatting"""
        self.story.append(Paragraph(title.upper(), self.styles['ATSSectionHeader']))
        
    def add_work_experience(self, data):
        """Add work experience section"""
        self.add_section_header("Professional Experience")
        
        for job in data.work_experience:
            # Job title and duration on same line
            job_header_data = [
                [Paragraph(job['title'], self.styles['ATSJobTitle']), 
                 Paragraph(job['duration'], self.styles['ATSDuration'])]
            ]
            job_header_table = Table(job_header_data, colWidths=[4.5*inch, 2*inch])
            job_header_table.setStyle(TableStyle([
                ('ALIGN', (0, 0), (0, 0), 'LEFT'),
                ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ]))
            self.story.append(job_header_table)
            
            # Company
            self.story.append(Paragraph(job['company'], self.styles['ATSCompany']))
            
            # Responsibilities
            for responsibility in job['responsibilities']:
                bullet_text = f"• {responsibility}"
                self.story.append(Paragraph(bullet_text, self.styles['ATSBullet']))
            
            # Projects (if available)
            if 'projects' in job and job['projects']:
                self.story.append(Spacer(1, 6))
                self.story.append(Paragraph("<b>Key Projects:</b>", self.styles['ATSBody']))
                
                for project in job['projects']:
                    project_text = f"<b>{project['name']}:</b> {project['description']}"
                    self.story.append(Paragraph(project_text, self.styles['ATSBody']))
                    
                    tech_text = f"<i>Technologies:</i> {project['technologies']}"
                    self.story.append(Paragraph(tech_text, self.styles['ATSBody']))
                    
                    if 'achievements' in project:
                        for achievement in project['achievements']:
                            achievement_text = f"  • {achievement}"
                            self.story.append(Paragraph(achievement_text, self.styles['ATSBullet']))
            
            self.story.append(Spacer(1, 12))
    
    def add_skills(self, data):
        """Add skills section in a clean format"""
        self.add_section_header("Technical Skills")
        
        for category, skills in data.skills.items():
            skills_text = f"<b>{category}:</b> {', '.join(skills)}"
            self.story.append(Paragraph(skills_text, self.styles['ATSBody']))
        
        self.story.append(Spacer(1, 12))
    
    def add_education(self, data):
        """Add education section"""
        self.add_section_header("Education")
        
        education_data = [
            [Paragraph(f"<b>{data.education['degree']}</b>", self.styles['ATSBody']),
             Paragraph(data.education['year'], self.styles['ATSBody'])]
        ]
        education_table = Table(education_data, colWidths=[4.5*inch, 2*inch])
        education_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (0, 0), 'LEFT'),
            ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        self.story.append(education_table)
        self.story.append(Paragraph(data.education['institution'], self.styles['ATSBody']))
        self.story.append(Spacer(1, 12))
    
    def add_certifications(self, data):
        """Add certifications section"""
        self.add_section_header("Certifications")
        
        for cert in data.certifications:
            cert_text = f"• {cert}"
            self.story.append(Paragraph(cert_text, self.styles['ATSBullet']))
        
        self.story.append(Spacer(1, 12))
    
    def add_personal_projects(self, data):
        """Add personal projects section"""
        self.add_section_header("Personal Projects")
        
        for project in data.personal_projects:
            project_header = f"<b>{project['name']}</b> ({project['url']})"
            self.story.append(Paragraph(project_header, self.styles['ATSBody']))
            
            self.story.append(Paragraph(project['description'], self.styles['ATSBody']))
            
            tech_text = f"<i>Technologies:</i> {project['technologies']}"
            self.story.append(Paragraph(tech_text, self.styles['ATSBody']))
            
            self.story.append(Spacer(1, 8))
    
    def generate(self, data):
        """Generate the complete PDF"""
        self.add_header(data)
        self.add_work_experience(data)
        self.add_skills(data)
        self.add_education(data)
        self.add_certifications(data)
        self.add_personal_projects(data)
        
        # Build the PDF
        self.doc.build(self.story)
        print(f"✅ Professional ATS-friendly PDF generated: {self.output_path}")


def main():
    parser = argparse.ArgumentParser(description='Generate professional ATS-friendly PDF resume')
    parser.add_argument('--output', '-o',
                       default=None,
                       help='Output PDF file path (default: auto-generated)')
    
    args = parser.parse_args()
    
    # Get the script directory
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    
    # Output file path
    if args.output:
        output_path = Path(args.output)
    else:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_filename = f"Jeevan_Wijerathna_Resume_Professional_{timestamp}.pdf"
        output_path = project_root / output_filename
    
    print(f"🔄 Generating professional PDF resume...")
    print(f"📄 Output: {output_path}")
    
    # Create resume data
    resume_data = ResumeData()
    
    # Generate PDF
    pdf_generator = ATSFriendlyPDFGenerator(str(output_path))
    pdf_generator.generate(resume_data)
    
    # Show file info
    if output_path.exists():
        file_size = output_path.stat().st_size / 1024
        print(f"📊 File size: {file_size:.1f} KB")
        print(f"🎉 Professional resume PDF generated successfully!")
        print(f"\n✅ ATS Optimization Features:")
        print(f"   • Standard fonts (Helvetica family)")
        print(f"   • Clean, structured layout")
        print(f"   • Proper text hierarchy")
        print(f"   • No graphics or complex formatting")
        print(f"   • Fully selectable text")
        print(f"   • Standard letter-size pages")
    else:
        print("❌ Failed to generate PDF")
        return 1
    
    return 0


if __name__ == "__main__":
    exit(main())