import mongoose from "mongoose";
import prodct from "../utils/products.schemas";

export interface outputLoginProductDTO {
  id: string;
  stat: boolean;
}
export interface outputByIdProductDTO {
  owner: string;
  stat: boolean;
}

export const loginProductInDb = async (
  owner: string,
  clav_prodct: string
): Promise<outputLoginProductDTO> => {
  try {
    console.log({ owner, clav_prodct });
    const objectOwner = await prodct
      .findOne({
        owner,
        clav_prodct,
      })
      .exec();
    if (!objectOwner) {
      console.log(objectOwner);
      return { id: "error, owner no found", stat: false };
    }
    return { id: objectOwner._id.toString(), stat: objectOwner.stat };
  } catch (error) {
    console.error("Object owner was'nt find");
    return { id: `${error}`, stat: false };
  }
};

// Función para obtener un producto por ID
export const findProductInDb = async (
  id: string
): Promise<outputByIdProductDTO> => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    const objectOwner = await prodct.findById(objectId).exec();
    if (!objectOwner) {
      console.log(objectOwner);
      return { owner: "error, ID no found", stat: false };
    }
    return { owner: objectOwner.owner, stat: objectOwner.stat };
  } catch (error) {
    console.error("Object ID was'nt find");
    return { owner: `${error}`, stat: false };
  }
};

export const findProductInDbByEmail = async (
  owner: string
): Promise<string> => {
  try {
    const objectOwner = await prodct
      .findOne({
        owner,
      })
      .exec();
    if (!objectOwner) {
      return "error, owner no found";
    }
    return objectOwner._id.toString();
  } catch (error) {
    console.error("Object owner was'nt find");
    return `${error}`;
  }
};
