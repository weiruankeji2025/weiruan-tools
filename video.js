<script>
  // 从 UMD 全局对象里拿到 createFFmpeg 和 fetchFile
  const { createFFmpeg, fetchFile } = FFmpeg;

  const uploader = document.getElementById('uploader');
  const convertBtn = document.getElementById('convertBtn');
  const message = document.getElementById('message');
  const outputImage = document.getElementById('outputImage');

  // 创建 ffmpeg 实例
  const ffmpeg = createFFmpeg({ log: true });

  let selectedFile = null;

  // 1）页面加载后先初始化 FFmpeg
  (async () => {
    try {
      message.textContent = '正在初始化 FFmpeg 引擎，请稍候...';

      await ffmpeg.load(); // 这里会比较慢，尤其第一次，属于正常

      message.textContent = 'FFmpeg 已就绪，请选择一个视频文件。';
      convertBtn.disabled = false;
      convertBtn.textContent = '开始转换为 GIF';
    } catch (err) {
      console.error(err);
      message.textContent = 'FFmpeg 初始化失败：' + err.message;
    }
  })();

  // 2）监听上传的视频文件
  uploader.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) {
      selectedFile = null;
      return;
    }
    selectedFile = file;
    message.textContent = '已选择文件：' + file.name + '，点击“开始转换为 GIF”。';
  });

  // 3）点击“转换”为 GIF
  convertBtn.addEventListener('click', async () => {
    if (!selectedFile) {
      alert('请先选择一个视频文件！');
      return;
    }

    convertBtn.disabled = true;
    convertBtn.textContent = '正在转换...';
    message.textContent = '正在转换为 GIF，请稍候...';

    try {
      // 把视频写入 FFmpeg 虚拟文件系统
      const inputName = 'input.' + (selectedFile.name.split('.').pop() || 'mp4');
      const outputName = 'output.gif';

      ffmpeg.FS('writeFile', inputName, await fetchFile(selectedFile));

      // 这里可以调整参数，比如时长、帧率、大小等等
      await ffmpeg.run(
        '-i', inputName,
        '-vf', 'fps=10,scale=320:-1:flags=lanczos',
        '-t', '5',
        outputName
      );

      // 从虚拟文件系统读出 gif
      const data = ffmpeg.FS('readFile', outputName);
      const blob = new Blob([data.buffer], { type: 'image/gif' });
      const url = URL.createObjectURL(blob);

      // 显示结果 GIF
      outputImage.src = url;
      outputImage.style.display = 'block';

      message.textContent = '转换完成 ✅ （右键图片可“图片另存为”）';
    } catch (err) {
      console.error(err);
      message.textContent = '转换失败：' + err.message;
    } finally {
      convertBtn.disabled = false;
      convertBtn.textContent = '开始转换为 GIF';
    }
  });
</script>
