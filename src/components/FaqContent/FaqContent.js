import React from "react";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import { Link } from "react-router-dom";

function CustomToggle({ children, eventKey, clickHandler, expanded }) {

    const decOnClick = useAccordionButton(eventKey, () => {
        clickHandler(eventKey)
    })

  return (
    <button
      onClick={decOnClick}
      data-bs-toggle="collapse"
      data-bs-target={`#panelsStayOpen-collapse${eventKey}`}
      aria-expanded={expanded}
      aria-controls={`panelsStayOpen-collapse${eventKey}`}
      className="collapsed"
      type="button"
    >
      {children}{" "}
    </button>
  );
}

function FaqContent() {

    // increase the size of array on more faqs
    const [state, setState] = React.useState([true, false, false]);

    const clickHandler = (index) => {
        const newState = Array(state.length).fill(false);
        newState[index] = !state[index];
        setState(newState);
    }

  return (
    <div className="top_content">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="mt-4">
                  <Accordion defaultActiveKey="0" role="tablist">
                    <Card>
                      <Card.Header role="tab">
                        <CustomToggle eventKey="0" clickHandler={clickHandler} expanded={state[0]}>
                          How to use C-Auth?
                        </CustomToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body className="card-body">
                          <div className="row">
                            <div className="col-3">
                              <img
                                src="https://img.icons8.com/bubbles/100/000000/administrator-male.png"
                                className="mw-100"
                                alt="human"
                              />
                            </div>
                            <div className="col-9">
                              <p className="mb-0">
                                Login with your credential and link your account
                                using add token. It is just one time work. Once
                                linked then every 30 seconds new TOTP will be
                                generated.
                              </p>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Card.Header>
                        <CustomToggle eventKey="1" clickHandler={clickHandler} expanded={state[1]}>
                          How to delete an account?
                        </CustomToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <p>It is just a 2 step to delete an account linked</p>
                          <ol className="pl-3 mt-4">
                            <li>login and go to dashboard</li>
                            <li>
                              click on the delete button next to the account to
                              be deleted
                            </li>
                            <li>Click delete on the confirm popup.</li>
                          </ol>
                          <br />
                          <p className="text-success">
                            <i className="mdi mdi-alert-octagon mr-2"></i>you
                            can contact our support.
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card>
                      <Card.Header>
                        <CustomToggle eventKey="2" clickHandler={clickHandler} expanded={state[2]}>
                          How to contact for any issues?
                        </CustomToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <p className="mb-0">
                            Go to <Link to="/contact">contact us</Link> and submit an ticket form. The team
                            will contact you soon!
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqContent;
