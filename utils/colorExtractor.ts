
export const extractColorsFromImage = (imageUrl: string): Promise<string[]> => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(['#A61B1B', '#E8C68E', '#1A1A1A', '#FDFBF7']); // 默认新年色盘
    }, 800);

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = () => {
      try {
        clearTimeout(timeout);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(['#A61B1B', '#E8C68E']);
        
        // 缩放画布以提升提取速度
        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);
        
        const points = [
          { x: 30, y: 30 },
          { x: 70, y: 30 },
          { x: 50, y: 50 },
          { x: 30, y: 70 },
          { x: 70, y: 70 }
        ];
        
        const colors = points.map(p => {
          const data = ctx.getImageData(p.x, p.y, 1, 1).data;
          return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
        });
        
        resolve(Array.from(new Set(colors)).slice(0, 4));
      } catch (e) {
        resolve(['#A61B1B', '#E8C68E']);
      }
    };
    img.onerror = () => {
      clearTimeout(timeout);
      resolve(['#A61B1B', '#E8C68E', '#1A1A1A', '#FDFBF7']);
    };
  });
};
