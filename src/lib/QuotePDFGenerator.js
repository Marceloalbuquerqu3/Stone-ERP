
import jsPDF from 'jspdf';
import { PLANS } from './SubscriptionManager';

export const generateQuotePDF = (quote, company) => {
  if (!quote || !company) return;

  // Check if plan allows PDF
  const planDetails = Object.values(PLANS).find(p => p.id === company.plan?.toLowerCase()) || PLANS.FREEMIUM;
  if (!planDetails.limits.pdf) {
    alert("Seu plano atual não permite gerar PDFs. Faça upgrade para desbloquear.");
    return;
  }

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const defaultLogo = "https://horizons-cdn.hostinger.com/e704d4c7-5d40-4f8d-aed0-5fb6cd955e70/e515c8efa5340c740a50fdf641c51d86.png";
  
  // -- HEADER --
  // Logo - Centralized & Adjusted Size (800x340 ratio approximation for PDF)
  // 50mm width, auto height to maintain ratio approx
  try {
    const logoUrl = company.logo || defaultLogo;
    const imgWidth = 50; 
    const imgHeight = 20; 
    const xPos = (pageWidth - imgWidth) / 2;
    doc.addImage(logoUrl, 'PNG', xPos, 10, imgWidth, imgHeight);
  } catch (e) {
    console.error("Erro ao carregar logo no PDF", e);
  }

  let yPos = 40;

  // Company Name & Info - Centralized
  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text(company.name || "Minha Marmoraria", pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 7;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const contactInfo = `${company.address || ""} | Tel: ${company.phone || ""} | Email: ${company.email || ""}`;
  doc.text(contactInfo, pageWidth / 2, yPos, { align: 'center' });

  // Quote Title & Date - Right Aligned below header
  yPos += 15;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`ORÇAMENTO #${quote.quoteNumber}`, pageWidth - 20, yPos, { align: 'right' });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Data: ${new Date(quote.date).toLocaleDateString('pt-BR')}`, pageWidth - 20, yPos + 6, { align: 'right' });

  // -- CLIENT INFO --
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("DADOS DO CLIENTE", 20, yPos);
  
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(`Nome: ${quote.client}`, 20, yPos + 6);

  // -- ITEMS / SPECS --
  yPos += 20;
  doc.setFillColor(245, 245, 245);
  doc.rect(20, yPos - 5, pageWidth - 40, 8, 'F');
  
  doc.setFontSize(9);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text("DESCRIÇÃO", 25, yPos);
  doc.text("MEDIDAS (L x C)", 100, yPos);
  doc.text("QTD / M²", 140, yPos);
  doc.text("TOTAL", 175, yPos);

  yPos += 10;
  doc.setFont(undefined, 'normal');
  doc.setTextColor(60, 60, 60);

  // Item 1 (The main stone spec)
  doc.text(`${quote.stoneType} - ${quote.thickness || ''} ${quote.finishType || ''}`, 25, yPos);
  
  // Dimensions if available
  const width = quote.width ? Number(quote.width).toFixed(2) : '-';
  const length = quote.length ? Number(quote.length).toFixed(2) : '-';
  const dimText = (quote.width && quote.length) ? `${width}m x ${length}m` : '-';
  doc.text(dimText, 100, yPos);

  doc.text(`${quote.squareMeters || 0} m²`, 140, yPos);
  
  // Total Value for this item (Material Cost approx for display, or full total if simple quote)
  // For simplicity in this PDF gen logic, we show the final calculated total at the bottom
  // and just list the specs here. If you want per-item pricing, you'd need the breakdown.
  // Assuming 'totalValue' is the final price.
  // We'll leave the line item total blank or put the material cost if available.
  // Let's put a dash if it's a bundle price, or the total if it's the only item.
  
  // For this template, let's list the full Total at bottom to avoid confusion with installation mixing.
  doc.text("-", 175, yPos); 

  // Add install cost line if relevant
  if (quote.installCost > 0) {
      yPos += 8;
      doc.text("Mão de obra / Instalação", 25, yPos);
      doc.text("-", 100, yPos);
      doc.text("-", 140, yPos);
      doc.text("-", 175, yPos);
  }

  // Divider
  yPos += 15;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPos, pageWidth - 20, yPos);

  // -- TOTAL --
  yPos += 10;
  const totalVal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(quote.totalValue || 0);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`TOTAL GERAL: ${totalVal}`, pageWidth - 20, yPos, { align: 'right' });

  // -- FOOTER / TERMS --
  yPos += 30;
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text("Condições de Pagamento:", 20, yPos);
  doc.setFont(undefined, 'normal');
  doc.text("50% no pedido, 50% na entrega.", 20, yPos + 6);
  doc.text("Validade deste orçamento: 15 dias.", 20, yPos + 12);

  // Signature lines
  yPos += 40;
  doc.setDrawColor(100, 100, 100);
  doc.line(20, yPos, 80, yPos);
  doc.line(pageWidth - 80, yPos, pageWidth - 20, yPos);
  
  doc.setFontSize(8);
  doc.text("Assinatura do Cliente", 50, yPos + 5, { align: 'center' });
  doc.text("Responsável pela Empresa", pageWidth - 50, yPos + 5, { align: 'center' });

  // Save
  doc.save(`Orcamento_${quote.quoteNumber}.pdf`);
};
