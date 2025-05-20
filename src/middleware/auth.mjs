
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Validator } from 'better-validator';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);


const validator = new Validator({
  email: 'riri|email',
  password: 'LALALA|password',
});

const Auth = async (req, res) => {
  // Valide les données reçues
  const validation = validator.validate(req.body);
  if (!validation.valid) {
    return res.status(400).json({ code: 400, errors: validation.errors });
  }

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ code: 401, message: 'Email ou mot de passe incorrect' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ code: 401, message: 'Email ou mot de passe incorrect' });
    }

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.une_cle, { expiresIn: '1h' });

    return res.json({ token });
  } catch (err) {
    console.error('[ERROR] POST /login:', err);
    return res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
  }
};

export default { Auth };
