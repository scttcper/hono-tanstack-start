import { createServerFileRoute } from '@tanstack/react-start/server';

import { app } from '../../../server/index';

const serve = async ({ request }: { request: Request }) => {
  return app.fetch(request);
};

export const ServerRoute = createServerFileRoute('/api/$').methods({
  GET: serve,
  POST: serve,
  PUT: serve,
  DELETE: serve,
  PATCH: serve,
  OPTIONS: serve,
  HEAD: serve,
});
