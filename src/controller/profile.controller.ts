import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { profileType } from "../types/profileType";

export const getProfile = async (req: Request, res: Response) => {
  try {
    // Ambil userId dari token JWT
    const userId: string = req.user?.id;
    if (!userId) {
      res.status(400).send({status:false, statusCode:400, message: "User ID is missing in token" });
    }

    // Ambil data pengguna dari Firestore
    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      res.status(404).send({status:false, statusCode:404, message: "User not found" });
    }

    const userData = userDoc.data();

    // Response data profil pengguna
    res.status(200).send({
      name: userData?.displayName,
      email: userData?.email,
      skinType: userData?.skinType || "Unknown",
      skinProblems: userData?.skinProblems || [],
    });
  } catch (error: any) {
    res.status(500).send({status:false, statusCode:500, error: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, skinType, skinProblems }:profileType = req.body;

  if (!name && !skinType && !skinProblems) {
    res
      .status(400)
      .send({status:false, statusCode:400, message: "At least one field is required to update the profile" });
  }

  try {
    // Ambil userId dari token JWT
    const userId: string = req.user?.id;
    if (!userId) {
      res.status(400).send({status:false, statusCode:400, message: "User ID is missing in token" });
    }

    // Perbarui data pengguna di Firestore
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      res.status(404).send({status:false, statusCode:404, message: "User not found" });
    }

    // Data yang akan diperbarui
    const updatedData: any = {};
    if (name) updatedData.displayName = name;
    if (skinType) updatedData.skinType = skinType;
    if (skinProblems) updatedData.skinProblems = skinProblems;

    console.log(updatedData);

    // Perbarui dokumen pengguna
    await userRef.update(updatedData);

    res.status(200).send({status:true, statusCode:200, message: "Profile updated successfully" });
  } catch (error: any) {
    res.status(500).send({status:false, statusCode:500, message: error.message });
  }
};



// Untuk mengambil data profil pengguna.
export const getProfileData = async (req: Request, res: Response) => {
  try {
    // Ambil userId dari token JWT
    const userId: string = req.user?.id;
    if (!userId) {
      res
        .status(400)
        .send({ status: false, statusCode:400, message: "User ID is missing in token" });
    }

    // Ambil data pengguna dari Firestore
    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      res.status(404).send({ status: false, statusCode:404, message: "User not found" });
    }

    const userData = userDoc.data();

    // Format response
    const response = {
      status: "success",
      data: {
        name: userData?.name || "N/A",
        email: userData?.email || "N/A",
        skin_type: userData?.skinType || "Unknown",
        skin_issues: userData?.skinIssues || [],
        treatment_goal: userData?.treatmentGoal || "N/A",
        photo_url: userData?.photoUrl || "N/A",
      },
    };
    res.status(201).send({status:true, statusCode:201, message:"get profile data success", data:response});
  } catch (error: any) {
    res.status(400).send({ status:false, statusCOde:400, message: error.message });
  }
};

export const updateProfileData = async (req: Request, res: Response) => {
  try {
    // Ambil userId dari token JWT
    const userId: string = req.user?.id;
    if (!userId) {
      res
        .status(400)
        .send({ status: false, statusCode:400, message: "User ID is missing in token" });
    }

    // Validasi data input
    const { name, skin_type, skin_issues, treatment_goal } = req.body;
    if (!name || !skin_type || !Array.isArray(skin_issues) || !treatment_goal) {
      res.status(400).send({
        status: false,
        stutusCode:400,
        message: "Invalid request body. Please provide all required fields.",
      });
    }

    // Perbarui data pengguna di Firestore
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      res
        .status(404)
        .send({ status: false, statusCode:404, message: "User not found" });
    }

    await userRef.update({
      displayName: name,
      skinType: skin_type,
      skinIssues: skin_issues,
      treatmentGoal: treatment_goal,
    });

    res
      .status(200)
      .send({ status: true, statusCode:200, message: "Profile updated successfully" });
  } catch (error: any) {
    res.status(500).send({ status: false, statusCode:500, message: error.message });
  }
};
