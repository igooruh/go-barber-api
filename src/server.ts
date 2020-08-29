import express from 'express';

import startRoutes from './routes/StartRoutes';

const app = express();

app.use(express.json());
app.use('/', startRoutes);

app.listen(3333, () => console.log('Server GoStack 🚀'));
