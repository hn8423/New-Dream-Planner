/**
 * @param {string} url
 */
export default function openPopupPage(url) {
  return window.open(`${url}`, '', `popup,toolbar=no, menubar=no, location=no, status=no, width=${screen.width}, height=${screen.height}, fullscreen=yes, left=0, top=0`)
}
