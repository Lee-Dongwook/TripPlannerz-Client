import { rest } from 'msw';

export const tripHandlers = [
  rest.get('http://localhost:8080/api/trip/tripList'),
  (req, res, ctx) => {
    const pageNumber = req.url.searchParams.get('page');
    const sortType = req.url.searchParams.get('sortType');
    const keyWord = req.url.searchParams.get('keyWord');

    const trips = [{ id: 1, title: 'Seoul', description: '서울 여행' }];

    return res(
      ctx.status(200),
      ctx.json({ data: trips, page: pageNumber, sortType: sortType, keyWord: keyWord })
    );
  },
];
