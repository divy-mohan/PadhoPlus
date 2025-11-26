'use client'

import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { X, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'

interface ImageCropperProps {
  imageSrc: string
  onCropComplete: (croppedImage: string) => void
  onClose: () => void
}

export default function ImageCropper({ imageSrc, onCropComplete, onClose }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const createImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', (err) => reject(err))
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
    })

  const getCroppedImg = async () => {
    try {
      const image = await createImage(imageSrc)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx || !croppedAreaPixels) return

      const maxSize = Math.max(image.width, image.height)
      const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

      canvas.width = safeArea
      canvas.height = safeArea

      ctx.translate(safeArea / 2, safeArea / 2)
      ctx.rotate(getRadianAngle(rotation))
      ctx.translate(-safeArea / 2, -safeArea / 2)

      ctx.drawImage(
        image,
        safeArea / 2 - image.width / 2,
        safeArea / 2 - image.height / 2
      )

      const data = ctx.getImageData(
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      )

      const canvas2 = document.createElement('canvas')
      canvas2.width = croppedAreaPixels.width
      canvas2.height = croppedAreaPixels.height
      const ctx2 = canvas2.getContext('2d')

      if (ctx2) {
        ctx2.putImageData(data, 0, 0)
        const croppedImage = canvas2.toDataURL('image/jpeg', 0.9)
        onCropComplete(croppedImage)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getRadianAngle = (degreeValue: number) => {
    return (degreeValue * Math.PI) / 180
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Crop Your Profile Picture</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Cropper */}
        <div className="relative w-full bg-gray-900" style={{ height: '400px' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />
        </div>

        {/* Controls */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-6">
          {/* Zoom Control */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-900">Zoom</label>
              <span className="text-sm text-gray-600">{(zoom * 100).toFixed(0)}%</span>
            </div>
            <div className="flex items-center gap-3">
              <ZoomOut className="w-5 h-5 text-gray-600" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <ZoomIn className="w-5 h-5 text-gray-600" />
            </div>
          </div>

          {/* Rotation Control */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-900">Rotation</label>
              <span className="text-sm text-gray-600">{rotation}°</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setRotation((prev) => (prev - 15 + 360) % 360)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RotateCw className="w-5 h-5 text-gray-600" />
              </button>
              <input
                type="range"
                min={0}
                max={360}
                step={15}
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <button
                onClick={() => setRotation(0)}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 px-3 py-1 rounded hover:bg-blue-50"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-white">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={getCroppedImg}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-purple-600 text-white font-semibold rounded-lg transition-all"
          >
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  )
}
