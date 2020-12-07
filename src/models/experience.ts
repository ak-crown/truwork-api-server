import mongoose from 'mongoose'

interface IExperienceAttrs {
  company: string
  designation: string
  startDate: Date

  endDate?: Date
  currentlyWorkHere?: boolean
  highlights?: string
  responsibilities?: string
}

interface IExperienceDoc extends IExperienceAttrs, mongoose.Document {
  createdAt?: string
  updatedAt?: string
}

interface IExperienceModel extends mongoose.Model<IExperienceDoc> {
  build(attrs: IExperienceAttrs): IExperienceDoc
}

const ExperienceSchema = new mongoose.Schema(
  {
    company: { type: String, trim: '', required: true },
    designation: { type: String, trim: '', required: true },
    startDate: { type: Date, required: true },

    endDate: { type: Date },
    currentlyWorkHere: { type: Boolean },
    highlights: { type: String, trim: '' },
    responsibilities: { type: String, trim: '' },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

ExperienceSchema.statics.build = (attrs: IExperienceAttrs) => {
  return new Experience(attrs)
}

const Experience = mongoose.model<IExperienceDoc, IExperienceModel>(
  'Experience',
  ExperienceSchema
)

export { Experience }
