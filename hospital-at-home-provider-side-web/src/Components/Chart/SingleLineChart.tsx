import React, { useRef, useEffect } from 'react';
import { Chart, TooltipItem, ChartData, ChartOptions } from 'chart.js/auto';

type SingleLineChartProps = {
    data: any[][] | null;
    label: string;
};

const SingleLineChart: React.FC<SingleLineChartProps> = ({ data , label}) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current?.getContext('2d');
        if (ctx && data) {
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map(d => d[0]),
                    datasets: [{
                        label: label,
                        data: data.map(d => d[1]),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        pointStyle: (ctx) => {
                            const index = ctx.dataIndex;
                            if (data.length === 0) return 'circle';
                            return data[index][2] === true ? 'triangle' : 'circle';
                        },
                        pointRadius: 8,
                        backgroundColor: 'rgb(75, 192, 192)'
                    }]
                }
            });
        }

        return () => {
            chartInstance.current?.destroy();
        };
    }, [data]);

    return (
        <canvas ref={chartRef}></canvas>
    );
};

export default SingleLineChart;