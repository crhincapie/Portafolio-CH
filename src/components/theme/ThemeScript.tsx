export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem("ch-theme");var light=t==="light";document.documentElement.classList.toggle("light",light);document.documentElement.style.colorScheme=light?"light":"dark";}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
