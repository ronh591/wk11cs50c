document.addEventListener('DOMContentLoaded', function() {
    // Get canvas and context
    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');

    // Fetch data from JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const salesData = data.sales;
            const barWidth = 40;
            const spacing = 10;
            const maxValue = Math.max(...salesData.map(item => item.value));
            const scale = 400 / maxValue; // 400px height for bars, leaving space for labels
            
            // Draw axes
            ctx.beginPath();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.moveTo(50, 450);  // x-axis
            ctx.lineTo(450, 450);
            ctx.moveTo(50, 50);   // y-axis
            ctx.lineTo(50, 450);
            ctx.stroke();

            // Draw bars and labels
            salesData.forEach((item, index) => {
                const x = 50 + (barWidth + spacing) * index;
                const height = item.value * scale;
                const y = 450 - height;

                // Draw bar
                ctx.fillStyle = `hsl(${index * 30}, 70%, 50%)`; // Different color for each bar
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 1;
                ctx.fillRect(x, y, barWidth, height);
                ctx.strokeRect(x, y, barWidth, height);

                // Month label (x-axis)
                ctx.fillStyle = '#000';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(item.month, x + barWidth/2, 465);

                // Value label (above bar)
                ctx.fillText(item.value, x + barWidth/2, y - 5);
            });

            // Add axis labels
            ctx.font = '16px Arial';
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.fillText('Months', 250, 490);
            
            // Y-axis label (rotated)
            ctx.save();
            ctx.translate(15, 250);
            ctx.rotate(-Math.PI/2);
            ctx.fillText('Sales Value', 0, 0);
            ctx.restore();
        })
        .catch(error => console.error('Error loading data:', error));
});