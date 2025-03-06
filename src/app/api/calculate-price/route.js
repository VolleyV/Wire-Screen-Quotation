import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const widthCm = searchParams.get("width");
    const heightCm = searchParams.get("height");

    if (!widthCm || !heightCm) {
      return NextResponse.json(
        { error: "Width and height are required parameters" },
        { status: 400 }
      );
    }

    const width = parseFloat(widthCm);
    const height = parseFloat(heightCm);

    if (isNaN(width) || isNaN(height)) {
      return NextResponse.json(
        { error: "Invalid width or height values" },
        { status: 400 }
      );
    }

    // Convert cm to meters
    const widthMeters = width / 100;
    const heightMeters = height / 100;

    // Calculate area in square meters
    const areaSqMeters = widthMeters * heightMeters;

    // Calculate price (70 Baht per square meter)
    const price = areaSqMeters * 70;

    const calculatedPriceData = [{ price: price.toFixed(2) }]; // Format to 2 decimal places

    return NextResponse.json({ data: calculatedPriceData });
  } catch (error) {
    console.error("Error calculating price:", error);
    return NextResponse.json(
      { error: "Failed to calculate price" },
      { status: 500 }
    );
  }
}
