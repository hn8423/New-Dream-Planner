import domtoimage from 'dom-to-image'
import jsPDF from 'jspdf'

/**
 * @param {import("react").MutableRefObject<HTMLElement>} ref
 */
async function pdfDownload(ref) {
  let blob = await domtoimage.toPng(ref.current)
  let pdf = new jsPDF({ orientation: 'l', unit: 'mm', format: [831.89, 595.28] })
  pdf.addImage(blob, 'png', 0, 0, 831.89, 595.28)
  pdf.save('certificate.pdf')
}

export default pdfDownload
