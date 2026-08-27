import express from 'express';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

const createCollectionRouter = (resourceName: string) => {
  const router = express.Router();

  router.get('/', (_request, response) => {
    response.json([]);
  });

  router.post('/', (request, response) => {
    response.status(201).json({ resource: resourceName, data: request.body });
  });

  return router;
};

app.use('/api/users', createCollectionRouter('users'));
app.use('/api/teams', createCollectionRouter('teams'));
app.use('/api/activities', createCollectionRouter('activities'));
app.use('/api/leaderboard', createCollectionRouter('leaderboard'));
app.use('/api/workouts', createCollectionRouter('workouts'));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});