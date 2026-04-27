'use client'

import { useMemo } from 'react'

interface SoilData {
  name: string
  soilType: string
  fertilityScore: number
  moisture: number
  ph: number
  organicMatter: string
}

export function RadarChart({ soils }: { soils: SoilData[] }) {
  const colors = ['#8B6F47', '#6BA84F', '#E8A41E']
  
  const normalizedData = useMemo(() => {
    return soils.map((soil) => ({
      name: soil.name,
      fertility: soil.fertilityScore,
      moisture: soil.moisture,
      ph: (soil.ph / 9) * 100, // Normalize pH to 0-100
      organicMatter: soil.organicMatter === 'High' ? 100 : soil.organicMatter === 'Medium' ? 50 : 25,
    }))
  }, [soils])

  const size = 200
  const center = size / 2
  const levels = 5
  const maxValue = 100

  const angles = [0, 72, 144, 216, 288]
  const labels = ['Fertility', 'Moisture', 'pH Level', 'Organic Matter', 'Overall']

  const getCoordinates = (value: number, angleIndex: number) => {
    const angle = (angles[angleIndex] * Math.PI) / 180
    const radius = (value / maxValue) * (size / 2.5)
    return {
      x: center + radius * Math.sin(angle),
      y: center - radius * Math.cos(angle),
    }
  }

  const getPath = (data: any, colorIndex: number) => {
    const points = [data.fertility, data.moisture, data.ph, data.organicMatter, (data.fertility + data.moisture + data.ph + data.organicMatter) / 4]
    const coords = points.map((value: number, i: number) => getCoordinates(value, i))
    return coords.map((c: any, i: number) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ') + ' Z'
  }

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mb-6">
        {/* Grid circles */}
        {Array.from({ length: levels }).map((_, i) => {
          const radius = ((i + 1) / levels) * (size / 2.5)
          return (
            <circle
              key={`grid-${i}`}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-border"
            />
          )
        })}

        {/* Grid lines */}
        {angles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x2 = center + (size / 2.5) * Math.sin(rad)
          const y2 = center - (size / 2.5) * Math.cos(rad)
          return (
            <line
              key={`line-${i}`}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-border"
            />
          )
        })}

        {/* Data polygons */}
        {normalizedData.map((data, dataIndex) => (
          <path
            key={`path-${dataIndex}`}
            d={getPath(data, dataIndex)}
            fill={colors[dataIndex]}
            fillOpacity="0.25"
            stroke={colors[dataIndex]}
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {labels.map((label, i) => {
          const angle = (angles[i] * Math.PI) / 180
          const x = center + (size / 2) * Math.sin(angle)
          const y = center - (size / 2) * Math.cos(angle)
          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill="currentColor"
              className="text-foreground font-semibold"
            >
              {label}
            </text>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex gap-4 flex-wrap justify-center">
        {normalizedData.map((data, i) => (
          <div key={`legend-${i}`} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: colors[i] }}
            />
            <span className="text-sm text-muted-foreground">{data.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
