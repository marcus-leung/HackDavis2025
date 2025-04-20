import { BrowserMultiFormatReader } from "@zxing/library"

// NOT USED ANYMORE

export const detectBarcode = (imageSrc) => {
  return new Promise((resolve, reject) => {
    const reader = new BrowserMultiFormatReader()
    const img = new Image()
    img.src = imageSrc

    img.onload = async () => {
      try {
        const result = await reader.decodeFromImageElement(img)
        resolve(result.getText()) // Barcode number
      } catch (err) {
        console.warn("No barcode detected:", err.message || err)
        resolve(null) // Gracefully resolve with null instead of throwing
      }
    }

    img.onerror = (err) => {
      console.error("Failed to load image", err)
      reject("Image load error")
    }
  })
}
