import { rest } from 'msw';

export const handlers = [rest.post('/login', () => {}), rest.get('/user', () => {})];
