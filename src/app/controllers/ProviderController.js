import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attibutes: ['id', 'name', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attibutes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json({ providers });
  }
}

export default new ProviderController();
