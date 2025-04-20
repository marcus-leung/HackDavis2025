import { Leaf } from "lucide-react"

export default function TitleSection() {
  return (
    <div className="text-center mb-8 bg-gradient-to-b from-green-100 to-amber-50 p-6 rounded-2xl shadow-lg border border-green-200 w-full max-w-md">
      <div className="flex items-center justify-center mb-2">
        <Leaf className="w-8 h-8 text-green-700 mr-2" />
        <h1 className="text-5xl font-bold text-green-800">EthicScope</h1>
      </div>
      <div className="h-1 w-32 bg-gradient-to-r from-green-300 to-amber-300 mx-auto my-3 rounded-full"></div>
      <p className="text-lg text-green-700 font-medium">Scan products to discover their ethical footprint</p>
      <p className="text-sm text-green-600 mt-2 italic">Take a photo to analyze sustainability & social impact</p>
    </div>
  )
}
