const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Define base directory from where the requested files shall be read (e.g., "public" of project directory)
const BASE_DIR = path.join(__dirname, 'public');

// Logging using morgan (Common-Format)
app.use(morgan('combined'));

// Handle all GET-Requests
app.get('/*', (req, res) => {
  // Normalize path (Secure agaist Directory Traversal)
  const safePath = path.normalize(decodeURIComponent(req.path)).replace(/^(\.\.(\/|\\|$))+/, '');
  const filePath = path.join(BASE_DIR, safePath);

  // Security check: Deliver only files from below the BASE_DIR
  if (!filePath.startsWith(BASE_DIR)) {
    // Logging: Illegal file access
    console.warn(`[SECURITY] Directory traversal attempt: ${req.path}`);
    return res.status(403).send('Forbidden');
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Logging: File not found
      console.warn(`[NOT FOUND] ${filePath}`);
      return res.status(404).send('Not Found');
    }

    // Set content-Type header according to file extension
    res.type(path.extname(filePath));

    // Return requested file
    res.sendFile(filePath, err => {
      if (err) {
        // Logging: Error while sending
        console.error(`[ERROR] Error sending file: ${filePath} – ${err.message}`);
        res.status(500).send('Internal Server Error');
      } else {
        // Logging: Successfully delivered
        console.info(`[OK] Sent file: ${filePath}`);
      }
    });
  });
});

// Starte den Server
app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});
