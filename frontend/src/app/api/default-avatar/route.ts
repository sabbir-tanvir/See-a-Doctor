import { NextResponse } from 'next/server';

// Simple pixel art default avatar (8x8 grid)
export async function GET() {
  // Basic SVG avatar with a simple user silhouette
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#E2E8F0"/>
    <circle cx="64" cy="64" r="64" fill="#94A3B8"/>
    <circle cx="64" cy="45" r="20" fill="#F1F5F9"/>
    <path d="M64 75 C 44 75, 30 90, 30 110 L 98 110 C 98 90, 84 75, 64 75 Z" fill="#F1F5F9"/>
  </svg>`;

  return new NextResponse(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
} 