// Fetch the data from the JSON file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        drawChart(data);
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to draw the chart
function drawChart(data) {
    // for more info, check : https://www.w3schools.com/graphics/canvas_drawing.asp
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    const maxAmount = Math.max(...data.map(item => item.amount));

    // adjust the width of the bars
    const barWidth = 30;
    // bar space-x
    const spacing = 10;
    // canvas.height(height of canvas element in px)
    // caculate height available for drawing chart
    const chartHeight = canvas.height - 40;
    // Centering the chart
    const startX = (canvas.width - (barWidth + spacing) * data.length) / 2;

    // Draw rectangles
    function roundRect(x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();
    }

    // Draw bars for each day
    data.forEach((item, index) => {
        const x = startX + index * (barWidth + spacing);
        const y = chartHeight - (item.amount / maxAmount) * chartHeight;
        const height = (item.amount / maxAmount) * chartHeight;

        ctx.fillStyle = item.day === 'wed' ? 'hsl(186, 34%, 60%)' : 'hsl(10, 79%, 65%)';

        // round the chart corners
        roundRect(x, y, barWidth, height, 3);
        ctx.fill();

        // Display the day below each chart
        // change day color
        ctx.fillStyle = 'hsl(28, 10%, 53%)';
        ctx.textAlign = 'center';
        ctx.fillText(item.day, x + barWidth / 2, canvas.height - 10);
    });
}