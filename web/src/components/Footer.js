import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top bg-dark text-light">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-light text-decoration-none lh-1">.</a>
          <span className="text-light">© 2024 <i>GoFood</i>, Inc</span>
        </div>
  
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3"><a className="text-light" href="/"><svg className="bi" width="24" height="24"><use /></svg></a></li>
          <li className="ms-3"><a className="text-light" href="/"><svg className="bi" width="24" height="24"><use /></svg></a></li>
          <li className="ms-3"><a className="text-light" href="/"><svg className="bi" width="24" height="24"><use /></svg></a></li>
        </ul>
      </footer>
    </div>
  )
}
