import mongoose from 'mongoose'

interface IEducationAttrs {
  degree: string
  yearOfCompletion: number

  grade?: string
  specialization?: string
  college?: string
}

interface IEducationDoc extends IEducationAttrs, mongoose.Document {
  createdAt?: string
  updatedAt?: string
}

interface IEducationModel extends mongoose.Model<IEducationDoc> {
  build(attrs: IEducationAttrs): IEducationDoc
}

const EducationSchema = new mongoose.Schema(
  {
    degree: { type: String, trim: true, required: true },
    yearOfCompletion: { type: Number, required: true },

    grade: { type: String, trim: true },
    specialization: { type: String, trim: true },
    college: { type: String, trim: true },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        // normalize the id
        ret.id = ret._id

        // remove mongo specific id format
        delete ret._id
      },
    },
  }
)

EducationSchema.statics.build = (attrs: IEducationAttrs) => {
  return new Education(attrs)
}

const Education = mongoose.model<IEducationDoc, IEducationModel>(
  'Education',
  EducationSchema
)

export { Education }
