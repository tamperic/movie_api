const http = require('http'), // Import the HTTP module
      url = require('url'), // Import the URL module
      fs = require('fs'); // Import the FS module


http.createServer((request, response) => {
    let addr = request.url, // Allow to get the URL from the request
        q = new URL(addr, 'http://' + request.headers.host),
        filePath = '';

    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Added to log.');
        }
    });

    if (q.pathname.includes('documentation')) {
        filePath = (__dirname + '/documentation.html'); 
    } else {
        filePath = 'index.html'
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        } 
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
}).listen(8080); // Listen for a reponse on Port 8080
console.log('My test server is running on Port 8080.');