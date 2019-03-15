import { Router } from "express";
import { upgrade } from "../lib/ExpresUpgrade";
import { Weather } from "../lib/Weather";
import { apiKey } from "../config";

const weather = new Weather(apiKey)
const router = Router()

upgrade(router)

router.get('/byid/:id', async (req, res) => {
  let { id } = req.params
  res.send(await weather.byId(id))
})

router.get(['/byname/:name', '/byname/:name/:country'], async (req, res) => {
  let { name, country } = req.params
  res.send(await weather.byName(name, country))
})


export default router