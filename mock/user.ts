// import mockjs from 'mockjs';
import { Request, Response } from 'express';

export default {
  'POST /api/login': (req: Request, res: Response) => {
    const { password, userName } = req.body;
    setTimeout(() => {
      if (password === '111111' && userName === 'admin') {
        res.send({
          status: 'ok',
          currentAuthority: 'admin',
        });
        return;
      }
      if (password === '111111' && userName === 'user') {
        res.send({
          status: 'ok',
          currentAuthority: 'user',
        });
        return;
      }
      res.send({
        status: 'error',
        currentAuthority: 'guest',
      });
    }, 500);
  },
};
