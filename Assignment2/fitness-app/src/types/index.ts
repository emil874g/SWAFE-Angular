// User types
export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personalTrainerId?: number | null;
  accountType: 'Client' | 'PersonalTrainer' | 'Manager';
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personalTrainerId?: number | null;
  accountType: 'Client' | 'PersonalTrainer';
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface TokenDto {
  jwt: string;
}
// Exercise types
export interface Exercise {
  exerciseId: number;
  groupId: string;
  name: string | null;
  description: string | null;
  sets: number | null;
  repetitions: number | null;
  time: string | null;
  workoutProgramId: number | null;
  personalTrainerId: number | null;
}

export interface CreateExerciseDto {
  name?: string | null;
  description?: string | null;
  sets?: number | null;
  repetitions?: number | null;
  time?: string | null;
}

export interface UpdateExerciseDto {
  exerciseId: number;
  name?: string | null;
  description?: string | null;
  sets?: number | null;
  repetitions?: number | null;
  time?: string | null;
  workoutProgramId?: number | null;
  personalTrainerId?: number | null;
}

// Workout Program types
export interface WorkoutProgram {
  workoutProgramId: number;
  groupId: string;
  name: string | null;
  description: string | null;
  exercises: Exercise[] | null;
  personalTrainerId: number;
  clientId: number | null;
}

export interface CreateWorkoutDto {
  name?: string | null;
  description?: string | null;
  exercises?: CreateExerciseDto[] | null;
  clientId?: number | null;
}

export interface UpdateWorkoutDto {
  workoutProgramId: number;
  name?: string | null;
  description?: string | null;
  personalTrainerId: number;
  clientId?: number | null;
}

// Auth context types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
