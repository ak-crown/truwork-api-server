import mongoose from 'mongoose'

interface IExtraCurricularAttrs {
  year: number
  subject: string

  description?: string
}

interface IExtraCurricularDoc extends IExtraCurricularAttrs, mongoose.Document {
  createdAt?: string
  updatedAt?: string
}

interface IExtraCurricularModel extends mongoose.Model<IExtraCurricularDoc> {
  build(attrs: IExtraCurricularAttrs): IExtraCurricularDoc
}

const ExtraCurricularSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true },
    subject: { type: String, trim: '', required: true },

    description: { type: String, trim: '' },
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

ExtraCurricularSchema.statics.build = (attrs: IExtraCurricularAttrs) => {
  return new ExtraCurricular(attrs)
}

const ExtraCurricular = mongoose.model<
  IExtraCurricularDoc,
  IExtraCurricularModel
>('ExtraCurricular', ExtraCurricularSchema)

export { ExtraCurricular }
