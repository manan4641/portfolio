"use client";

export default function GrainOverlay() {
    return (
        <>
            <div className="fixed inset-0 z-[9999] pointer-events-none mix-blend-overlay opacity-[0.07]">
                <svg className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.8"
                            numOctaves="3"
                            stitchTiles="stitch"
                        />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>
        </>
    );
}
