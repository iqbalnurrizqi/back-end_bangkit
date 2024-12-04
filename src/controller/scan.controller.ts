import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { scanType } from "../types/scanType";

export const scanController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res
        .status(400)
        .json({ status: "error", message: "User ID is missing in token" });
    }

    // Ambil riwayat scan pengguna dari Firestore
    const scansSnapshot = await db
      .collection("scans")
      .where("userId", "==", userId)
      .orderBy("date", "desc")
      .get();

    if (scansSnapshot.empty) {
      res.status(404).json({
        status: "success",
        history: [], // Kembalikan array kosong jika tidak ada data
      });
    }

    // Format data scan ke dalam array
    const history = scansSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      status: "success",
      history,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const addScanController = async (req: Request, res: Response) => {
  try {
    const userId:string = req.user.id; // Assuming authMiddleware attaches user info to req.user
    const { image_uri, skin_type, skin_issues }: scanType = req.body;

    // Validate request body
    if (!skin_type || !skin_issues) {
       res.status(400).send({
        status: false,
        statusCode: 400,
        message:
          "Invalid request body. 'skin_type' and 'skin_issues' are required.",
      });
    }

    // Save scan result to Firestore
    const scanData = {
      userId,
      image_uri: image_uri || null, // Optional image URI
      skin_type,
      skin_issues,
      date: new Date().toISOString(), // Save the timestamp
    };

    await db.collection("scan_results").add(scanData);

    // Respond with success
     res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Analysis result uploaded successfully.",
    });
  } catch (error) {
    console.error("Error uploading scan result:", error);
     res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Failed to upload analysis result.",
    });
  }
};
