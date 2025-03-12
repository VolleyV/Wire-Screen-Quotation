import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const widthCm = searchParams.get("width");
    const heightCm = searchParams.get("height");
    const type = searchParams.get("type");

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
    const widthMeters = width / 1000;
    const heightMeters = height / 1000;
    let price=0;

    // Calculate area in square meters
    const areaSqMeters = widthMeters * heightMeters;
    if(type==="หน้าต่างบานเลื่อนสลับ (2P,2T)"){
      if(areaSqMeters>0&&areaSqMeters<0.6){
        price=4000;
      }
      else if(areaSqMeters>0.6&&areaSqMeters<0.8){
      price=5000;
      }
      else if(areaSqMeters>0.8&&areaSqMeters<1.44){  
        price=5500;
      }
      else price=areaSqMeters*4000;
    }
    else if(type==="หน้าต่างบานเลื่อนสลับ (3P,3T)"||type==="4P2T"){
      if(areaSqMeters>0&&areaSqMeters<2){
        price=8000;
      }
      else if(areaSqMeters>2&&areaSqMeters<2.4){
      price=9000;
      }
      else if(areaSqMeters>2.4&&areaSqMeters<2.64){  
        price=10000;
      }
      else if(areaSqMeters>2.64&&areaSqMeters<2.88){  
        price=10000;}
      else price=areaSqMeters*4000;
    }
    else return NextResponse.json({ error: "ไม่มีสินค้านี้" }, { status: 404 });
    // Calculate price (70 Baht per square meter)
    //const price = areaSqMeters * 70;

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
