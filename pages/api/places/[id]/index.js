import Place from "@/db/models/Place";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(place);
  }
  if (request.method === "PATCH") {
    const updatedData = request.body;
    const place = await Place.findByIdAndUpdate(id, updatedData);

    if (!place) {
      return response
        .status(404)
        .json({ status: "Not found and could not update" });
    }
    response.status(200).json(`product ${id}updated!`);
  }
  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);

    response.status(200).json(`place ${id} deleted!`);
  }
}
