import { Router } from "express";
import { upgrade } from "../lib/ExpresUpgrade";
import { City } from "../models/Cities";
import { citiesLimit } from "../config";

const router = Router()

upgrade(router)

router.get(['/input', '/input/:data'], async (req, res) => {
  let { data } = req.params

  return await City.find(
    data || '', citiesLimit)
})

export default router