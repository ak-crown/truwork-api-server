import mongoose from 'mongoose'

const ApplicationStatuses = ['in-progress', 'approved', 'rejected']

interface IApplicationAttrs {
  user: string
  work: string
  status?: string
}

interface IApplicationDoc extends IApplicationAttrs, mongoose.Document {
  createdAt?: string
  updatedAt?: string
}

interface IApplicationModel extends mongoose.Model<IApplicationDoc> {
  build(attrs: IApplicationAttrs): IApplicationDoc
}

const ApplicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    work: { type: mongoose.Types.ObjectId, ref: 'Work', required: true },
    status: {
      type: String,
      trim: true,
      enum: ApplicationStatuses,
      default: ApplicationStatuses[0],
    },
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

ApplicationSchema.statics.build = (attrs: IApplicationAttrs) => {
  return new Application(attrs)
}

const Application = mongoose.model<IApplicationDoc, IApplicationModel>(
  'Application',
  ApplicationSchema
)

export { Application }
