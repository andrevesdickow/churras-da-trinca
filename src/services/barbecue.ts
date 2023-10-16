import {
  BarbecueByIdResponse,
  BarbecueCreateResponse,
  BarbecueListResponse,
  CreateBarbecueData,
  CreateParticipantInBarbecueData,
  CreateParticipantInBarbecueResponse,
  MarkParticipantAsPaidData,
  MarkParticipantAsPaidResponse
} from '@/types/barbecue';
import { request } from './http';

export async function getBarbecues() {
  const data = await request<BarbecueListResponse>('/api/barbecue/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  });

  return data;
}

export async function getBarbecueById(barbecueId: string) {
  const data = await request<BarbecueByIdResponse>(`/api/barbecue/get?id=${barbecueId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  });

  return data;
}

export async function createBarbecue(params: CreateBarbecueData) {
  const data = await request<BarbecueCreateResponse>('/api/barbecue/create', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  });

  return data;
}

export async function createParticipantInBarbecue(params: CreateParticipantInBarbecueData) {
  const data = await request<CreateParticipantInBarbecueResponse>('/api/barbecue/create-participant', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  });

  return data;
}

export async function markParticipantAsPaid(params: MarkParticipantAsPaidData) {
  const data = await request<MarkParticipantAsPaidResponse>('/api/barbecue/mark-participant-as-paid', {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  });

  return data;
}
