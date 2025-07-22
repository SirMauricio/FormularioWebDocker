
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const CaptchaComponent = ({ onChange }) => {
  const captchaRef = useRef(null);

  return (
    <ReCAPTCHA
      sitekey="6Lec9YcrAAAAABVe0Addu8JwC0SZV_qaDEEpGpO-"
      ref={captchaRef}
      onChange={onChange}
    />
  );
};

export default CaptchaComponent;
