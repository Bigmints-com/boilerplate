import { z } from 'zod';

export const ToolDefinition = {
  name: 'get_time',
  description: 'Returns the current system time in ISO format.',
  params: z.object({}),
  execute: async () => {
    return new Date().toISOString();
  },
};
