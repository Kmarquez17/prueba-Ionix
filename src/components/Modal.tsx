import React from "react";

interface IProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  show: boolean;
  handleShowModal: (show: boolean) => void;
}

export const Modal: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <>
      {props.show && (
        <>
          <div
            className={`modal-backdrop fade ${props.show ? "show" : ""}`}
          ></div>
          <div
            className={`modal fade ${props.show ? "show" : ""}`}
            style={{ display: "block" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <p>{props.title}</p>
                  </h5>
                  <button
                    type="button"
                    className="pt-0 btn btn-transparent"
                    onClick={() => {
                      props.handleShowModal(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                  </button>
                </div>
                <div className="modal-body">{props.children}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
