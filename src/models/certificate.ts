import mongoose from 'mongoose'

interface ICertificateAttrs {
  subject: string
  completionDate: Date

  issuedBy?: string
}

interface ICertificateDoc extends ICertificateAttrs, mongoose.Document {
  createdAt?: string
  updatedAt?: string
}

interface ICertificateModel extends mongoose.Model<ICertificateDoc> {
  build(attrs: ICertificateAttrs): ICertificateDoc
}

const CertificateSchema = new mongoose.Schema(
  {
    subject: { type: String, trim: '', required: true },
    completionDate: { type: Date, required: true },

    issuedBy: { type: String, trim: '' },
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

CertificateSchema.statics.build = (attrs: ICertificateAttrs) => {
  return new Certificate(attrs)
}

const Certificate = mongoose.model<ICertificateDoc, ICertificateModel>(
  'Certificate',
  CertificateSchema
)

export { Certificate }
