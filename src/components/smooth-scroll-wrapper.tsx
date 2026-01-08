'use client';

interface SmoothScrollWrapperProps {
    children: React.ReactNode;
}

export function SmoothScrollWrapper({ children }: SmoothScrollWrapperProps) {
    return (
        <div style={{ scrollBehavior: 'smooth' }}>
            {children}
        </div>
    );
}
