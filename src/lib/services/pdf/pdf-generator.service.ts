import jsPDF from 'jspdf';
import { Student, OptionList, ScoredCollege } from '@/types';

/**
 * Generate and download PDF for option list
 */
export async function generateAndDownloadPDF(
    student: Student,
    optionList: OptionList
): Promise<void> {
    try {
        const pdf = new jsPDF();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        let yPosition = 20;

        // Helper function to add text with word wrap
        const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
            pdf.setFontSize(fontSize);
            if (isBold) {
                pdf.setFont('helvetica', 'bold');
            } else {
                pdf.setFont('helvetica', 'normal');
            }

            const lines = pdf.splitTextToSize(text, pageWidth - 40);
            pdf.text(lines, 20, yPosition);
            yPosition += (lines.length * fontSize * 0.5) + 5;

            // Check if we need a new page
            if (yPosition > pageHeight - 20) {
                pdf.addPage();
                yPosition = 20;
            }
        };

        // Header
        pdf.setFillColor(99, 102, 241);
        pdf.rect(0, 0, pageWidth, 30, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text('BharatMinds AI Counsellor', pageWidth / 2, 15, { align: 'center' });
        pdf.setFontSize(14);
        pdf.text('Option Entry List', pageWidth / 2, 23, { align: 'center' });

        yPosition = 40;
        pdf.setTextColor(0, 0, 0);

        // Student Info
        pdf.setFillColor(243, 244, 246);
        pdf.rect(15, yPosition - 5, pageWidth - 30, 40, 'F');

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Student Name: `, 20, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(student.name, 60, yPosition);

        yPosition += 8;
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Email: `, 20, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(student.email, 60, yPosition);

        yPosition += 8;
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Category: `, 20, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(student.baseCategory, 60, yPosition);

        yPosition += 8;
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Eligible Categories: `, 20, yPosition);
        pdf.setFont('helvetica', 'normal');
        const categories = student.eligibleCategories.join(', ');
        const catLines = pdf.splitTextToSize(categories, pageWidth - 100);
        pdf.text(catLines, 60, yPosition);

        yPosition += 8 + (catLines.length - 1) * 5;
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Generated: `, 20, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(new Date().toLocaleDateString('en-IN'), 60, yPosition);

        yPosition += 15;

        // Helper function to add a table
        const addTable = (title: string, colleges: ScoredCollege[], color: [number, number, number]) => {
            if (colleges.length === 0) return;

            // Section header
            pdf.setFillColor(...color);
            pdf.rect(15, yPosition, pageWidth - 30, 10, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            pdf.text(title, 20, yPosition + 7);
            pdf.setTextColor(0, 0, 0);
            yPosition += 15;

            // Table header
            pdf.setFillColor(99, 102, 241);
            pdf.rect(15, yPosition, pageWidth - 30, 8, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.text('#', 18, yPosition + 5);
            pdf.text('College', 28, yPosition + 5);
            pdf.text('Branch', 110, yPosition + 5);
            pdf.text('Cat', 145, yPosition + 5);
            pdf.text('Cutoff', 160, yPosition + 5);
            pdf.text('Prob', 185, yPosition + 5);
            pdf.setTextColor(0, 0, 0);
            yPosition += 10;

            // Table rows
            colleges.forEach((college, index) => {
                if (yPosition > pageHeight - 20) {
                    pdf.addPage();
                    yPosition = 20;
                }

                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(8);

                // Alternate row colors
                if (index % 2 === 0) {
                    pdf.setFillColor(249, 249, 249);
                    pdf.rect(15, yPosition - 4, pageWidth - 30, 8, 'F');
                }

                pdf.text(`${index + 1}`, 18, yPosition);

                // Truncate long college names
                let collegeName = college.collegeName;
                if (collegeName.length > 40) {
                    collegeName = collegeName.substring(0, 37) + '...';
                }
                pdf.text(collegeName, 28, yPosition);

                pdf.text(college.courseName.substring(0, 15), 110, yPosition);
                pdf.text(college.category, 145, yPosition);
                pdf.text(college.cutoffRank.toLocaleString(), 160, yPosition);
                pdf.text(`${(college.probability * 100).toFixed(0)}%`, 185, yPosition);

                yPosition += 8;
            });

            yPosition += 5;
        };

        // Add tables for each tier
        addTable('SAFE OPTIONS (80-95% Probability)', optionList.safe, [16, 185, 129]);
        addTable('TARGET OPTIONS (40-80% Probability)', optionList.target, [245, 158, 11]);
        addTable('REACH OPTIONS (20-40% Probability)', optionList.reach, [239, 68, 68]);

        // Footer
        if (yPosition > pageHeight - 40) {
            pdf.addPage();
            yPosition = 20;
        }

        pdf.setDrawColor(200, 200, 200);
        pdf.line(20, yPosition, pageWidth - 20, yPosition);
        yPosition += 10;

        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Generated by BharatMinds AI Counsellor', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 6;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.text('This list is based on KCET 2024 Round 1 cutoff data', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 5;
        pdf.text('Actual cutoffs may vary. Use this as a guide for your option entry.', pageWidth / 2, yPosition, { align: 'center' });

        // Download the PDF
        pdf.save(`option-list-${student.name.replace(/\s+/g, '-')}.pdf`);

        console.log('✅ PDF generated successfully');
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        throw error;
    }
}
