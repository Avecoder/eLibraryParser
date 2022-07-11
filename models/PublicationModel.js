import mongoose from 'mongoose'

const PublicationsSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    publicationId: {type: Number, required: true},
    source: {type: String, required: true},
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    authors: [{type: String, required: true}],
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Publications', PublicationsSchema)
