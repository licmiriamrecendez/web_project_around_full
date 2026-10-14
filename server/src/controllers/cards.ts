import type { Request, Response } from "express";
import Card from "../models/card.js";

export const getCards = async (req: Request, res: Response) => {
  const userId = req.user!._id;

  const cards = await Card.find({ owner: userId }).sort({
    createdAt: -1,
  });

  const cardsWithIsLiked = cards.map((card) => ({
    ...card.toObject(),
    isLiked: card.likes.some(
      (id) => id.toString() === userId.toString()
    ),
  }));

  res.send(cardsWithIsLiked);
};

export const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;

  const card = await Card.create({
    name,
    link,
    owner: req.user!._id,
  });

  const userId = req.user?._id;

  res.status(201).send({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === userId),
  });
};

export const likeCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!._id;

  const card = await Card.findById(id);

  if (!card) {
    res.status(404).send({
      message: "No se encontró ninguna tarjeta con ese id",
    });
    return;
  }

  if (card.owner.toString() !== userId.toString()) {
    res.status(403).send({
      message: "No tienes permiso para dar like a esta tarjeta",
    });
    return;
  }

  const updatedCard = await Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: userId } },
    { new: true },
  );

  res.send({
    ...updatedCard!.toObject(),
    isLiked: updatedCard!.likes.some(
      (likeId) => likeId.toString() === userId.toString(),
    ),
  });
};

export const dislikeCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!._id;

  const card = await Card.findById(id);

  if (!card) {
    res.status(404).send({
      message: "No se encontró ninguna tarjeta con ese id",
    });
    return;
  }

  if (card.owner.toString() !== userId.toString()) {
    res.status(403).send({
      message: "No tienes permiso para quitar el like de esta tarjeta",
    });
    return;
  }

  const updatedCard = await Card.findByIdAndUpdate(
    id,
    { $pull: { likes: userId } },
    { new: true },
  );

  res.send({
    ...updatedCard!.toObject(),
    isLiked: updatedCard!.likes.some(
      (likeId) => likeId.toString() === userId.toString(),
    ),
  });
};


export const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  const card = await Card.findById(id);

  if (!card) {
    res.status(404).send({
      message: "No se encontró ninguna tarjeta con ese id",
    });
    return;
  }

  if (card.owner.toString() !== req.user?._id?.toString()) {
    res.status(403).send({
      message: "No tienes permiso para eliminar esta tarjeta",
    });
    return;
  }

  await Card.findByIdAndDelete(id);

  res.send({ message: "Tarjeta eliminada correctamente" });
};
