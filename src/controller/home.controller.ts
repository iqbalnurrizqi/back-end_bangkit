import { db } from "../config/firebaseConfig";
import { Request, Response } from "express";


export const homeController = async (req: Request, res: Response) => {
  try {
    // Simulasi data fitur utama
    const features = ["scan", "products", "routines"];

    // Simulasi pengambilan produk rekomendasi dari Firestore
    const productsSnapshot = await db
      .collection("products")
      .orderBy("popularity", "desc")
      .limit(5)
      .get();
    const recommendedProducts = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Simulasi pengambilan rutinitas dari Firestore
    const routinesSnapshot = await db
      .collection("routines")
      .orderBy("created_at", "desc")
      .limit(5)
      .get();
    const routines = routinesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      status: "success",
      features,
      recommended_products: recommendedProducts,
      routines,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
