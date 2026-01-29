import { useState } from "react";
import PropTypes from "prop-types";

Box.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default function Box({ children, title }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {title && <h2 className="box-header">{title}</h2>}
      {isOpen && children}
    </div>
  );
}
