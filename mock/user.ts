// import mockjs from 'mockjs';
import { Request, Response } from 'express';

export default {
  'POST /api/login': (req: Request, res: Response) => {
    const { password, username } = req.body;
    setTimeout(() => {
      if (password === '111111' && username === 'admin') {
        res.send({
          code: '200',
          data: {
            status: 'ok',
            currentAuthority: 'admin',
          },
        });
        return;
      }
      if (password === '111111' && username === 'user') {
        res.send({
          code: '200',
          data: {
            status: 'ok',
            currentAuthority: 'user',
          },
        });
        return;
      }
      res.send({
        code: '200',
        data: { status: 'error', currentAuthority: 'guest' },
      });
    }, 500);
  },
};
