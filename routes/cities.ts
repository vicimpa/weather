import { Router } from "express";
import { upgrade } from "../lib/ExpresUpgrade";
import { City } from "../models/Cities";
import { citiesLimit } from "../config";

const router = Router()

upgrade(router)

router.get('/input', async (req, res) => {
  let { query } = req.query
  
  res.send(await City.find(
    query || '', citiesLimit))
})

export default router