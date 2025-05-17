const Mission = require('../models/Mission');
const Skill = require('../models/Skill');

exports.getStatusCount = async (req, res) => {
  try {
    const completed = await Mission.countDocuments({ status: 'completata' });
    const ongoing = await Mission.countDocuments({ status: 'in_corso' });
    const failed = await Mission.countDocuments({ status: 'fallita' });

    res.json({ completed, ongoing, failed });
  } catch (err) {
    res.status(500).json({ message: 'Errore nel conteggio delle missioni' });
  }
};

exports.getSkillsHistory = async (req, res) => {
  try {
    const history = await Skill.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const formatted = history.map(h => ({ date: h._id, count: h.count }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Errore nel recupero della cronologia skill' });
  }
};

exports.getRobotDistribution = async (req, res) => {
  try {
    const distribution = await Mission.aggregate([
      {
        $group: {
          _id: '$robot',
          count: { $sum: 1 }
        }
      }
    ]);

    const formatted = distribution.map(d => ({ robot: d._id, count: d.count }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Errore nella distribuzione robot' });
  }
};