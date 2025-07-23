#!/usr/bin/env python3
"""
Professional Resume Generator
Creates both PDF and Word documents with ATS-friendly formatting
"""

import argparse
import sys
from datetime import datetime
from pathlib import Path

# Import our custom generators
from pdf_generator import ATSFriendlyPDFGenerator, ResumeData
from word_generator import ATSFriendlyWordGenerator


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
        description='Generate professional ATS-friendly resumes in PDF and/or Word format',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                        # Generate both PDF and Word
  %(prog)s --pdf-only             # Generate only PDF
  %(prog)s --word-only            # Generate only Word
  %(prog)s -o MyResume            # Custom filename (without extension)
  %(prog)s --pdf-only -o Resume   # Custom PDF filename
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
    
    # Quality options
    parser.add_argument('--timestamp',
                       action='store_true',
                       help='Add timestamp to filename')
    
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
    
    # Create timestamp if requested
    timestamp = ""
    if args.timestamp or args.output is None:
        timestamp = f"_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    
    # Determine base filename
    if args.output:
        base_filename = args.output
    else:
        base_filename = "Jeevan_Wijerathna_Resume_Professional"
    
    # Create resume data
    print("📋 Preparing resume data...")
    resume_data = ResumeData()
    
    # Track success
    generated_files = []
    failed_files = []
    
    # Generate PDF
    if generate_pdf_doc:
        pdf_filename = f"{base_filename}{timestamp}.pdf"
        pdf_path = project_root / pdf_filename
        
        print(f"\n🔄 Generating PDF resume...")
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
        word_filename = f"{base_filename}{timestamp}.docx"
        word_path = project_root / word_filename
        
        print(f"\n🔄 Generating Word resume...")
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
    print(f"\n{'=' * 50}")
    print(f"📊 GENERATION SUMMARY")
    print(f"{'=' * 50}")
    
    if generated_files:
        print(f"✅ Successfully generated {len(generated_files)} file(s):")
        for file_info in generated_files:
            print(f"   • {file_info['type']}: {file_info['path'].name} ({file_info['size']:.1f} KB)")
        
        print(f"\n🎯 ATS Optimization Features Applied:")
        print(f"   • Standard fonts (Arial/Helvetica)")
        print(f"   • Clean, structured layout")
        print(f"   • Proper text hierarchy")
        print(f"   • No complex formatting or graphics")
        print(f"   • Fully selectable and editable text")
        print(f"   • Standard document structure")
        
        if len(generated_files) > 1:
            print(f"\n💡 Usage Tips:")
            print(f"   • Use PDF for online applications and ATS systems")
            print(f"   • Use Word for applications requiring editable documents")
            print(f"   • Both formats are ATS-optimized and professional")
    
    if failed_files:
        print(f"\n❌ Failed to generate {len(failed_files)} file(s):")
        for file_type in failed_files:
            print(f"   • {file_type}")
    
    if not generated_files:
        print(f"❌ No files were generated successfully")
        return 1
    
    print(f"\n🎉 Resume generation completed!")
    return 0


if __name__ == "__main__":
    exit(main())