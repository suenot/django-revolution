import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
    chart: string;
    className?: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart, className = '' }) => {
    const mermaidRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [svgContent, setSvgContent] = useState<string>('');

    useEffect(() => {
        // Initialize mermaid with configuration
        mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
            fontFamily: 'Inter, system-ui, sans-serif',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'basis',
            },
            themeVariables: {
                primaryColor: '#3b82f6',
                primaryTextColor: '#1f2937',
                primaryBorderColor: '#3b82f6',
                lineColor: '#6b7280',
                secondaryColor: '#f3f4f6',
                tertiaryColor: '#f9fafb',
            },
        });

        // Render the chart
        if (mermaidRef.current && chart) {
            mermaid.render(`mermaid-${Date.now()}`, chart).then(({ svg }) => {
                if (mermaidRef.current) {
                    mermaidRef.current.innerHTML = svg;
                    setSvgContent(svg);
                }
            }).catch((error) => {
                console.error('Mermaid rendering error:', error);
                if (mermaidRef.current) {
                    mermaidRef.current.innerHTML = `
            <div class="p-4 text-red-600 bg-red-50 border border-red-200 rounded-lg">
              <p class="font-semibold">Mermaid Diagram Error</p>
              <p class="text-sm">${error.message}</p>
            </div>
          `;
                }
            });
        }
    }, [chart]);

    const handleClick = () => {
        if (svgContent) {
            setIsFullscreen(true);
        }
    };

    const handleClose = () => {
        setIsFullscreen(false);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    // Handle ESC key
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isFullscreen) {
                handleClose();
            }
        };

        if (isFullscreen) {
            document.addEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [isFullscreen]);

    return (
        <>
            <div
                className={`relative bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${className}`}
                onClick={handleClick}
            >
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h6 className="text-sm font-semibold text-gray-700">Diagram</h6>
                    <p className="text-xs text-gray-500 mt-1">Click to view fullscreen</p>
                </div>
                <div className="p-4">
                    <div
                        ref={mermaidRef}
                        className="flex justify-center items-center min-h-[200px]"
                    />
                </div>
            </div>

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
                    onClick={handleBackdropClick}
                >
                    <div className="relative bg-white rounded-lg shadow-xl max-w-[95vw] max-h-[95vh] w-full h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between py-4 px-6 border-b border-gray-200">
                            <h3 className="text-sm font-medium text-gray-900 py-0 my-0">Diagram</h3>
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content with scroll */}
                        <div className="flex-1 overflow-auto">
                            <div
                                className="w-full h-full flex items-center justify-center pt-32 pb-8 px-8"
                                dangerouslySetInnerHTML={{ __html: svgContent }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Mermaid; 