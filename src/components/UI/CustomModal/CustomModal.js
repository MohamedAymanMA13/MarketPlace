import Modal from 'react-modal';

Modal.setAppElement('#__next');

const CustomModal = ({
  isOpen,
  toggleModalHandler,
  additionalClasses,
  children,
  escapeClose = true,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={`fixed inset-0 bg-black bg-opacity-30 z-10 ltr:font-poppins rtl:font-noto`}
      className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md bg-white ${additionalClasses}`}
      contentLabel="Filters Modal"
      onRequestClose={escapeClose ? toggleModalHandler : null}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
