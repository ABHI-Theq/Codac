import mongoose from 'mongoose';

const BlacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const BlacklistTokenModel = mongoose.model('BlacklistToken', BlacklistTokenSchema);
export default BlacklistTokenModel;
