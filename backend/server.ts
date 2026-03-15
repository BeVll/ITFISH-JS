import express from "express";
//const express = require("express");
import { pool } from "./data/db.ts";

const app = express();

app.get("/games", async (req, res) => {
  const result = await pool.query("select * from games ");

  res.json(result.rows);
});

app.get("/games/:slug", async (req, res) => {
  const slug = req.params.slug;

  const result = await pool.query(
    `select * from games g where g.slug='${slug}'`
  );
  console.log(result);
  res.json(result.rows[0]);
});

app.listen(5001, (error) => {
  console.log("Server running");
  if (error) console.log("Error", error);
});
