
export const extractColorsFromImage = (imageUrl: string): Promise<string[]> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(['#ffffff']);
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Sample 5 points for varied colors
      const points = [
        { x: 0.2, y: 0.2 },
        { x: 0.8, y: 0.2 },
        { x: 0.5, y: 0.5 },
        { x: 0.2, y: 0.8 },
        { x: 0.8, y: 0.8 }
      ];
      
      const colors = points.map(p => {
        const x = Math.floor(p.x * img.width);
        const y = Math.floor(p.y * img.height);
        const data = ctx.getImageData(x, y, 1, 1).data;
        return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
      });
      
      resolve(Array.from(new Set(colors)).slice(0, 4));
    };
    img.onerror = () => resolve(['#cccccc', '#aaaaaa', '#888888']);
  });
};
