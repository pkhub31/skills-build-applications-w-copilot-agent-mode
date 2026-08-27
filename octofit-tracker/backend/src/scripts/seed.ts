import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

/** Seed the octofit_db database with test data. */
async function seedDatabase() {
  try {
    await connectDatabase();
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [maya, jordan, priya] = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com', age: 29, fitnessLevel: 'Intermediate' },
      { name: 'Jordan Smith', email: 'jordan.smith@example.com', age: 34, fitnessLevel: 'Beginner' },
      { name: 'Priya Nair', email: 'priya.nair@example.com', age: 27, fitnessLevel: 'Advanced' },
    ]);

    await Team.create([
      { name: 'Trail Blazers', description: 'Weekend runners building steady endurance.', members: [maya._id, jordan._id] },
      { name: 'Strength Circle', description: 'Progressive strength training with friends.', members: [priya._id] },
    ]);

    await Activity.create([
      { user: maya._id, type: 'Run', durationMinutes: 35, caloriesBurned: 320, completedAt: new Date('2026-08-24') },
      { user: jordan._id, type: 'Cycling', durationMinutes: 45, caloriesBurned: 410, completedAt: new Date('2026-08-25') },
      { user: priya._id, type: 'Strength', durationMinutes: 50, caloriesBurned: 360, completedAt: new Date('2026-08-26') },
    ]);

    await Leaderboard.create([
      { user: maya._id, points: 860, rank: 1, period: '2026-W34' },
      { user: priya._id, points: 790, rank: 2, period: '2026-W34' },
      { user: jordan._id, points: 620, rank: 3, period: '2026-W34' },
    ]);

    await Workout.create([
      { name: 'Full Body Foundations', focus: 'Full body', difficulty: 'Beginner', durationMinutes: 30, exercises: ['Bodyweight squats', 'Incline push-ups', 'Plank'] },
      { name: 'Tempo Runner', focus: 'Cardio', difficulty: 'Intermediate', durationMinutes: 40, exercises: ['Warm-up jog', 'Tempo intervals', 'Cool-down walk'] },
      { name: 'Power Builder', focus: 'Strength', difficulty: 'Advanced', durationMinutes: 45, exercises: ['Deadlift', 'Overhead press', 'Front squat'] },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
