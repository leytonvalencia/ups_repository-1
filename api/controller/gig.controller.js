import gigModel from "../models/gig.model.js";
import Gig from "../models/gig.model.js"
import createError from "../utils/createError.js"
//import { UserButton, useUser  } from "@clerk/clerk-react";
import User from "../models/user.model.js"


export const createGig = async(req,res, next) =>{
     const newGig = new Gig({
        // userId: req.userId, 
        ...req.body,
     })

     try{
        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    }catch(err){
        next(err)
    }
}




export const deleteGig = async(req,res, next) =>{
    try{
        // const gig = await Gig.findById(req.params.id);
        // console.log(gig)
        // if(gig.userId !== req.userId)
        //     return next(createError(403, "You can delete onlu your gig!"))
        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).send("Gig has been deleted!")
    }catch(err){
        next(err)
    }
}

export const getGig = async(req,res, next) =>{
    try{
        const gig = await Gig.findById(req.params.id);
        if(!gig) next(createError(404, "Gig not found"))
        res.status(200).send(gig)
    }catch(err){
        next(err)
    }

    

}

export const getGigs = async(req,res, next) =>{
    const q = req.query;
    const filters = {
      ...(q.userId && { userId: q.userId }),
      ...(q.cat && { cat: q.cat }),
      ...(q.level && { level: q.level }),
      ...(q.tools && { tools: { $in: q.tools } }),
      ...(q.search && { title: { $regex: q.search, $options: "i" } }),

    };

    try{
        const gig = await Gig.find(filters).sort({[q.sort]: -1});
        res.status(200).send(gig)
    }catch(err){
        next(err)
    }
}



export const updateGigPrivacy = async (req, res, next) => {
    try {
      // Desestructura el cuerpo de la solicitud para obtener el nuevo valor de privacidad

       const  newPrivacyValue  = req.body.privacity

       console.log("Privacidad del gig: ",newPrivacyValue);

    //const newPrivacyValue = true

      // Realiza la actualización utilizando findByIdAndUpdate
      const updatedGig = await Gig.findByIdAndUpdate(
        req.params.id,
        { $set: { privacity: newPrivacyValue } },
        { new: true } // Esto devuelve el documento actualizado en lugar del original
      );
  
      if (!updatedGig) {
        // Si no se encuentra el gig, puedes devolver un error o un mensaje apropiado
        return res.status(404).send("Gig not found");
      }
  
      res.status(200).json(updatedGig);
    } catch (err) {
      next(err);
    }
  };