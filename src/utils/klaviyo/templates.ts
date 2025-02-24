// utils/klaviyo/templates.ts
import klaviyoClient from './klaviyoClient';

interface TemplatePayload {
  name: string;
  html: string;
  text?: string; // Optional text version
}

export async function createTemplate({ name, html, text }: TemplatePayload): Promise<any> {
  const data = {
    data: {
      type: 'template',
      attributes: {
        name,
        editor_type: 'CODE',
        html,
        text,
      },
    },
  };

  try {
    const response = await klaviyoClient.post('/templates', data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating template:', error.response?.data || error.message);
    throw error;
  }
}
