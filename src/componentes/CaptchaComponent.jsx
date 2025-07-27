
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const CaptchaComponent = ({ onChange }) => {
  const captchaRef = useRef(null);

  return (
    <ReCAPTCHA
      sitekey="6Lcln2wrAAAAAEjW4SLk8aKJ8ZaTjYYwbH4vAP5k"
      ref={captchaRef}
      onChange={onChange}
    />
  );
};

export default CaptchaComponent;
