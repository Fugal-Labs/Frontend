import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validations";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = registrationSchema.parse(body);

    // TODO: In production, save to database
    // For now, just log the registration
    console.log("New registration:", validatedData);

    // TODO: Send confirmation email
    // await sendConfirmationEmail(validatedData.email);

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful!",
        data: {
          name: validatedData.name,
          email: validatedData.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during registration",
      },
      { status: 500 }
    );
  }
}
