"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

interface PaymentModalProps {
    serviceName: string;
    price: string;
    trigger: React.ReactNode;
}

export default function PaymentModal({ serviceName, price, trigger }: PaymentModalProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePayment = () => {
        setIsLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            // Redirect after showing success briefly
            setTimeout(() => {
                router.push(`/#contact?service=${encodeURIComponent(serviceName)}&paid=true`);
                // We'll handle the scrolling/form filling on the contact component
            }, 1000);
        }, 1500);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold tracking-tight">Secure Checkout</DialogTitle>
                    <DialogDescription className="text-neutral-500">
                        You are purchasing the <span className="font-semibold text-black dark:text-white">{serviceName}</span> package.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-6 py-4">
                    <div className="flex justify-between items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <span className="text-sm font-medium">Total Amount</span>
                        <span className="text-2xl font-bold">{price}</span>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Payment Details</h4>
                        <div className="p-4 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg flex items-center justify-center h-32 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-400 text-sm">
                            [Secure Stripe/Payment Element Placeholder]
                        </div>
                    </div>
                </div>

                <Button
                    onClick={handlePayment}
                    disabled={isLoading || isSuccess}
                    className="w-full h-12 text-md font-medium"
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : isSuccess ? (
                        <span className="flex items-center"><CheckCircle className="mr-2 h-4 w-4" /> Payment Successful</span>
                    ) : (
                        `Pay ${price}`
                    )}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
