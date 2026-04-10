import { MapPin, Phone } from "lucide-react";
import React from "react";

const ContactInformation = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-[24px] md:text-[32px] font-normal text-primary text-center">
        Other Ways to Reach Us
      </h2>

      {/* Phone Support */}
      <div className="bg-[#FFFFFF1A] rounded-xl shadow p-6 space-y-4 items-center gap-4">
        <div className="flex items-center gap-4">
          <Phone className="h-6 w-6 text-primary" />
          <span className="text-xl text-primary font-normal">
            Phone Support
          </span>
        </div>
        <div className="text-white">
          <p className="text-[12px] md:text-[16px] font-semibold mb-2">
            24/7 Hotline: (214) 531 6256
          </p>
          <p className="text-[12px] md:text-[16px] font-semibold">
            Non-Emergency:  (214) 531 6256
          </p>
        </div>
      </div>

      {/* Office Location */}
      <div className="bg-[#FFFFFF1A] rounded-xl shadow p-6 space-y-4">
        <div className="flex items-center gap-4">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="text-xl text-primary font-normal">
            Office Location
          </span>
        </div>

        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d73653.71847245646!2d-80.3168047768698!3d36.06787535890846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8853b0698f703913%3A0x62052f6a2ef64241!2s648%20Hanes%20Mall%20Blvd%2C%20Winston-Salem%2C%20NC%2027103!5e0!3m2!1sen!2sus!4v1747738524101!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}

        <div className="rounded-md overflow-hidden w-full h-40">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d73653.71847245646!2d-80.3168047768698!3d36.06787535890846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8853b0698f703913%3A0x62052f6a2ef64241!2s648%20Hanes%20Mall%20Blvd%2C%20Winston-Salem%2C%20NC%2027103!5e0!3m2!1sen!2sus!4v1747738524101!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="text-white text-[12px] md:text-[16px] font-semibold">
          648 Hanes Mall Blvd Winston-Salem NC
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
