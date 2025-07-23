#!/bin/bash

# Setup script for HTML to PDF converter
echo "🔧 Setting up HTML to PDF converter..."

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check Python version
python_version=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
echo "🐍 Python version: $python_version"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆️ Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

echo "✅ Setup completed successfully!"
echo ""
echo "To use the PDF converter:"
echo "1. Activate the virtual environment: source venv/bin/activate"
echo "2. Run the converter: python scripts/html_to_pdf.py"
echo ""
echo "Usage examples:"
echo "  python scripts/html_to_pdf.py                           # Convert with default settings"
echo "  python scripts/html_to_pdf.py -o my_resume.pdf         # Specify output filename"
echo "  python scripts/html_to_pdf.py --no-ats-optimization    # Skip ATS optimization"