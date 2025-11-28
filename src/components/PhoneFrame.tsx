import { ReactNode } from 'react';
import './PhoneFrame.css';

interface PhoneFrameProps {
  children: ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="phone-frame-container">
      <div className="phone-frame">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          {children}
        </div>
        <div className="phone-home-indicator"></div>
      </div>
    </div>
  );
};

export default PhoneFrame;

