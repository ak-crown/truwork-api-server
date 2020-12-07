import mongoose from 'mongoose'
import { Password } from '../utils/password'

// an interface that describes the props
// required to create a user
interface IUserAttrs {
  email: string
  password: string
}

// an interface that describes the props
// a user model has
interface IUserModel extends mongoose.Model<IUserDoc> {
  build(attrs: IUserAttrs): IUserDoc
}

// an interface that describes the props
// a user document has
interface IUserDoc extends mongoose.Document {
  /* Mandatory details */
  email: string
  password: string

  /* general information */
  role?: string
  profilePic?: string
  name?: string
  education: mongoose.Types.ObjectId[]
  experience: mongoose.Types.ObjectId[]
  certification: mongoose.Types.ObjectId[]
  extraCurricular: mongoose.Types.ObjectId[]

  careerInterests: string[]

  websites: string[]
  city?: string
  phone?: string

  createdAt?: string
  updatedAt?: string
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },

    role: { type: String, default: 'user' },
    profilePic: { type: String },
    name: { type: String },
    education: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Education',
      },
    ],
    experience: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Experience',
      },
    ],
    certification: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Certificate',
      },
    ],
    extraCurricular: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'ExtraCurricular',
      },
    ],

    careerInterests: [{ type: String, trim: true }],

    websites: [{ type: String, trim: true }],
    city: { type: String, trim: true },
    phone: { type: String, trim: true },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        // remove the password
        delete ret.password

        // normalize the id
        ret.id = ret._id

        // remove mongo specific id format
        delete ret._id
      },
    },
  }
)

UserSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }

  done()
})

UserSchema.statics.build = (attrs: IUserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<IUserDoc, IUserModel>('User', UserSchema)

export { User }
