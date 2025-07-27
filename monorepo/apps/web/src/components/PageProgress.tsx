import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const PageProgress = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const progressTimer = useRef<NodeJS.Timeout | null>(null);

    // Simulate realistic progress
    const startFakeProgress = () => {
        // Clear any existing timer
        if (progressTimer.current) {
            clearInterval(progressTimer.current);
        }

        setProgress(0);

        // Quickly go to 20% to show immediate feedback
        setTimeout(() => setProgress(20), 50);

        // Then slowly increase to 90% (never reach 100% until actually complete)
        progressTimer.current = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 90) {
                    if (progressTimer.current) {
                        clearInterval(progressTimer.current);
                    }
                    return 90;
                }

                // Slow down as we get closer to 90%
                const increment = 90 - prevProgress;
                return prevProgress + (increment / 10);
            });
        }, 300);
    };

    const completeProgress = () => {
        // Clear any existing timer
        if (progressTimer.current) {
            clearInterval(progressTimer.current);
            progressTimer.current = null;
        }

        // Jump to 100% and then hide after animation duration
        setProgress(100);
        setTimeout(() => {
            setLoading(false);
            setProgress(0);
        }, 300);
    };

    useEffect(() => {
        const handleRouteChangeStart = (url: string, { shallow }: { shallow: boolean }) => {
            if (!shallow) {
                setLoading(true);
                startFakeProgress();
            }
        };

        const handleRouteChangeComplete = () => {
            completeProgress();
        };

        const handleRouteChangeError = () => {
            completeProgress();
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        router.events.on('routeChangeError', handleRouteChangeError);

        return () => {
            if (progressTimer.current) {
                clearInterval(progressTimer.current);
            }
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            router.events.off('routeChangeError', handleRouteChangeError);
        };
    }, [router.events]);

    if (!loading && progress === 0) {
        return null;
    }

    return (
        <div
            className={`fixed top-0 left-0 w-full h-1 z-50 transition-opacity duration-300 ${
                loading ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div className="w-full h-full bg-gray-200">
                <div
                    className="h-full bg-blue-600 transition-all duration-200 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default PageProgress; 