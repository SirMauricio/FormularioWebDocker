
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const CaptchaComponent = ({ onChange }) => {
  const captchaRef = useRef(null);

  return (
    <ReCAPTCHA
      sitekey="6Lcun2wrAAAAAEshnn7fxCDmy_1_kGMcckbbSHET"
      ref={captchaRef}
      onChange={onChange}
    />
  );
};

export default CaptchaComponent;
