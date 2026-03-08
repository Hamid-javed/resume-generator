import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportResumePdf = async (elementId: string, title: string = 'resume') => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Resume element not found');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: null,
  });

  const imgWidth = 595.28; // A4 width in points
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const pageHeight = 841.89; // A4 height in points

  const pdf = new jsPDF('p', 'pt', 'a4');
  let position = 0;

  // Handle multi-page
  if (imgHeight <= pageHeight) {
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
  } else {
    let remainingHeight = imgHeight;
    while (remainingHeight > 0) {
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;
      position -= pageHeight;
      if (remainingHeight > 0) {
        pdf.addPage();
      }
    }
  }

  const safeName = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  pdf.save(`${safeName}.pdf`);
};
