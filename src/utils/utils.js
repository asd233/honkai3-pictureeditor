import html2cavans from '../../node_modules/html2canvas';

export default {
    ceratImage(imgEl, showEl) {
        console.log(this);
        html2cavans(document.getElementById(imgEl), { allowTaint: true }).then(canvas => {
            document.getElementById(showEl).appendChild(canvas);
        });
    }
}