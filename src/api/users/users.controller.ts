import { Request, Response } from 'express'
import { User } from '../../models/user'
import { Education } from '../../models/education'
import { Experience } from '../../models/experience'
import { Certificate } from '../../models/certificate'
import { ExtraCurricular } from '../../models/extra-curricular'

export const onboard = async (req: Request, res: Response) => {
  const {
    profilePic,
    name,
    phone,
    city,
    careerInterests,
    education,
    experience,
    certification,
    extraCurricular,
  } = req.body

  const educationDocs = await Education.create(education)
  const experienceDocs = await Experience.create(experience)
  const certificationDocs = await Certificate.create(certification)
  const extraCurrDocs = await ExtraCurricular.create(extraCurricular)

  // TODO: find a proper way to attach the mongoose doc ids. Major TS type mismatch warnings thrown here
  await User.findByIdAndUpdate(req.currentUser?.id, {
    profilePic,
    name,
    phone,
    city,
    careerInterests,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    education: educationDocs || [],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    experience: experienceDocs || [],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    certification: certificationDocs || [],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    extraCurricular: extraCurrDocs || [],
  })

  return res.send({ message: 'On-Boarding Complete' })
}
