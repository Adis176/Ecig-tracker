const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      '@mui/material': path.resolve(__dirname, 'node_modules/@mui/material')
      // Add any other aliases as needed
    },
  },
};
