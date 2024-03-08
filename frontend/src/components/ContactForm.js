import React from 'react';

const ContactForm = ({ showModal, toggleModal }) => {
  return (
    <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg"> {/* Added modal-lg class here */}
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Contact Us</h5>
            <button type="button" className="btn-close" onClick={toggleModal}></button>
          </div>
          <div className="modal-body">
            <p>If you have any questions, feedback, or suggestions, feel free to reach out to us:</p>
            <form action="mailto:dixitbrothers601@gmail.com" method="post" encType="text/plain">
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Your Name" name="name" />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Your Email" name="email" />
              </div>
              <div className="mb-3">
                <textarea className="form-control" placeholder="Your Message" rows="5" name="message"></textarea> {/* Increased rows to make it bigger */}
              </div>
              <button type="submit" className="btn btn-primary btn-lg">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
