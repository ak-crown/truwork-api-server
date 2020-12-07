/*
 * Dont need this file for now
 * Will come back to it later
 * */
import axios from 'axios'

interface ISendOTPResponse {
  Status?: string
  Details?: string
}

interface IVerifyOTPResponse {
  Status?: string
  Details?: string
}

export class OTP {
  static async send(phone: string): Promise<ISendOTPResponse> {
    const response = await axios.get<ISendOTPResponse>(
      `https://2factor.in/API/V1/{api_key}/SMS/${phone}/AUTOGEN`
    )

    return response.data
  }

  static async verify(
    session_id: string,
    otp_input: string
  ): Promise<IVerifyOTPResponse> {
    const response = await axios.get<IVerifyOTPResponse>(
      `https://2factor.in/API/V1/{api_key}/SMS/VERIFY/${session_id}/${otp_input}`
    )

    return response.data
  }
}
