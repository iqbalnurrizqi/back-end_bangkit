import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { scanType } from "../types/scanType";

<<<<<<< HEAD
export const scanController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Received request for scan history");

    const userId = req.user?.id;
    console.log("User ID from token:", userId); // Debugging User ID

    if (!userId) {
      console.log("Error: User ID is missing in token");
      res.status(400).json({ status: "error", message: "User ID is missing in token" });
      return; // Ensure the function exits after sending the response
    }

    // Fetch user's scan history
    console.log("Fetching scan history for user ID:", userId);
    const scansSnapshot = await db
      .collection("scan_results")
=======
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
>>>>>>> 436bc12c236936ddc5fa695960915ee183b3379c
      .where("userId", "==", userId)
      .orderBy("date", "desc")
      .get();

    if (scansSnapshot.empty) {
<<<<<<< HEAD
      console.log("No scan history found for user ID:", userId);
      res.status(404).json({
        status: "success",
        history: [], // Return empty array if no data
      });
      return; // Exit after sending the response
    }

    // Map the scan history to an array
=======
      res.status(404).json({
        status: "success",
        history: [], // Kembalikan array kosong jika tidak ada data
      });
    }

    // Format data scan ke dalam array
>>>>>>> 436bc12c236936ddc5fa695960915ee183b3379c
    const history = scansSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
<<<<<<< HEAD
    console.log("Scan history retrieved:", history);
=======
>>>>>>> 436bc12c236936ddc5fa695960915ee183b3379c

    res.status(200).json({
      status: "success",
      history,
    });
  } catch (error: any) {
<<<<<<< HEAD
    console.error("Error fetching scan history:", error);
=======
>>>>>>> 436bc12c236936ddc5fa695960915ee183b3379c
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

<<<<<<< HEAD

export const addScanController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.user?.id; // Assuming `authMiddleware` attaches `user` to `req`
    const { image_uri, skin_type, skin_issues }: scanType = req.body;

    console.log("Received scan data:", { image_uri, skin_type, skin_issues });

    // Validate the request body
    if (!skin_type || !skin_issues) {
      console.log("Error: Invalid request body. 'skin_type' and 'skin_issues' are required.");
      res.status(400).send({
        status: false,
        statusCode: 400,
        message: "Invalid request body. 'skin_type' and 'skin_issues' are required.",
      });
      return; // Exit the function after sending the response
    }

    // Save the scan result to Firestore
=======
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
>>>>>>> 436bc12c236936ddc5fa695960915ee183b3379c
    const scanData = {
      userId,
      image_uri: image_uri || null, // Optional image URI
      skin_type,
      skin_issues,
      date: new Date().toISOString(), // Save the timestamp
    };
<<<<<<< HEAD
    console.log("Saving scan data to Firestore:", scanData);
=======
>>>>>>> 436bc12c236936ddc5fa695960915ee183b3379c

    await db.collection("scan_results").add(scanData);

    // Respond with success
<<<<<<< HEAD
    res.status(200).send({
=======
     res.status(200).send({
>>>>>>> 436bc12c236936ddc5fa695960915ee183b3379c
      status: true,
      statusCode: 200,
      message: "Analysis result uploaded successfully.",
    });
<<<<<<< HEAD
  } catch (error: any) {
    console.error("Error uploading scan result:", error);
    res.status(500).send({
=======
  } catch (error) {
    console.error("Error uploading scan result:", error);
     res.status(500).send({
>>>>>>> 436bc12c236936ddc5fa695960915ee183b3379c
      status: false,
      statusCode: 500,
      message: "Failed to upload analysis result.",
    });
  }
};
