import React, { useContext, useState } from 'react';
import LitFooter from "../../reusableComponents/litFooter/LitFooter";
import { ShareModalContext } from "../createShareContext";
import LitConfirmationModal from "../../reusableComponents/litConfirmationModal/LitConfirmationModal";
import { colorArray } from "../helpers/colorArray";
import link from "../../assets/link.svg";

const ReviewConditions = ({ humanizedAccessControlConditions, accessControlConditions}) => {
  const {
    sendAccessControlConditions,
    flow,
    handleClose,
    resetModal,
    setDisplayedPage,
    permanentDefault
  } = useContext(ShareModalContext);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [conditionsArePermanent, setConditionsArePermanent] = useState(permanentDefault);
  const [conditionsSent, setConditionsSent] = useState(false);

  const navigateBack = () => {
    if (flow === 'singleCondition') {
      setShowConfirmationModal(true);
    } else if (flow === 'multipleConditions') {
      setDisplayedPage('multiple');
    }
  }

  const handleConfirmGoBack = (modalResponse) => {
    if (modalResponse === 'yes') {
      resetModal();
    }

    setShowConfirmationModal(false);
  }

  return (
    <div className={'lsm-review-conditions-container'}>
      <div className={'lsm-review-conditions-group-container'}>
        <h3
          className={'lsm-review-conditions-prompt'}>Review your conditions and confirm at bottom</h3>
        <div className={''}>
          <div
            className={''}
          >
            {!!humanizedAccessControlConditions && humanizedAccessControlConditions.map((h, i) => {
              if (Array.isArray(h)
                && h.length === 3
                && h[0].humanizedAcc.includes('POAP')
                && h[2].humanizedAcc.includes('POAP')) {
                return (
                  <div className={'lsm-review-conditions-group'}
                       key={i}
                       style={{ 'backgroundColor': colorArray[i / 2] }}>
                    <span
                      className={''}
                      key={i}
                    > {h[2].humanizedAcc}
                    </span>
                  </div>
                )
              } else if (Array.isArray(h)) {
                return (
                  <div className={'lsm-review-conditions-group '}
                       key={i}
                       style={{ 'backgroundColor': colorArray[i / 2] }}>
                    {h.map((n, ni) => {
                      if (!n['operator']) {
                        return (
                          <span
                            className={'lsm-review-condition-humanized-text'}
                            key={`n-${ni}`}>
                            {n.humanizedAcc}
                          </span>
                        )
                      } else {
                        return (
                          <span
                          className={'lsm-review-condition-operator-text'}
                          key={`n-${ni}`}
                        >{n.operator === 'and' ? 'AND' : 'OR'}
                        </span>
                        )
                      }
                    })}
                  </div>
                )
              } else if (h['operator']) {
                return (
                  <span
                    className={'lsm-review-condition-operator-text'}
                    key={i}
                  >{h.operator === 'and' ? 'AND' : 'OR'}
                  </span>
                )
              } else {
                return (
                  <div className={'lsm-review-conditions-group'}
                       key={i}
                       style={{ 'backgroundColor': colorArray[i / 2] }}>
                    <span
                      className={'lsm-review-condition-humanized-text'}
                      key={i}
                    > {h.humanizedAcc}
                    </span>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
      <footer className={'lsm-review-conditions-footer'}>
        <div
          className={'lsm-review-conditions-permanent'}>
          <input className={'lsm-review-conditions-permanent-checkbox'} type="checkbox" id="edit" name="edit"
                 checked={conditionsArePermanent} value={conditionsArePermanent} onChange={(e) => setConditionsArePermanent(e.target.checked)}/>
          <label className={'lsm-review-conditions-permanent-text'} htmlFor="edit">Make condition(s) permanent; if
            selected, you cannot update them later</label>
        </div>
        <div className={'lsm-review-conditions-link'}>
          <a href={'https://developer.litprotocol.com/docs/AccessControlConditions/evmBasicExamples'} target={'_blank'}
             rel="noreferrer">More information about
            conditions<img
              alt={'clear input'} className={'lsm-review-conditions-link-icon'} src={link}/></a>
        </div>
      </footer>
      <LitFooter backAction={() => navigateBack()}
                 nextAction={() => {
                   setConditionsSent(true);
                   sendAccessControlConditions(conditionsArePermanent);
                 }}
                 nextDisableConditions={false}
                 nextButtonLabel={'DONE'}/>
      <LitConfirmationModal showConfirmationModal={showConfirmationModal}
                            onClick={handleConfirmGoBack}/>
    </div>
  )
}

export default ReviewConditions;
