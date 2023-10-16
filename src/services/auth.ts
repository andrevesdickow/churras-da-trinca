import { request } from '@/services/http';
import {
  MeResponse,
  SignInData,
  SignInResponse,
  SignUpData,
  SignUpResponse
} from '@/types/auth';

export async function signIn(params: SignInData) {
  const data = await request<SignInResponse>('/api/auth/signin', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  });

  return data;
}

export async function login(params: any) {
  const data = await request<any>('http://localhost:3000/api/auth/login', {
    method: 'GET',
    // body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  });

  return data;
}

export async function signUp(params: SignUpData) {
  const data = await request<SignUpResponse>('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  });

  return data;
}

export async function me() {
  const data = await request<MeResponse>('/api/auth/me', {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  });

  return data;
}
