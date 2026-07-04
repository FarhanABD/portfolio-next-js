export function generateFrontBadge(avatarUrl: string, name: string, title: string): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve('');
      return;
    }

    // 1. Draw Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, '#0f0c20');
    gradient.addColorStop(0.5, '#151030');
    gradient.addColorStop(1, '#070514');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 800);

    // 2. Draw Futuristic Grid Pattern
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < 600; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 800);
      ctx.stroke();
    }
    for (let y = 0; y < 800; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(600, y);
      ctx.stroke();
    }

    // 3. Draw Neon Glowing Borders & Decorative Corners
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 560, 760);

    // Diagonal corner lines
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 3;
    // Top-Left corner
    ctx.beginPath(); ctx.moveTo(10, 40); ctx.lineTo(10, 10); ctx.lineTo(40, 10); ctx.stroke();
    // Top-Right corner
    ctx.beginPath(); ctx.moveTo(590, 40); ctx.lineTo(590, 10); ctx.lineTo(560, 10); ctx.stroke();
    // Bottom-Left corner
    ctx.beginPath(); ctx.moveTo(10, 760); ctx.lineTo(10, 790); ctx.lineTo(40, 790); ctx.stroke();
    // Bottom-Right corner
    ctx.beginPath(); ctx.moveTo(590, 760); ctx.lineTo(590, 790); ctx.lineTo(560, 790); ctx.stroke();

    // 4. Header Section
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '6px';
    ctx.fillText('DEVELOPER ID', 300, 70);

    // Decorative horizontal lines under header
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 90);
    ctx.lineTo(500, 90);
    ctx.stroke();

    // 5. Draw Gold Chip (left side)
    const chipX = 80;
    const chipY = 140;
    ctx.fillStyle = '#d97706'; // Gold color
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect?.(chipX, chipY, 80, 60, 8);
    ctx.fill();
    ctx.stroke();

    // Chip lines
    ctx.strokeStyle = '#451a03';
    ctx.beginPath();
    ctx.moveTo(chipX + 26, chipY); ctx.lineTo(chipX + 26, chipY + 60);
    ctx.moveTo(chipX + 54, chipY); ctx.lineTo(chipX + 54, chipY + 60);
    ctx.moveTo(chipX, chipY + 20); ctx.lineTo(chipX + 80, chipY + 20);
    ctx.moveTo(chipX, chipY + 40); ctx.lineTo(chipX + 80, chipY + 40);
    ctx.stroke();

    // Holographic Badge Circle / Logo (right side)
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.6)';
    ctx.fillStyle = 'rgba(96, 165, 250, 0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(480, 170, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Inner star/cross
    ctx.strokeStyle = '#60a5fa';
    ctx.beginPath();
    ctx.moveTo(480, 150); ctx.lineTo(480, 190);
    ctx.moveTo(460, 170); ctx.lineTo(500, 170);
    ctx.stroke();

    // 6. Draw Avatar Image with Circular Clip
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = avatarUrl;
    img.onload = () => {
      const avX = 300;
      const avY = 340;
      const avR = 110;

      // Glow effect under avatar
      const glow = ctx.createRadialGradient(avX, avY, 80, avX, avY, 130);
      glow.addColorStop(0, 'rgba(139, 92, 246, 0.4)');
      glow.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(avX, avY, 130, 0, Math.PI * 2);
      ctx.fill();

      // Circular clip path for avatar
      ctx.save();
      ctx.beginPath();
      ctx.arc(avX, avY, avR, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, avX - avR, avY - avR, avR * 2, avR * 2);
      ctx.restore();

      // Border around avatar
      ctx.strokeStyle = '#a78bfa';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(avX, avY, avR, 0, Math.PI * 2);
      ctx.stroke();

      // Secondary thin glowing border
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(avX, avY, avR + 8, 0, Math.PI * 2);
      ctx.stroke();

      // 7. Write Name & Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(name.toUpperCase(), 300, 520);

      ctx.fillStyle = '#a78bfa';
      ctx.font = '600 20px monospace';
      ctx.fillText(title, 300, 560);

      // Access Level Badge
      ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect?.(210, 590, 180, 32, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('ACCESS LEVEL: FULL', 300, 611);

      // 8. Draw Barcode at the bottom
      const barY = 660;
      const barH = 50;
      ctx.fillStyle = '#ffffff';
      // Render pseudo barcode
      let curX = 120;
      const barcodeWidths = [
        3, 8, 2, 4, 12, 3, 2, 6, 8, 3, 2, 10, 4, 2, 6, 3, 8, 4, 2, 10, 3, 6, 2, 8, 4, 3, 10,
        3, 8, 2, 4, 12, 3, 2, 6, 8, 3, 2, 10
      ];
      barcodeWidths.forEach((w, idx) => {
        if (idx % 2 === 0) {
          ctx.fillRect(curX, barY, w, barH);
        }
        curX += w;
      });

      // Barcode labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '11px monospace';
      ctx.fillText('SYS-FHN-883017', 300, 730);

      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => {
      // Fallback if image fails to load
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(name.toUpperCase(), 300, 420);
      resolve(canvas.toDataURL('image/png'));
    };
  });
}

export function generateBackBadge(): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve('');
      return;
    }

    // 1. Draw Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, '#070514');
    gradient.addColorStop(0.5, '#0e0a24');
    gradient.addColorStop(1, '#05040d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 800);

    // 2. Draw Magnetic Stripe
    ctx.fillStyle = '#111116';
    ctx.fillRect(0, 100, 600, 100);

    // Signature Panel
    ctx.fillStyle = '#dddddd';
    ctx.fillRect(60, 240, 480, 60);

    ctx.fillStyle = '#111111';
    ctx.font = 'italic 22px "Brush Script MT", cursive, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Farhan A.', 100, 280);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('AUTHORIZED SIGNATURE', 540, 320);

    // Info details
    ctx.fillStyle = '#a78bfa';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('PROPERTY OF FARHAN.DEV', 60, 360);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '12px sans-serif';
    const lines = [
      'If found, please return to: admin@farhan.dev',
      'This card is encrypted and features NFC verification.',
      'Unauthorized duplication is strictly prohibited.'
    ];
    lines.forEach((line, idx) => {
      ctx.fillText(line, 60, 390 + (idx * 22));
    });

    // 3. Draw QR Code structure
    const qrSize = 160;
    const qrX = 300 - qrSize / 2;
    const qrY = 500;

    // Draw QR outer box
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20);

    // Simulated QR dots
    ctx.fillStyle = '#000000';
    // Positioning blocks
    ctx.fillRect(qrX, qrY, 40, 40);
    ctx.clearRect(qrX + 10, qrY + 10, 20, 20);
    ctx.fillRect(qrX + 120, qrY, 40, 40);
    ctx.clearRect(qrX + 130, qrY + 10, 20, 20);
    ctx.fillRect(qrX, qrY + 120, 40, 40);
    ctx.clearRect(qrX + 10, qrY + 130, 20, 20);

    // Random noise for QR
    for (let r = 0; r < 16; r++) {
      for (let c = 0; c < 16; c++) {
        // Skip position blocks
        if ((r < 5 && c < 5) || (r < 5 && c > 10) || (r > 10 && c < 5)) continue;
        if (Math.random() > 0.5) {
          ctx.fillRect(qrX + c * 10, qrY + r * 10, 10, 10);
        }
      }
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SCAN FOR DIGITAL PORTFOLIO', 300, 710);

    // Borders
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.2)';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 560, 760);

    resolve(canvas.toDataURL('image/png'));
  });
}
