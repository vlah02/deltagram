document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('uploadModal');
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('modalFile');
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const openBtn = document.querySelector('.upload-btn');

    let files = [];

    function closeModal() {
        files = [];
        fileInput.value = '';
        dropZone.textContent = 'Drop files here or click to select';
        confirmBtn.disabled = true;
        modal.style.display = 'none';
    }

    openBtn.addEventListener('click', () => {
        files = [];
        fileInput.value = '';
        dropZone.textContent = 'Drop files here or click to select';
        confirmBtn.disabled = true;

        modal.style.display = 'flex';
    });

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
        files = Array.from(fileInput.files);
        dropZone.textContent = `${files.length} file(s) selected`;
        confirmBtn.disabled = files.length === 0;
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('hover');
    });

    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('hover'));

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('hover');
        files = Array.from(e.dataTransfer.files);
        dropZone.textContent = `${files.length} file(s) ready`;
        confirmBtn.disabled = files.length === 0;
    });

    cancelBtn.addEventListener('click', closeModal);

    confirmBtn.addEventListener('click', () => {
        const form = new FormData();
        files.forEach(f => form.append('zipfiles', f));
        fetch('/upload', {
            method: 'POST',
            body: form
        }).then(() => window.location.reload());
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
