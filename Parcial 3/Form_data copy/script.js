document.getElementById('btnGenerarPDF').addEventListener('click', () => {
    const formulario = document.getElementById('formulario');
    const formData = new FormData(formulario); // Recopilar datos del formulario

    fetch('http://localhost:8100/formulario', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.blob(); // Obtener el PDF como blob
        }
        throw new Error('Error al generar el PDF');
    })
    .then(blob => {
        const pdfViewer = document.getElementById('pdfViewer');
        pdfViewer.innerHTML = ''; // Limpiar visor previo

        // Crear un objeto URL para el blob y mostrarlo en un iframe
        const pdfURL = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.src = pdfURL;
        iframe.width = '100%';
        iframe.height = '500px';
        pdfViewer.appendChild(iframe);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al generar el PDF.');
    });
});