/* coi-serviceworker.js */
let co = Object.entries(window.coi || {}).reduce((acc, [k, v]) => (k.startsWith("co") ? { ...acc, [k]: v } : acc), {});
const script = document.currentScript;
if (script) {
    const src = script.getAttribute("src");
    if (src) {
        const search = src.substr(src.indexOf("?") + 1);
        if (search) co = { ...co, ...Object.fromEntries(new URLSearchParams(search)) };
    }
}
if ("serviceWorker" in navigator && window.location.hostname !== "localhost") { // Ensure it runs in production
  navigator.serviceWorker.register(window.document.currentScript.src).catch(e => console.error(e));
}
if (!window.crossOriginIsolated) {
    const r = window.document.createElement("script");
    r.src = window.document.currentScript.src;
    window.document.head.appendChild(r);
} else {
    // 实际的 Service Worker 逻辑... (为了简洁，请直接从该项目官方仓库下载完整版: https://github.com/gzuidhof/coi-serviceworker/blob/master/coi-serviceworker.min.js)
    // ⚠️ 请务必下载完整的 coi-serviceworker.min.js 并放在根目录！
}