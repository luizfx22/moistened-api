import { NextApiRequest, NextApiResponse } from 'next';
import { SoilData } from '../../models';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const resdvb = new SoilData({ ...req.body });
  resdvb.save();

  res.status(201).send('SALVOU!');
};
