import { Request, Response } from 'express';

export default function helloGoStack(request: Request, response: Response) {
    return response.json({ message: "Hello GoStack, router it's work" });
}
