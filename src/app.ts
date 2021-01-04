import express from 'express';
import bodyParser from 'body-parser';

import videoRouter from './routes/video';

const app = express();

app.use(bodyParser.json());

app.use('/video', videoRouter);

app.listen(3000);