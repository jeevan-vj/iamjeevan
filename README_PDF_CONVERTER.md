# Professional Resume Generator

This Python toolkit creates ATS-friendly resumes in both PDF and Microsoft Word formats using professional document generation APIs instead of HTML-to-PDF conversion.

## Features

### 🎯 ATS Optimization
- **Font Standardization**: Uses Arial font for maximum compatibility
- **Text Hierarchy**: Proper heading structure for ATS parsing
- **Clean Formatting**: Removes animations, transitions, and complex styling
- **Text Selectability**: Ensures all text is selectable and copyable
- **Standard Layout**: Letter-size pages with proper margins

### 📄 Multiple Output Formats
- **PDF**: High-quality, optimized for ATS systems and online applications
- **Word**: Fully editable `.docx` format for applications requiring document modification
- **Professional Layout**: Clean, structured formatting in both formats
- **Small File Size**: Optimized for email attachments and quick downloads

## Quick Start

### 1. Setup (One-time)

```bash
# Run the setup script
./scripts/setup_pdf_converter.sh
```

### 2. Generate Resume

```bash
# Activate virtual environment
source venv/bin/activate

# Generate both PDF and Word formats (recommended)
python scripts/resume_generator.py

# The output will be:
# - Jeevan_Wijerathna_Resume_Professional_YYYYMMDD_HHMMSS.pdf
# - Jeevan_Wijerathna_Resume_Professional_YYYYMMDD_HHMMSS.docx
```

## Usage Options

### Generate Both Formats (Recommended)
```bash
python scripts/resume_generator.py
```

### Generate Only PDF
```bash
python scripts/resume_generator.py --pdf-only
```

### Generate Only Word Document
```bash
python scripts/resume_generator.py --word-only
```

### Custom Output Filename
```bash
python scripts/resume_generator.py -o "MyResume"
# Outputs: MyResume.pdf and MyResume.docx
```

### Add Timestamp to Filename
```bash
python scripts/resume_generator.py --timestamp -o "Resume"
# Outputs: Resume_YYYYMMDD_HHMMSS.pdf and Resume_YYYYMMDD_HHMMSS.docx
```

### Individual Generators
```bash
# Generate only PDF with legacy script
python scripts/pdf_generator.py

# Generate only Word document
python scripts/word_generator.py

# Legacy HTML-to-PDF converter (not recommended)
python scripts/html_to_pdf.py
```

## ATS Optimization Details

The script automatically applies these ATS-friendly optimizations:

### ✅ Font & Typography
- Converts all fonts to Arial (most ATS-compatible font)
- Standardizes font sizes (11pt body, appropriate heading sizes)
- Optimizes line height for readability

### ✅ Structure & Layout
- Maintains proper heading hierarchy (H1 > H2 > H3)
- Adds section borders for clear separation
- Optimizes list formatting with bullet points
- Ensures proper page breaks

### ✅ Content Optimization
- Removes print buttons and interactive elements
- Simplifies complex styling
- Ensures text is fully selectable
- Optimizes spacing and margins

### ✅ Technical Standards
- Letter-size pages (8.5" x 11")
- Standard margins (0.75")
- Black text on white background
- No background images or complex graphics

## Dependencies

The toolkit requires these Python packages:
- `reportlab` - Professional PDF generation
- `python-docx` - Microsoft Word document generation
- `weasyprint` - Legacy HTML to PDF conversion
- `beautifulsoup4` - HTML parsing and optimization
- `lxml` - XML/HTML processing

## Troubleshooting

### Common Issues

**1. Permission Denied**
```bash
chmod +x scripts/setup_pdf_converter.sh
```

**2. Python Not Found**
- Install Python 3.8 or higher
- Make sure `python3` command is available

**3. WeasyPrint Installation Issues**
On macOS, you might need to install system dependencies:
```bash
brew install pango gdk-pixbuf libffi
```

On Ubuntu/Debian:
```bash
sudo apt-get install build-essential python3-dev python3-pip python3-setuptools python3-wheel python3-cffi libcairo2 libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev shared-mime-info
```

**4. Virtual Environment Issues**
```bash
# Remove and recreate
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## File Output

The generated files will have:

### PDF Format
- **Filename**: `Jeevan_Wijerathna_Resume_Professional_YYYYMMDD_HHMMSS.pdf`
- **Size**: ~7-8 KB (highly optimized)
- **Format**: Letter size (8.5" x 11")
- **Quality**: High-resolution, print-ready

### Word Format
- **Filename**: `Jeevan_Wijerathna_Resume_Professional_YYYYMMDD_HHMMSS.docx`
- **Size**: ~38-40 KB (standard Word document)
- **Format**: Standard .docx format
- **Features**: Fully editable, track changes compatible

## Integration with CI/CD

You can automate PDF generation in your build process:

```bash
# In your package.json scripts
"build:resume": "source venv/bin/activate && python scripts/resume_generator.py -o public/Jeevan_Wijerathna_Resume",
"build:pdf": "source venv/bin/activate && python scripts/pdf_generator.py -o public/Jeevan_Wijerathna_Resume.pdf",
"build:word": "source venv/bin/activate && python scripts/word_generator.py -o public/Jeevan_Wijerathna_Resume.docx"
```

## Best Practices

1. **Test with ATS Systems**: Upload to job boards to test compatibility
2. **Keep It Simple**: Avoid complex layouts in your HTML
3. **Use Standard Fonts**: Stick with Arial, Helvetica, or Times New Roman
4. **Regular Updates**: Regenerate PDF when updating resume content
5. **File Naming**: Use consistent, professional naming conventions

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Ensure all dependencies are properly installed
3. Verify your HTML file is valid and accessible