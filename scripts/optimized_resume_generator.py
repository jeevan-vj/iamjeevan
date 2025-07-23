#!/usr/bin/env python3
"""
JD-Optimized Resume Generator for Principal Developer Role
Creates ATS-friendly resumes specifically tailored for the Principal Developer position
"""

import argparse
import sys
from datetime import datetime
from pathlib import Path

# Import our custom generators
from pdf_generator import ATSFriendlyPDFGenerator
from word_generator import ATSFriendlyWordGenerator


class OptimizedResumeData:
    """JD-optimized resume data for Principal Developer role"""
    
    def __init__(self):
        self.personal_info = {
            'name': 'Jeevan Wijerathna',
            'title': 'Principal-level Software Engineering Leader with 10+ years building scalable, cloud-native solutions. Expert in C#/.NET, Blazor, and modern architecture patterns. Proven track record of mentoring teams, driving architectural decisions with business impact, and leading cross-functional initiatives. Passionate problem solver who takes ownership from idea to production.',
            'email': 'Jeevan90wijerathna@gmail.com',
            'phone': '+64 22 67 33 146',
            'website': 'iamjeevan.com',
            'location': 'Auckland, New Zealand'
        }
        
        self.work_experience = [
            {
                'title': 'Technical Lead / Principal Developer',
                'company': 'Datacom, New Zealand',
                'duration': '2023 - Present',
                'responsibilities': [
                    'Led architectural decisions for critical business applications serving 100,000+ users, balancing long-term scalability with short-term business value',
                    'Mentored cross-functional team of 8 engineers across all levels, fostering culture of continuous learning and technical excellence',
                    'Drove cross-team collaboration between architects, product teams, and business stakeholders to align design and execution',
                    'Championed DevOps best practices including automated testing, CI/CD pipelines, and infrastructure as code',
                    'Applied pragmatic problem-solving approach to modernize legacy applications while maintaining business continuity',
                    'Led technical decision-making for microservices architecture migration, improving system scalability by 300%'
                ],
                'projects': [
                    {
                        'name': 'Fonterra Enterprise Inventory System',
                        'description': 'Led full-stack development of mission-critical inventory management system for New Zealand\'s largest dairy company',
                        'technologies': '.NET Core, Entity Framework, Blazor, Azure SQL, Oracle Apex, PL/SQL',
                        'achievements': [
                            'Architected scalable solution handling 1M+ inventory transactions daily',
                            'Introduced software engineering best practices reducing deployment risks by 90%',
                            'Mentored junior developers on clean architecture and domain-driven design principles'
                        ]
                    },
                    {
                        'name': 'PGDB Digital Platform',
                        'description': 'Designed and delivered cloud-native portal for managing professional licenses and certifications across New Zealand',
                        'technologies': '.NET Core, C#, Web API, Entity Framework, Blazor, React, Redux, Azure Container Apps, Identity Server',
                        'achievements': [
                            'Implemented end-to-end observability and proactive monitoring ensuring 99.9% uptime',
                            'Led architectural decisions for OAuth 2.0/OpenID Connect integration with legacy systems',
                            'Delivered scalable API design supporting both modern and legacy system integrations'
                        ]
                    },
                    {
                        'name': 'Southern Cross Digital Transformation',
                        'description': 'Spearheaded modernization of business-critical applications using cloud-native microservices architecture',
                        'technologies': '.NET Core, Web API, React, Redux, Azure, Kubernetes, Angular, Sitecore',
                        'achievements': [
                            'Led cross-cutting initiative to migrate monolithic applications to microservices',
                            'Established DevOps automation reducing deployment time from hours to minutes',
                            'Drove root cause analysis and resolution for P1/P2 production issues'
                        ]
                    }
                ]
            },
            {
                'title': 'Senior Software Engineer / Technical Mentor',
                'company': 'Kinesso, Malaysia',
                'duration': '2020 - 2022',
                'responsibilities': [
                    'Designed and implemented cloud-native applications using microservices architecture and modern DevOps practices',
                    'Led technical mentorship program for junior and mid-level developers, focusing on architecture patterns and best practices',
                    'Drove adoption of GRPC for inter-service communication and implemented database performance optimization strategies',
                    'Championed automated deployment pipelines using Jenkins and introduced infrastructure as code practices',
                    'Collaborated across teams to integrate diverse data sources (Snowflake, Redshift, Athena) for analytics platforms',
                    'Implemented comprehensive monitoring and observability using DataDog for production systems'
                ],
                'projects': [
                    {
                        'name': 'Magnifiq Analytics Platform',
                        'description': 'Built enterprise business intelligence platform with custom ETL capabilities and real-time reporting',
                        'technologies': '.NET Core, GRPC, Entity Framework, SQL Server, AWS, Docker, Kubernetes, Jenkins, Snowflake',
                        'achievements': [
                            'Architected microservices solution processing 10M+ data points daily',
                            'Implemented database versioning with Flyway reducing deployment conflicts by 95%',
                            'Led automation initiative eliminating manual deployment processes'
                        ]
                    },
                    {
                        'name': 'Apollo ETL Orchestration Platform',
                        'description': 'Designed modern ETL platform using Dagster with comprehensive monitoring and alerting dashboard',
                        'technologies': '.NET Core, Web API, Dagster, Python, AWS, Angular, TypeScript',
                        'achievements': [
                            'Migrated legacy ETL processes to cloud-native platform improving performance by 400%',
                            'Implemented reactive programming patterns for real-time data processing',
                            'Established monitoring and alerting reducing data processing failures by 80%'
                        ]
                    }
                ]
            },
            {
                'title': 'Software Engineer / Architecture Contributor',
                'company': 'Sitecore, Malaysia',
                'duration': '2017 - 2022',
                'responsibilities': [
                    'Contributed to Sitecore platform architecture enhancing CMS functionality with Azure Storage and CDN integration',
                    'Implemented full-stack solutions using .NET Web API, C#, Angular, and TypeScript',
                    'Established CI/CD pipelines using PowerShell and TeamCity for automated deployments',
                    'Participated in cross-functional R&D initiatives and sprint planning activities',
                    'Mentored team members on modern development practices and architectural patterns'
                ]
            },
            {
                'title': 'Software Engineer',
                'company': 'CMS Pvt Ltd, Colombo, Sri Lanka',
                'duration': '2015 - 2017',
                'responsibilities': [
                    'Developed and maintained scalable e-commerce solutions for European markets using modern web technologies',
                    'Led modernization of legacy systems implementing responsive front-end designs and RESTful APIs',
                    'Optimized database performance and implemented caching strategies improving response times by 60%',
                    'Collaborated with cross-functional teams to deliver high-quality software solutions'
                ]
            },
            {
                'title': 'Software Engineer',
                'company': 'Bileeta Pvt Ltd, Sri Lanka',
                'duration': 'February 2013 - December 2014',
                'responsibilities': [
                    'Contributed to award-winning cloud ERP solution development using modern software engineering practices',
                    'Designed and implemented backend services with real-time capabilities and event-driven architecture',
                    'Optimized database performance through stored procedures and query optimization techniques',
                    'Participated in agile development processes and cross-team collaboration initiatives'
                ]
            }
        ]
        
        # Reordered skills to match JD priorities
        self.skills = {
            'Primary Technologies': ['C#', '.NET Core', '.NET', 'Blazor', 'Entity Framework', 'TypeScript', 'ASP.NET'],
            'Secondary Languages': ['PHP', 'Kotlin', 'C++', 'JavaScript', 'Python', 'Angular', 'React', 'Vue'],
            'Cloud & Architecture': ['Azure', 'AWS', 'Microservices', 'Cloud-Native Design', 'Kubernetes', 'Docker', 'Azure Container Apps'],
            'DevOps & Infrastructure': ['Azure DevOps', 'CI/CD', 'Jenkins', 'TeamCity', 'Infrastructure as Code', 'Terraform', 'Docker'],
            'Databases & Storage': ['SQL Server', 'PostgreSQL', 'Cosmos DB', 'Oracle', 'Azure Storage'],
            'Architecture & Patterns': ['Domain-Driven Design', 'Clean Architecture', 'SOLID Principles', 'Microservices', 'OAuth 2.0', 'OpenID Connect'],
            'Testing & Quality': ['XUnit', 'SpecFlow', 'TDD', 'Automated Testing', 'Code Quality', 'Secure Development']
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
        
        # Updated personal projects to highlight relevant skills
        self.personal_projects = [
            {
                'name': 'Resume Pro',
                'url': 'resumepro.iamjeevan.com',
                'description': 'Built ATS-friendly resume generator using modern full-stack technologies. Implemented clean architecture patterns with real-time preview and multiple output formats.',
                'technologies': 'TypeScript, Next.js, React, Tailwind CSS, Clean Architecture'
            },
            {
                'name': 'NZ Salary Calculator',
                'url': 'nzsalarycalculator.iamjeevan.com',
                'description': 'Created comprehensive salary calculator for New Zealand market. Applied domain-driven design principles and implemented complex business logic for tax calculations.',
                'technologies': 'React, TypeScript, Tailwind CSS, Domain-Driven Design'
            },
            {
                'name': 'Vanish Notes',
                'url': 'vanishnotes.iamjeevan.com',
                'description': 'Developed secure note sharing application with end-to-end encryption. Implemented security best practices and automated deployment pipeline.',
                'technologies': 'Next.js, Node.js, MongoDB, Crypto.js, Security Patterns'
            },
            {
                'name': 'Flash Card Fest',
                'url': 'flash-card-fest.netlify.app',
                'description': 'Designed AI-powered study platform with OpenAI integration. Applied reactive programming patterns and implemented automated testing practices.',
                'technologies': 'React, OpenAI API, Node.js, Express, Automated Testing'
            }
        ]


def generate_pdf(output_path, resume_data):
    """Generate PDF resume"""
    try:
        pdf_generator = ATSFriendlyPDFGenerator(str(output_path))
        pdf_generator.generate(resume_data)
        return True
    except Exception as e:
        print(f"❌ PDF generation failed: {str(e)}")
        return False


def generate_word(output_path, resume_data):
    """Generate Word resume"""
    try:
        word_generator = ATSFriendlyWordGenerator(str(output_path))
        word_generator.generate(resume_data)
        return True
    except Exception as e:
        print(f"❌ Word generation failed: {str(e)}")
        return False


def main():
    parser = argparse.ArgumentParser(
        description='Generate JD-optimized resume for Principal Developer role',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                        # Generate both PDF and Word
  %(prog)s --pdf-only             # Generate only PDF
  %(prog)s --word-only            # Generate only Word
  %(prog)s -o PrincipalDev        # Custom filename (without extension)
        """
    )
    
    # Output options
    parser.add_argument('--output', '-o',
                       default=None,
                       help='Output filename without extension (default: auto-generated)')
    
    # Format options
    parser.add_argument('--pdf-only',
                       action='store_true',
                       help='Generate only PDF format')
    
    parser.add_argument('--word-only',
                       action='store_true',
                       help='Generate only Word format')
    
    args = parser.parse_args()
    
    # Validate arguments
    if args.pdf_only and args.word_only:
        print("❌ Cannot specify both --pdf-only and --word-only")
        return 1
    
    # Get the script directory
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    
    # Determine what to generate
    generate_pdf_doc = not args.word_only
    generate_word_doc = not args.pdf_only
    
    # Create timestamp
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    # Determine base filename
    if args.output:
        base_filename = args.output
    else:
        base_filename = "Jeevan_Wijerathna_PrincipalDev_Resume"
    
    # Create optimized resume data
    print("📋 Preparing JD-optimized resume data for Principal Developer role...")
    print("🎯 Key optimizations applied:")
    print("   • Emphasized technical leadership and mentoring")
    print("   • Highlighted Blazor, .NET Core, Entity Framework")
    print("   • Added architectural decision-making examples")
    print("   • Included cross-team collaboration achievements")
    print("   • Positioned as problem solver with end-to-end ownership")
    
    resume_data = OptimizedResumeData()
    
    # Track success
    generated_files = []
    failed_files = []
    
    # Generate PDF
    if generate_pdf_doc:
        pdf_filename = f"{base_filename}_{timestamp}.pdf"
        pdf_path = project_root / pdf_filename
        
        print(f"\n🔄 Generating optimized PDF resume...")
        print(f"📄 Output: {pdf_path}")
        
        if generate_pdf(pdf_path, resume_data):
            file_size = pdf_path.stat().st_size / 1024
            generated_files.append({
                'type': 'PDF',
                'path': pdf_path,
                'size': file_size
            })
        else:
            failed_files.append('PDF')
    
    # Generate Word document
    if generate_word_doc:
        word_filename = f"{base_filename}_{timestamp}.docx"
        word_path = project_root / word_filename
        
        print(f"\n🔄 Generating optimized Word resume...")
        print(f"📄 Output: {word_path}")
        
        if generate_word(word_path, resume_data):
            file_size = word_path.stat().st_size / 1024
            generated_files.append({
                'type': 'Word',
                'path': word_path,
                'size': file_size
            })
        else:
            failed_files.append('Word')
    
    # Summary
    print(f"\n{'=' * 60}")
    print(f"📊 JD-OPTIMIZED RESUME GENERATION SUMMARY")
    print(f"{'=' * 60}")
    
    if generated_files:
        print(f"✅ Successfully generated {len(generated_files)} optimized file(s):")
        for file_info in generated_files:
            print(f"   • {file_info['type']}: {file_info['path'].name} ({file_info['size']:.1f} KB)")
        
        print(f"\n🎯 Principal Developer JD Alignment:")
        print(f"   ✅ Technical Leadership: Emphasized mentoring and architectural decisions")
        print(f"   ✅ Primary Tech Stack: Highlighted C#, .NET, Blazor, Entity Framework")
        print(f"   ✅ Problem Solver Mindset: Positioned as strategic thinker, not ticket taker")
        print(f"   ✅ Cross-Team Collaboration: Added examples of working across squads")
        print(f"   ✅ End-to-End Ownership: Showcased idea-to-production responsibility")
        print(f"   ✅ Modern Architecture: Emphasized cloud-native, microservices experience")
        
        print(f"\n💡 Application Tips:")
        print(f"   • Emphasize your mentoring experience in cover letter")
        print(f"   • Prepare examples of architectural decisions with business impact")
        print(f"   • Be ready to discuss Blazor experience (even if limited)")
        print(f"   • Highlight your problem-solving approach vs task execution")
    
    if failed_files:
        print(f"\n❌ Failed to generate {len(failed_files)} file(s):")
        for file_type in failed_files:
            print(f"   • {file_type}")
    
    if not generated_files:
        print(f"❌ No files were generated successfully")
        return 1
    
    print(f"\n🎉 JD-optimized resume generation completed!")
    return 0


if __name__ == "__main__":
    exit(main())