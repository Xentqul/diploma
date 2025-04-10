const path = require('path'); // Только ОДИН раз в начале файла!

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@assets': path.resolve(__dirname, 'src/assets/')
    }
  }
};