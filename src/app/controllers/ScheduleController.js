import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import User from '../models/User';

import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const checkUser = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkUser) {
      res.status(400).json({ error: ' User is not a provider' });
    }

    const { date } = req.query;
    const parseDate = parseISO(date);

    const Appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      },
      order: ['date'],
    });

    return res.json(Appointments);
  }
}

export default new ScheduleController();
