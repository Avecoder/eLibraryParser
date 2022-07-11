import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    lastName: {type: String, required: true},
    eLibraryId: {type: Number, required: true, unique: true},
  },
  {
    timestamps: true
  }
)

export default mongoose.model('User', UserSchema)
