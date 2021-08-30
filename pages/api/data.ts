import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';
import { SoilData } from '../../models';

const validator = yup.object().shape({
  air_temperature: yup.number().required(),
  air_humidity: yup.number().required(),
  soil_humidity: yup.number().required(),
  readed_by: yup.string().required(),
  readed_at: yup.date().required(),
});

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body } = req;

    const isValid = validator.isValidSync(body);

    if (!isValid) {
      return res.status(400).json({ message: 'Body content is invalid!' });
    }

    new SoilData(body).save();

    return res.status(201).send('SALVOU!');

    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
