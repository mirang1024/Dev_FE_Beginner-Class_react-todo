import axios from "axios";
import type { VercelRequest, VercelResponse } from '@vercel/node'

// 요청과 응답 매개변수
export default async function (req: VercelRequest, res: VercelResponse) {
  res.status(200).json([
    {name: 'Mirang'},
    {age: 100}
  ])
}