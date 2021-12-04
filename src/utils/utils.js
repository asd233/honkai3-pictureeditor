import html2cavans from '../../node_modules/html2canvas';

export default {
    cerateImage(imgEl, showEl) {
        html2cavans(document.getElementById(imgEl), { allowTaint: true }).then(canvas => {
            document.getElementById(showEl).appendChild(canvas);
        });
    }
}