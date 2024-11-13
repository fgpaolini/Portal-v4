export function useFileDownload() {
    const downloadFile = (data: Blob, filename: string, openInNewTab = false) => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;

        if (openInNewTab) {
            // Abrir en una nueva pestaña
            window.open(url, '_blank');
        } else {
            // Descargar el archivo
            a.download = filename;
            a.click();
        }
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
    }

    return {downloadFile}
}
