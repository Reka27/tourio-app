import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  }
  if (request.method === "POST") {
    try {
      const newPlaceData = request.body;
      const place = await Place.create(newPlaceData);

      return response.status(201).json({ status: "Product created." }, place);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
