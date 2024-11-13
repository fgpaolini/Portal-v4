import html2canvas from 'html2canvas';

export function useCapture() {
    const captureDiv = (fileName: string, className: string, scale: number = 1.5) => {
        return new Promise<void>((resolve, reject) => {
            const canvasElement = document.querySelector(`.${className}`);
            
            if (!canvasElement) {
                return reject(new Error('No se ha encontrado el elemento a exportar.'));
            }

            html2canvas(canvasElement as HTMLElement, {
                scale: scale, 
                useCORS: true 
            })
                .then(function(canvas) {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = `${fileName}.png`;
                    link.click();
                    resolve();
                })
                .catch(function(error) {
                    reject(new Error('Error al generar la imagen: ' + error.message));
                });
        });
    };

    return { captureDiv };
}
