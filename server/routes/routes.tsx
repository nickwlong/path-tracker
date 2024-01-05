import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const app = express();
const port = 3000;

const MainPage = () => <div>Main Page</div>;
const MapPage = () => <div>Map Page</div>;
const CoordsPage = () => <div>Coords Page</div>;

app.get('/', (req, res) => {
  const content = ReactDOMServer.renderToString(<MainPage />);
  res.send(content);
});

app.get('/map', (req, res) => {
  const content = ReactDOMServer.renderToString(<MapPage />);
  res.send(content);
});

app.get('/coords', (req, res) => {
  const content = ReactDOMServer.renderToString(<CoordsPage />);
  res.send(content);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
