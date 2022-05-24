import React, { Fragment, useContext, useState } from 'react';
import uparrow from "../../assets/uparrow.svg";
import { colorArray } from "../helpers/colorArray";
import trashcan from "../../assets/trashcan.svg";
import { ShareModalContext } from "../createShareContext";
import LitDeleteModal from "../../reusableComponents/litDeleteModal/LitDeleteModal";

const MultipleConditionsEditor = ({ humanizedAccessControlConditions, createCondition }) => {

  const {
    handleDeleteAccessControlCondition,
    updateLogicOperator,
    setDisplayedPage,
  } = useContext(ShareModalContext);

  const [currentAccIndex, setCurrentAccIndex] = useState(null);
  const [accType, setAccType] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (modalResponse) => {
    if (modalResponse === 'yes') {
      if (accType === 'paop') {
        handleDeleteAccessControlCondition(currentAccIndex[0], null)
        return;
      }
      currentAccIndex.length === 1 ?
        handleDeleteAccessControlCondition(currentAccIndex[0], null) :
        handleDeleteAccessControlCondition(currentAccIndex[0], currentAccIndex[1])
    }

    setCurrentAccIndex(null);
    setAccType(null);
    setShowDeleteModal(false);
  }

  const checkOperator = (operator, value) => {
    if (operator === value) {
      return 'lsm-multiple-condition-operator-selected';
    } else {
      return 'lsm-multiple-condition-operator-not-selected ';
    }
  }

  const callCreateCondition = (isNested = false, nestedIndex = null) => {
    createCondition(isNested, nestedIndex);
    setDisplayedPage('multiple-add');
  }

  return (
    <div className={'lsm-multiple-condition-container'}>
      {humanizedAccessControlConditions.length > 0 && humanizedAccessControlConditions.map((a, i) => {
        if (Array.isArray(a)
          && a.length === 3
          && a[0].humanizedAcc.includes('POAP')
          && a[2].humanizedAcc.includes('POAP')) {
          return (
            <div
              className={'lsm-multiple-condition-group'}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              <span className={'lsm-multiple-condition-humanized-container'}>
                <span className={'lsm-multiple-condition-humanized-text'}>
                  {a[2].humanizedAcc}
                </span>
                <span>
                  <button className={'lsm-multiple-condition-humanized-delete'}>
                    <img src={trashcan} onClick={() => {
                      setAccType('POAP');
                      setCurrentAccIndex([i]);
                      setShowDeleteModal(true);
                    }}/>
                  </button>
                </span>
              </span>
            </div>
          )
        } else if (Array.isArray(a)) {
          return (
            <div
              className={'lsm-multiple-condition-group'}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              {a.map((n, ni) => {
                if (!n['operator']) {
                  return (
                    <span className={'lsm-multiple-condition-humanized-container'}
                          key={`n-${ni}`}>
                      <span className={'lsm-multiple-condition-humanized-text'}>
                        {n.humanizedAcc}
                      </span>
                      <span>
                        <button className={'lsm-multiple-condition-humanized-delete'}>
                          <img src={trashcan} onClick={() => {
                            setCurrentAccIndex([i, ni]);
                            setShowDeleteModal(true);
                          }}/>
                        </button>
                      </span>
                    </span>
                  )
                } else {
                  return (
                    <span className={'lsm-multiple-condition-operator-container'}
                          key={`n-${ni}`}>
                      <button onClick={() => updateLogicOperator('and', i, ni)}
                              className={`lsm-multiple-condition-group-operator ${checkOperator('and', n['operator'])}`}>
                        AND
                      </button>
                      <button onClick={() => updateLogicOperator('or', i, ni)}
                              className={`lsm-multiple-condition-group-operator ${checkOperator('or', n['operator'])}`}>
                        OR
                      </button>
                    </span>
                  )
                }
              })}
              <button className={'lsm-multiple-condition-define-button'}
                      onClick={() => callCreateCondition(true, i)}>
                Define Another Nested Condition
              </button>
            </div>
          )
        } else if (!a['operator']) {
          return (
            <div
              className={'lsm-multiple-condition-group '}
              key={i}
              style={{ 'backgroundColor': colorArray[i / 2] }}>
              <span className={'lsm-multiple-condition-humanized-container'}>
                <span className={'lsm-multiple-condition-humanized-text'}>
                  {humanizedAccessControlConditions[i].humanizedAcc}
                </span>
                <span>
                  <button className={'lsm-multiple-condition-humanized-delete'}>
                    <img src={trashcan} onClick={() => {
                      setCurrentAccIndex([i]);
                      setShowDeleteModal(true);
                    }}/>
                  </button>
                </span>
              </span>
              <button className={'lsm-multiple-condition-define-button'}
                      onClick={() => callCreateCondition(true, i)}>
                Define Another Nested Condition
              </button>
            </div>
          )
        } else {
          return (
            <span className={'lsm-multiple-condition-operator-container'}
                  key={i}>
              <button onClick={() => updateLogicOperator('and', i)}
                      className={`lsm-multiple-condition-group-operator ${checkOperator('and', a['operator'])}`}>
                AND
              </button>
              <button onClick={() => updateLogicOperator('or', i)}
                      className={`lsm-multiple-condition-group-operator ${checkOperator('or', a['operator'])}`}>
                OR
              </button>
            </span>
          )
        }
      })}


      {!humanizedAccessControlConditions.length ? (
        <div className={'lsm-multiple-condition-initial-container'}>
          <span className={'lsm-multiple-condition-define-first-group'}
                style={{ 'backgroundColor': colorArray[0] }}>
            <button className={'lsm-multiple-condition-define-first-button'} onClick={() => callCreateCondition()}>
              Define First Condition
            </button>
          </span>
          <img className={"lsm-multiple-condition-define-first-arrow"} src={uparrow}/>
          <h3 className={"lsm-multiple-condition-define-first-text"}>
            Once you've added your first condition, you can add AND/OR operators and groups
          </h3>
        </div>
      ) : (
        <Fragment>
          <span className={'lsm-multiple-condition-group'}>
            <button className={'lsm-multiple-condition-define-first-button'} onClick={() => callCreateCondition()}>
              Define Another Condition
            </button>
          </span>
        </Fragment>
      )}
      <LitDeleteModal showDeleteModal={showDeleteModal} onClick={handleDelete}/>
    </div>
  )
}

export default MultipleConditionsEditor;
