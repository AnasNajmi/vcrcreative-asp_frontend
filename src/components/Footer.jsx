// Init
import React from 'react';
// import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
import Logo from '../assets/images/LogoInBlack.svg';
// Component
export default function Header() {
  return (
    <div className="footerSection">
      <div className="footerSection1">
        <div>
          <Link to="/">
            {' '}
            <img
              src={Logo}
              style={{ cursor: 'pointer' }}
              alt="aquarium_logo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              role="presentation"
            />
          </Link>
        </div>
        <div>
          <p className="footerDescription">
            Lorem Ipsum is simply dummy text of the
            <br />
            printing and typesetting industry
          </p>
        </div>
      </div>
      <div className="footerSection2">
        <ul>
          <li>Home</li>
          <li>General Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="hl" />
      <div>
        <p className="copyrightTxt">
          © 2022 &nbsp;
          <strong>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontFamily: 'HelveticaBold',
              }}
            >
              Aquarium Service Pro
            </Link>
          </strong>
          , Developed by &nbsp;
          <strong style={{ textDecoration: 'underline' }}>
            <a
              href="https://falconitconsultant.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontFamily: 'HelveticaBold',
              }}
            >
              Falcon Consulting
            </a>
          </strong>
          . &nbsp; All rights reserved.
        </p>
      </div>
    </div>
  );
}
