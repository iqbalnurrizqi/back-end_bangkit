import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { recomendationType } from "../types/recomendationType";

export const recommendationController = async (req: Request, res: Response) => {
  try {
    const { skin_type, skin_issues }: recomendationType = req.body;

    // Validasi input
    if (!skin_type || !Array.isArray(skin_issues)) {
      return res.status(400).send({
        status: false,
        statusCode: 400,
        message: "skin_type (string) and skin_issues (array) are required",
      });
    }

    // Ambil produk yang direkomendasikan dari Firestore (contoh koleksi: "products")
    const productsSnapshot = await db
      .collection("products")
      .where("skin_type", "==", skin_type)
      .get();

    const recommendedProducts: string[] = [];
    productsSnapshot.forEach((doc) => {
      const product = doc.data();
      recommendedProducts.push(product.name);
    });

    // Ambil klinik yang direkomendasikan dari Firestore (contoh koleksi: "hospital")
    const clinicsSnapshot = await db.collection("hospital").get();
    const recommendedClinics: string[] = [];
    clinicsSnapshot.forEach((doc) => {
      const clinic = doc.data();
      recommendedClinics.push(clinic.name);
    });

    // Kirim respons dengan data rekomendasi
    res.status(200).send({
      status: true,
      statusCode: 200,
      data: {
        recommended_products: recommendedProducts,
        recommended_clinics: recommendedClinics,
      },
    });
  } catch (error: any) {
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
