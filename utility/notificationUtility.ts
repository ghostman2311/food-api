export const generateOtp = () => {
  // Define the length of the OTP (6 digits)
  const otpLength = 6;

  // Generate a random number within the range of 10^(length-1) to 10^length - 1
  const min = Math.pow(10, otpLength - 1);
  const max = Math.pow(10, otpLength) - 1;
  const otpValue = Math.floor(Math.random() * (max - min + 1)) + min;

  // Calculate OTP expiration time (e.g., 30 minutes from now)
  const otpExpiry = new Date();
  otpExpiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  // Convert the OTP to a string and pad it with leading zeros if necessary
  const otpString = otpValue.toString().padStart(otpLength, "0");
  return { otp: otpString, expiry: otpExpiry };
};

export const onRequestOTP = async (otp: string, toPhoneNumber: string) => {
  const accountSid = "ACa6ef7b0cdd311f3589ef34316c4dfaf3";
  const authToken = "167cc50eef59643a2e6c86c75e5d9a2e";
  const client = require("twilio")(accountSid, authToken);

  const response = await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: "+17157695157",
    to: `+91${toPhoneNumber}`,
  });

  return response;
};
