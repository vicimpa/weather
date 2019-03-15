import { Router, static as staticFolder } from "express";
import { indexPage, publicPath } from "../config";

const router = Router()
const { cwd } = process

router.get('/', (req, res) =>
  res.sendFile(indexPage, { root: cwd()}))

for (let local in publicPath)
  router.use(local, staticFolder(publicPath[local]))

export default router