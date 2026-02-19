import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a1a",
        }}
      >
        <svg
          viewBox="0 0 454 490"
          width="24"
          height="26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#fff"
            d="M245.03,122.51v245.03c-67.66,0-122.51-54.85-122.51-122.52s54.85-122.51,122.51-122.51ZM331.87,367.55v-108.39l-76.13,108.39h76.13ZM255.74,122.51l76.13,108.39v-108.39h-76.13Z"
            transform="translate(-93 -100)"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}
