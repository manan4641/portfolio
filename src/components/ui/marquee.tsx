import { cn } from "@/lib/utils";

interface MarqueeProps {
    className?: string;
    reverse?: boolean;
    pauseOnHover?: boolean;
    children?: React.ReactNode;
    vertical?: boolean;
    repeat?: number;
    [key: string]: any;
}

export default function Marquee({
    className,
    reverse,
    pauseOnHover = false,
    children,
    vertical = false,
    repeat = 4,
    ...props
}: MarqueeProps) {
    // Extract duration from className
    const durationMatch = className?.match(/\[--duration:(\d+)s\]/);
    const duration = durationMatch ? durationMatch[1] : '60';

    // Extract gap from className  
    const gapMatch = className?.match(/\[--gap:([^\]]+)\]/);
    const gap = gapMatch ? gapMatch[1] : '2rem';

    return (
        <div
            {...props}
            className={cn(
                "group flex overflow-hidden p-2",
                {
                    "flex-row": !vertical,
                    "flex-col": vertical,
                },
                className
            )}
            style={{
                // @ts-ignore - CSS variables
                '--duration': `${duration}s`,
                '--gap': gap
            }}
        >
            {Array(repeat)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className={cn("flex shrink-0 justify-around", {
                            "animate-marquee flex-row": !vertical,
                            "animate-marquee-vertical flex-col": vertical,
                            "group-hover:[animation-play-state:paused]": pauseOnHover,
                            "[animation-direction:reverse]": reverse,
                        })}
                        style={{
                            gap: `var(--gap)`
                        }}
                    >
                        {children}
                    </div>
                ))}
        </div>
    );
}
