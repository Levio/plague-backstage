import mockjs from 'mockjs';
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
  'GET /api/user/filter': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send(
        mockjs.mock({
          code: '200',
          'data|6-15': [
            {
              username: '@ctitle(3)',
              id: '@natural',
              'gender|1': ['0', '1'],
              'apartment|1': ['研发部', '人事部', '财务部', '工程部'],
              registerTime: '@date("yyyy-MM-dd")',
              trackNum: '@integer(1, 80)',
              'isdanger|1': ['0', '1'],
              dangerNum: '@integer(1, 100)',
              articlePushNum: '@integer(0, 200)',
              'status|1': ['0', '1'],
            },
          ],
        }),
      );
    }, 500);
  },
  'GET /api/user/detail': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send(
        mockjs.mock({
          code: '200',
          data: {
            baseInfo: {
              username: '@ctitle(3)',
              id: req.query.id,
              'gender|1': ['0', '1'],
              'apartment|1': ['研发部', '人事部', '财务部', '工程部'],
              registerTime: '@date("yyyy-MM-dd")',
              trackNum: '@integer(1, 80)',
              'isdanger|1': ['0', '1'],
              dangerNum: '@integer(1, 100)',
              articlePushNum: '@integer(0, 200)',
              'status|1': ['0', '1'],
            },
            'articleInfo|4-14': [
              {
                time: '@date("yyyy-MM-dd HH:mm:ss")',
                content: '@ctitle(10)',
                url: 'www.baidu.com',
                'status|1': ['0', '1'],
              },
            ],
            dataInfo: {
              'region|5-15': [
                {
                  id: '@natural',
                  province: '@province',
                  city: '@city',
                  district: '@county',
                  address: ['研发部', '人事部', '财务部', '工程部'],
                  'isdanger|1': ['0', '1'],
                },
              ],
              'track|5-15': [
                {
                  id: '@natural',
                  time: '@ctitle(3)',
                  from: '@city',
                  to: '@city',
                  no: '@ctitle(3)',
                  'isdanger|1': ['0', '1'],
                },
              ],
              'commuting|5-15': [
                {
                  id: '@natural',
                  province: '@province',
                  city: '@city',
                  district: '@county',
                  'tool|1': ['地铁', '公交', '自驾', '出租车'],
                  startTime: '@time("HH:mm:ss")',
                  endTime: '@time("HH:mm:ss")',
                },
              ],
            },
          },
        }),
      );
    }, 500);
  },
};
