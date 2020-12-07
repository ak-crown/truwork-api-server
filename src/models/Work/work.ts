import mongoose from 'mongoose'

export const discriminatorKey = 'type'

const WorkStatuses = ['open', 'on-hold', 'closed']

export interface IWorkAttrs {
  designation: string
  postedBy: string
  company: string
  location: string
  description: string
  requirements: string
  applications: any[]
  status: typeof WorkStatuses[number]

  preferences?: string
}

interface IWorkDoc extends IWorkAttrs, mongoose.Document {
  createdAt?: string
  updatedAt?: string
}

const WorkSchema = new mongoose.Schema(
  {
    postedBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    designation: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, trim: true, required: true },
    requirements: { type: String, trim: true, required: true },
    preferences: { type: String, trim: true },
    applications: [{ type: mongoose.Types.ObjectId, ref: 'Application' }],
    status: {
      type: String,
      trim: true,
      default: WorkStatuses[0],
      enum: WorkStatuses,
    },
  },
  {
    timestamps: true,
    discriminatorKey,
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

const Work = mongoose.model<IWorkDoc>('Work', WorkSchema)

export { Work }
