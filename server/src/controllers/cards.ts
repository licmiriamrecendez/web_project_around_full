import type { Request, Response } from "express";
import Card from "../models/card.js";

export const getCards = async (req: Request, res: Response) => {
  const cards = await Card.find({});
  const userId = req.user?._id;

  const cardsWithIsLiked = cards.map((card) => ({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === userId),
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
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user?._id } },
    { new: true },
  );

  if (!card) {
    throw Object.assign(
      new Error("No se encontró ninguna tarjeta con ese id"),
      { statusCode: 404 },
    );
  }

  const userId = req.user?._id;

  res.send({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === userId),
  });
};

export const dislikeCard = async (req: Request, res: Response) => {
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user?._id } },
    { new: true },
  );

  if (!card) {
    throw Object.assign(
      new Error("No se encontró ninguna tarjeta con ese id"),
      { statusCode: 404 },
    );
  }

  const userId = req.user?._id;

  res.send({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === userId),
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
