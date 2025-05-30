const User = require('../models/user');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User exists' });

    const user = new User({ username, password });
    await user.save();

    req.session.user = { id: user.id, username: user.username };
    res
      .status(201)
      .json({ message: 'Registered successfully', user: req.session.user });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password)
      return res.status(401).json({ message: 'Invalid Credentials' });

    req.session.user = { id: user.id, username: user.username };
    res.json({ message: 'Logged in', user: req.session.user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
};

exports.getUser = (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: 'Unauthorized' });
  res.json({ user: req.session.user });
};
