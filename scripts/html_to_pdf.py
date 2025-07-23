#!/usr/bin/env python3
"""
HTML to ATS-Friendly PDF Converter
Converts resume.html to an ATS-optimized PDF format
"""

import os
import sys
from pathlib import Path
import weasyprint
from bs4 import BeautifulSoup
import argparse
from datetime import datetime

def optimize_html_for_ats(html_content):
    """
    Optimize HTML content for ATS compatibility
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remove print button and non-essential elements
    print_elements = soup.find_all(class_='no-print')
    for element in print_elements:
        element.decompose()
    
    # Ensure proper heading hierarchy for ATS
    headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
    for heading in headings:
        # Add explicit text content for better ATS parsing
        if heading.string:
            heading.string = heading.get_text().strip()
    
    # Optimize lists for ATS readability
    lists = soup.find_all(['ul', 'ol'])
    for list_elem in lists:
        list_items = list_elem.find_all('li')
        for li in list_items:
            # Ensure list items have clear text content
            text = li.get_text().strip()
            if text:
                li.clear()
                li.string = f"• {text}" if list_elem.name == 'ul' else f"{li.parent.index(li) + 1}. {text}"
    
    # Add ATS-friendly CSS for better parsing
    ats_css = """
    <style>
        /* ATS-Optimized Styles */
        * {
            font-family: Arial, sans-serif !important;
            line-height: 1.4 !important;
        }
        
        body {
            margin: 0;
            padding: 20px;
            font-size: 11pt;
            color: #000;
            background: #fff;
        }
        
        .container {
            max-width: 8.5in;
            margin: 0 auto;
        }
        
        h1 {
            font-size: 18pt;
            font-weight: bold;
            margin: 0 0 8pt 0;
            page-break-after: avoid;
        }
        
        h2 {
            font-size: 14pt;
            font-weight: bold;
            margin: 16pt 0 8pt 0;
            page-break-after: avoid;
            border-bottom: 1pt solid #000;
            padding-bottom: 2pt;
        }
        
        h3 {
            font-size: 12pt;
            font-weight: bold;
            margin: 12pt 0 4pt 0;
            page-break-after: avoid;
        }
        
        h4, h5 {
            font-size: 11pt;
            font-weight: bold;
            margin: 8pt 0 4pt 0;
            page-break-after: avoid;
        }
        
        p {
            margin: 0 0 6pt 0;
            text-align: left;
        }
        
        ul, ol {
            margin: 6pt 0;
            padding-left: 20pt;
        }
        
        li {
            margin: 2pt 0;
            page-break-inside: avoid;
        }
        
        .header {
            text-align: center;
            margin-bottom: 20pt;
            page-break-after: avoid;
        }
        
        .contact-info {
            text-align: center;
            margin: 8pt 0;
        }
        
        .contact-info span,
        .contact-info a {
            margin: 0 8pt;
            text-decoration: none;
            color: #000;
        }
        
        .section {
            margin: 16pt 0;
            page-break-inside: avoid;
        }
        
        .experience-item,
        .project-item,
        .education-item,
        .personal-project {
            margin: 12pt 0;
            page-break-inside: avoid;
        }
        
        .experience-header,
        .project-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 4pt;
        }
        
        .job-title,
        .project-name {
            font-weight: bold;
            font-size: 12pt;
        }
        
        .job-dates,
        .project-duration {
            font-style: italic;
            font-size: 10pt;
        }
        
        .company {
            font-style: italic;
            margin-bottom: 6pt;
        }
        
        .tech-stack {
            margin: 6pt 0;
        }
        
        .tech-tag,
        .certification-tag {
            display: inline-block;
            margin: 2pt 4pt 2pt 0;
            padding: 2pt 6pt;
            border: 1pt solid #666;
            border-radius: 3pt;
            font-size: 9pt;
            background: #f5f5f5;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12pt;
            margin: 12pt 0;
        }
        
        .skill-category h3 {
            font-size: 11pt;
            margin-bottom: 4pt;
        }
        
        .certifications-list {
            margin: 8pt 0;
        }
        
        .url {
            font-style: italic;
            color: #666;
            font-size: 10pt;
        }
        
        /* Page break controls */
        .section-title {
            page-break-after: avoid;
        }
        
        .experience-item,
        .personal-project {
            page-break-inside: avoid;
        }
        
        /* Print-specific styles */
        @media print {
            body { print-color-adjust: exact; }
            .no-print { display: none !important; }
        }
        
        /* Remove any animations or transitions for ATS */
        * {
            animation: none !important;
            transition: none !important;
        }
        
        /* Ensure text is selectable and copyable */
        * {
            user-select: text !important;
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
        }
    </style>
    """
    
    # Replace existing styles with ATS-optimized ones
    existing_styles = soup.find_all('style')
    for style in existing_styles:
        style.decompose()
    
    # Add the ATS CSS
    soup.head.append(BeautifulSoup(ats_css, 'html.parser'))
    
    return str(soup)

def convert_html_to_pdf(html_file_path, output_pdf_path, optimize_for_ats=True):
    """
    Convert HTML file to ATS-friendly PDF
    """
    try:
        # Read the HTML file
        with open(html_file_path, 'r', encoding='utf-8') as file:
            html_content = file.read()
        
        # Optimize for ATS if requested
        if optimize_for_ats:
            print("Optimizing HTML for ATS compatibility...")
            html_content = optimize_html_for_ats(html_content)
        
        # Configure CSS for PDF generation
        css_string = """
        @page {
            size: Letter;
            margin: 0.75in;
        }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.4;
            color: #000;
        }
        """
        
        # Create PDF
        print(f"Converting HTML to PDF...")
        html_doc = weasyprint.HTML(string=html_content)
        css_doc = weasyprint.CSS(string=css_string)
        
        html_doc.write_pdf(
            output_pdf_path,
            stylesheets=[css_doc],
            optimize_images=True
        )
        
        print(f"✅ PDF successfully created: {output_pdf_path}")
        return True
        
    except Exception as e:
        print(f"❌ Error converting HTML to PDF: {str(e)}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Convert HTML resume to ATS-friendly PDF')
    parser.add_argument('--input', '-i', 
                       default='public/resume.html',
                       help='Input HTML file path (default: public/resume.html)')
    parser.add_argument('--output', '-o',
                       default=None,
                       help='Output PDF file path (default: auto-generated)')
    parser.add_argument('--no-ats-optimization',
                       action='store_true',
                       help='Skip ATS optimization')
    
    args = parser.parse_args()
    
    # Get the script directory
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    
    # Input file path
    input_path = project_root / args.input
    
    if not input_path.exists():
        print(f"❌ Input file not found: {input_path}")
        sys.exit(1)
    
    # Output file path
    if args.output:
        output_path = Path(args.output)
    else:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_filename = f"Jeevan_Wijerathna_Resume_ATS_{timestamp}.pdf"
        output_path = project_root / output_filename
    
    # Convert
    optimize_ats = not args.no_ats_optimization
    
    print(f"🔄 Converting {input_path} to {output_path}")
    print(f"📊 ATS Optimization: {'Enabled' if optimize_ats else 'Disabled'}")
    
    success = convert_html_to_pdf(
        str(input_path),
        str(output_path),
        optimize_for_ats=optimize_ats
    )
    
    if success:
        print(f"\n🎉 Resume PDF generated successfully!")
        print(f"📄 File: {output_path}")
        print(f"📊 Size: {output_path.stat().st_size / 1024:.1f} KB")
        
        if optimize_ats:
            print("\n✅ ATS Optimization Applied:")
            print("   • Simplified fonts (Arial)")
            print("   • Optimized text hierarchy")
            print("   • Removed animations/transitions")
            print("   • Enhanced text selectability")
            print("   • Standard page formatting")
    else:
        print("\n❌ Failed to generate PDF")
        sys.exit(1)

if __name__ == "__main__":
    main()