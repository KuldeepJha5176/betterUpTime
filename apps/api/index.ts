import express from "express";
const app = express();
import { prismaClient } from "store/client";

app.use(express.json());

app.post("/website", async (req, res) => {
  if (!req.body.url) {
    res.status(411).json({});
    return;
  }
  const website = await prismaClient.website.create({
    data: {
      url: req.body.url,
      timeAdded: new Date(),
    },
  });

  res.json({
    id: website.id,
  });
});

app.get("/status/:websiteId", (req, res) => {
  const websiteId = req.params.websiteId;
  try {
    const website = await prismaClient.website.findUnique({
      where: {
        id: websiteId,
      },
    });
    res.json({
      status: website.status,
    });
  } catch (e) {
    res.status(404).json({});
  }
});

app.get("/websites", (req, res) => {
  const websites = await prismaClient.website.findMany({
    where: {
      status: "active",
    },
  });
  res.json(websites);
});

app.listen(process.env.PORT || 3000);
