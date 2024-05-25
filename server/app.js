require('dotenv').config();
const express = require('express');
const app = express();
const serverConfig = require('./config/serverConfig');
const path = require('path');
const indexRouter = require('./routes/index.routes');

// настройки сервера (мидлварки)
serverConfig(app);

app.use('/', indexRouter); // начала маршрута для url

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/dist/index.html'));
// });

const PORT = process.env.PORT || 3000;

// запуск сервера
app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT);
});
