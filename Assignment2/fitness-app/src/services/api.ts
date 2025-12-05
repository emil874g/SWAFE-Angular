import {
  User,
  CreateUserDto,
  LoginDto,
  TokenDto,
  Exercise,
  CreateExerciseDto,
  UpdateExerciseDto,
  WorkoutProgram,
  CreateWorkoutDto,
  UpdateWorkoutDto,
} from '@/types';

const API_BASE_URL = 'https://assignment2.swafe.dk/api';

class ApiService {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    if (!text) {
      return {} as T;
    }
    return JSON.parse(text);
  }

  // Auth endpoints
  async login(credentials: LoginDto): Promise<TokenDto> {
    const response = await fetch(`${API_BASE_URL}/Users/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials),
    });
    return this.handleResponse<TokenDto>(response);
  }

  async getUser(id: number): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/Users/${id}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<User>(response);
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/Users`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(user),
    });
    return this.handleResponse<User>(response);
  }

  async getClients(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/Users/Clients`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<User[]>(response);
  }

  // Exercise endpoints
  async getExercises(): Promise<Exercise[]> {
    const response = await fetch(`${API_BASE_URL}/Exercises`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Exercise[]>(response);
  }

  async getExercise(id: number): Promise<Exercise> {
    const response = await fetch(`${API_BASE_URL}/Exercises/${id}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Exercise>(response);
  }

  async createExercise(exercise: CreateExerciseDto): Promise<Exercise> {
    const response = await fetch(`${API_BASE_URL}/Exercises`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(exercise),
    });
    return this.handleResponse<Exercise>(response);
  }

  async addExerciseToProgram(programId: number, exercise: CreateExerciseDto): Promise<Exercise> {
    const response = await fetch(`${API_BASE_URL}/Exercises/Program/${programId}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(exercise),
    });
    return this.handleResponse<Exercise>(response);
  }

  async updateExercise(id: number, exercise: UpdateExerciseDto): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/Exercises/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(exercise),
    });
    await this.handleResponse<void>(response);
  }

  // Workout Program endpoints
  async getWorkoutPrograms(): Promise<WorkoutProgram[]> {
    const response = await fetch(`${API_BASE_URL}/WorkoutPrograms`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<WorkoutProgram[]>(response);
  }

  async getTrainerPrograms(): Promise<WorkoutProgram[]> {
    const response = await fetch(`${API_BASE_URL}/WorkoutPrograms/trainer`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<WorkoutProgram[]>(response);
  }

  async getClientPrograms(clientId: number): Promise<WorkoutProgram[]> {
    const response = await fetch(`${API_BASE_URL}/WorkoutPrograms/client/${clientId}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<WorkoutProgram[]>(response);
  }

  async getWorkoutProgram(id: number): Promise<WorkoutProgram> {
    const response = await fetch(`${API_BASE_URL}/WorkoutPrograms/${id}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<WorkoutProgram>(response);
  }

  async createWorkoutProgram(program: CreateWorkoutDto): Promise<WorkoutProgram> {
    const response = await fetch(`${API_BASE_URL}/WorkoutPrograms`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(program),
    });
    return this.handleResponse<WorkoutProgram>(response);
  }

  async updateWorkoutProgram(id: number, program: UpdateWorkoutDto): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/WorkoutPrograms/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(program),
    });
    await this.handleResponse<void>(response);
  }

  async deleteWorkoutProgram(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/WorkoutPrograms/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    await this.handleResponse<void>(response);
  }
}

export const apiService = new ApiService();
export default apiService;
