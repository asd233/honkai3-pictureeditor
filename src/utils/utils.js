import html2Canvas from '../../node_modules/html2canvas';

export default {
    cerateImage(imgEl, showEl) {
        html2Canvas(document.getElementById(imgEl), { allowTaint: true }).then(canvas => {
            document.getElementById(showEl).appendChild(canvas);
        });
    }
}