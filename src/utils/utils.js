import html2Canvas from '../../node_modules/html2canvas';

export default {
    cerateImage(imgEl, showEl, name) {
        html2Canvas(document.getElementById(imgEl), { allowTaint: true }).then(canvas => {
            document.getElementById(showEl).appendChild(canvas);
            let url = canvas.toDataURL('image/png');
            let a = document.createElement('a');
            // 创建一个单击事件
            let event = new MouseEvent('click');
            // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
            a.download = name || '下载图片名称';
            // 将生成的URL设置为a.href属性
            a.href = url;
            // 触发a的单击事件
            a.dispatchEvent(event);
        });
    }
}