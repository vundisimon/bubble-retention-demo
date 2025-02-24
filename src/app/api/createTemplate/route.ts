// app/api/createTemplate.ts
import { NextResponse } from 'next/server';
import {createTemplate} from '@/utils/klaviyo/templates'; // Update this path based on your project structure

export async function POST(req: Request) {
  try {
    // Parse incoming request body
    const { name, html } = await req.json();

    // Validate required fields
    if (!name || !html) {
      return NextResponse.json(
        { error: 'Name and HTML content are required.' },
        { status: 400 }
      );
    }

    // Call the createTemplate utility function
    const response = await createTemplate({name, html});

    // Return success response
    return NextResponse.json({
      message: 'Template created successfully!',
      data: response,
    });
  } catch (error: any) {
    console.error('Error creating template:', error.message || error);

    // Return error response
    return NextResponse.json(
      { error: error.message || 'Something went wrong.' },
      { status: 500 }
    );
  }
}
