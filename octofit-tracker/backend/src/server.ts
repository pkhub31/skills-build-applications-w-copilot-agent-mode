import express from 'express';
import type { Model } from 'mongoose';
import { connectDatabase } from './config/database.js';
import { Activity } from './models/activity.js';
import { Leaderboard } from './models/leaderboard.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

const createCollectionRouter = (model: Model<any>, resourceName: string) => {
  const router = express.Router();

  router.get('/', async (_request, response, next) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json({ resource: resourceName, data: document });
    } catch (error) {
      next(error);
    }
  });

  return router;
};

app.use('/api/users', createCollectionRouter(User, 'users'));
app.use('/api/teams', createCollectionRouter(Team, 'teams'));
app.use('/api/activities', createCollectionRouter(Activity, 'activities'));
app.use('/api/leaderboard', createCollectionRouter(Leaderboard, 'leaderboard'));
app.use('/api/workouts', createCollectionRouter(Workout, 'workouts'));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start OctoFit API:', error);
    process.exit(1);
  });