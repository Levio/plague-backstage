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
            user: {
              id: '1',
              name: 'admin',
              avatar: '',
              authority: 'admin',
            },
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
            user: {
              id: '2',
              name: 'user',
              avatar: '',
              authority: 'user',
            },
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
  'GET /api/user': (req: Request, res: Response) => {
    const { id } = req.query;
    setTimeout(() => {
      if (id === '1') {
        res.send({
          code: '200',
          data: {
            name: 'admin',
            avatar: '',
            authority: 'admin',
            id: '1',
          },
        });
        return;
      }
      if (id === '2') {
        res.send({
          code: '200',
          data: {
            name: 'user',
            avatar: '',
            authority: 'user',
            id: '2',
          },
        });
        return;
      }
      res.send({
        code: '502',
        message: '未找到用户',
      });
    }, 500);
  },
};
