const express = require('express');
const cookieParser = require('cookie-parser');
const { verifyAccessToken } = require('../middleware/verifyJWT');
const path = require('path');

const serverConfig = (app) => {
  app.use(cookieParser()); // парсинг получеаемых куки
  app.use(express.urlencoded({ extended: 'true' })); // получение тело запроса
  app.use(express.json()); // парсинг формата json
  app.use(verifyAccessToken); // проверка токинов в куки
  app.use(express.static(path.join(__dirname, '../public'))); // указание статических файлов в папке
  // app.use(express.static(path.join(__dirname, '../dist')));
};

module.exports = serverConfig;
