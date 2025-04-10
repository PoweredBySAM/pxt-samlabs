#!/bin/bash

# Script to replace Material UI components with Tailwind CSS

# Find all files containing Material UI imports
echo "Finding files with Material UI imports..."
FILES_WITH_MUI=$(grep -l -r --include="*.tsx" --include="*.ts" "from '@mui" ./src)

echo "The following files contain Material UI imports:"
echo "$FILES_WITH_MUI"
echo ""
echo "Please review the files above and make the following changes:"

echo ""
echo "1. Replace Material UI Box components with Tailwind div:"
echo "   - From: <Box sx={{ display: 'flex', justifyContent: 'center' }}>"
echo "   - To:   <div className=\"flex justify-center\">"
echo ""

echo "2. Replace Material UI Typography with Tailwind div or span:"
echo "   - From: <Typography variant=\"h6\" sx={{ fontWeight: 400 }}>"
echo "   - To:   <div className=\"text-lg font-normal\">"
echo ""

echo "3. Replace Material UI Slider with the CustomSlider component:"
echo "   - Ensure you've created the CustomSlider component"
echo "   - From: <Slider value={value} onChange={onChange} />"
echo "   - To:   <CustomSlider value={value} onChange={(e, val) => onChange(e, val, 0)} />"
echo ""

echo "4. Update package.json to remove Material UI dependencies:"
echo "   - @mui/material"
echo "   - @mui/icons-material"
echo ""

echo "This script is informational only. Please manually make the changes."
echo "After removing Material UI from components, update your package.json to remove the dependencies." 