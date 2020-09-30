import express from 'express';
import bodyParser from 'body-parser';

import router from './routes';

import { genericErrorHandler } from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT || 9090;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router
app.use(router);
app.use(genericErrorHandler);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

export default app;
