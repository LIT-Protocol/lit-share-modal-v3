import React, {
  useEffect,
  useMemo,
  useState,
  Fragment
} from "react";
import { ShareModalContext } from "./createShareContext";

// import baseCss from "../index.css";
// import modalCss from "./ShareModal.css";
// import litChainSelectorCss from "../reusableComponents/litChainSelector/LitChainSelector.css";
// import litHeaderCss from "../reusableComponents/litHeader/LitHeader.css";
// import singleConditionSelectCss from "../shareModal/singleConditionSelect/SingleConditionSelect.css";
// import litChooseAccessButtonCss from "../reusableComponents/litChooseAccessButton/LitChooseAccessButton.css";
// import litReusableSelectCss from '../reusableComponents/litReusableSelect/LitReusableSelect.css'
// import litInputCss from '../reusableComponents/litInput/LitInput.css';
// import litFooterCss from '../reusableComponents/LitFooter/LitFooter.css';
// import cssFile2 from "../reusableComponents/litConfirmationModal/LitConfirmationModal.css";
// import cssFile3 from "../reusableComponents/litTokenSelect/LitTokenSelect.css";
// import cssFile4 from "../reusableComponents/litFooter/LitNextButton.css";
// import cssFile5 from "../reusableComponents/litFooter/LitFooter.css";
// import cssFile6 from "../reusableComponents/litFooter/LitBackButton.css";
// import cssFile7 from "../reusableComponents/litSimpleDropdown/LitSimpleDropdown.css";
// import cssFile8 from "../reusableComponents/litMultipeConditionOrganizer/LitMultipleConditionOrganizer.css";
// import cssFile9 from "../reusableComponents/litDeleteModal/LitDeleteModal.css";
// import cssFile10 from "../ethereumGeneralComponents/ethereumReviewConditions/EthereumReviewConditions.css";

import LitJsSdk from "lit-js-sdk";
import { TOP_LIST } from "./helpers/topList";
import {
  humanizeNestedConditions,
  cleanAccessControlConditions,
} from "./helpers/multipleConditionHelpers";
import LitHeader from "../reusableComponents/litHeader/LitHeader";
import SingleConditionSelect from "./singleConditionSelect/SingleConditionSelect";
import MultipleConditionSelect from "./multipleConditionSelect/MultipleConditionSelect";
import { defaultAllowedChainsObj } from "./helpers/shareModalDefaults";
import { checkPropTypes, getAllowedConditions, logDevError } from "./helpers/helperFunctions.js";
import ReviewConditions from "./reviewConditions/ReviewConditions";
import LitConfirmationModal from "../reusableComponents/litConfirmationModal/LitConfirmationModal";
import DevModeHeader from "./devMode/DevModeHeader";
import DevModeContent from "./devMode/DevModeContent";
// import cssReference from "./cssReference";

const ShareModal = (props) => {
  const [displayedPage, setDisplayedPage] = useState("single");
  const [error, setError] = useState(null);
  const [accessControlConditions, setAccessControlConditions] = useState([]);
  const [
    humanizedAccessControlConditions,
    setHumanizedAccessControlConditions,
  ] = useState([]);
  const [flow, setFlow] = useState("singleCondition");
  const [tokenList, setTokenList] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [chain, setChain] = useState(null);
  const [chainList, setChainList] = useState([]);
  const [showDevMode, setShowDevMode] = useState(false);
  const [cssLoaded, setCssLoaded] = useState(false);

  const {
    onClose = () => false,
    onBack = () => false,
    onAccessControlConditionsSelected,
    defaultTokens = TOP_LIST,
    injectCSS = true,
    defaultChain = 'ethereum',
    showChainSelector = true,
    allowMultipleConditions = true,
    permanentDefault = false,
    chainsAllowed = Object.keys(defaultAllowedChainsObj),
    conditionsAllowed = {},
    isModal = true,
    // TODO: unused props for v3
    allowDevMode = false,
    cssSubstitution = {},
  } = props;

  // TODO: prop setup
  useEffect(() => {
    checkPropTypes(props);

    // check and set allowed conditions per chain
    const chainsWithAllowedConditions = getAllowedConditions(chainsAllowed, conditionsAllowed, defaultAllowedChainsObj);
    setChainList(chainsWithAllowedConditions);

    setInitialChain(chainsWithAllowedConditions)

    getTokens();
  }, [defaultChain]);

  useEffect(() => {
    console.log('check chain update', chain)
  }, [chain])

  const setInitialChain = async (chainsAllowed) => {
    // get default chain
    const initialChain = chainsAllowed.find(c => c.value === defaultChain);
    if (!initialChain) {
      logDevError('no default chain found.  Check defaultChain prop.')
      return;
    }
    await setChain(initialChain);
  }

  useEffect(() => {
    if (injectCSS) {
      // concat the CSS
      let cssInjectString = '';
      const cssReference = import('./cssReference.js');
      Object.keys(cssReference).forEach((s, i) => {
        // if it's the last css file don't concat a + to the string
        // also check for the object existing in the cssSubstitution object in case the user wants to overwrite a specific part
        if (i === Object.keys(cssReference).length && cssSubstitution[s]) {
          cssInjectString.push(cssSubstitution[s])
        } else if (i === Object.keys(cssReference).length) {
          cssInjectString.push(cssReference[s]);
        } else if (cssSubstitution[s]) {
          cssInjectString.push(cssSubstitution[s] + "\n");
        } else {
          cssInjectString.push(cssReference[s] + "\n");
        }
      })
      // inject the CSS
      var style = document.createElement("style");
      style.innerHTML = cssInjectString;
      document.head.appendChild(style);
    }
    // wait for style tag to be placed before rendering page
    setTimeout(() => {
      setCssLoaded(true);
    }, 100)
  }, [injectCSS]);

  document.addEventListener("lit-ready", function (e) {
  }, false);

  // TODO: maybe keep functions below

  const getTokens = async () => {
    // get token list and cache it
    try {
      const tokens = await LitJsSdk.getTokenList();
      setTokenList(tokens);
    } catch (err) {
      setError(err)
    }
  };

  const handleDeleteAccessControlCondition = async (
    localIndex,
    nestedIndex
  ) => {
    const updatedAcc = accessControlConditions;
    // TODO: create nested delete

    if (nestedIndex === null) {
      if (localIndex > 1 && localIndex === updatedAcc.length - 1) {
        updatedAcc.splice(-2);
      } else {
        updatedAcc.splice(updatedAcc[localIndex], 2);
      }
    } else {
      if (
        nestedIndex !== 0 &&
        nestedIndex === updatedAcc[localIndex].length - 1
      ) {
        updatedAcc[localIndex].splice(-2);
      } else {
        updatedAcc[localIndex].splice(updatedAcc[localIndex][nestedIndex], 2);
      }
    }

    await updateState(updatedAcc);

    if (updatedAcc.length === 0 && flow === "singleCondition") {
      setDisplayedPage("single");
    }
  };

  const checkForAddingOperatorToCondition = (
    acc,
    newAccessControlCondition
  ) => {
    const updatedAcc = acc;
    if (!acc.length && newAccessControlCondition[0]) {
      updatedAcc.push(newAccessControlCondition[0]);
    } else {
      updatedAcc.push({ operator: "and" });
      updatedAcc.push(newAccessControlCondition[0]);
    }
    return updatedAcc;
  };

  const handleUpdateAccessControlConditions = async (
    newAccessControlCondition,
    isNested = false,
    index = null
  ) => {
    let updatedAcc = [...accessControlConditions];
    if (!newAccessControlCondition[0]) {
      return;
    }

    if (isNested) {
      if (Array.isArray(updatedAcc[index])) {
        updatedAcc[index] = checkForAddingOperatorToCondition(
          updatedAcc[index],
          newAccessControlCondition
        );
      } else {
        let nestedUpdatedAcc = checkForAddingOperatorToCondition(
          [updatedAcc[index]],
          newAccessControlCondition
        );
        updatedAcc[index] = nestedUpdatedAcc;
      }
    } else {
      updatedAcc = checkForAddingOperatorToCondition(
        updatedAcc,
        newAccessControlCondition
      );
    }
    await updateState(updatedAcc);
  };

  const updateLogicOperator = async (value, localIndex, nestedIndex = null) => {
    let updatedAcc = [...accessControlConditions];
    if (nestedIndex) {
      updatedAcc[localIndex][nestedIndex].operator = value;
    } else {
      updatedAcc[localIndex].operator = value;
    }

    await updateState(updatedAcc);
  };

  const updateState = async (acc) => {
    const cleanedAcc = cleanAccessControlConditions(acc);
    const humanizedData = await humanizeNestedConditions([...cleanedAcc]);
    setHumanizedAccessControlConditions([...humanizedData]);
    setAccessControlConditions([...cleanedAcc]);
  };

  // TODO: functions for keeping


  const clearAllAccessControlConditions = () => {
    setAccessControlConditions([]);
    setHumanizedAccessControlConditions([]);
  };

  const handleClose = () => {
    if (accessControlConditions.length) {
      setShowConfirmationModal(true);
    } else {
      resetModal();
      onClose();
    }
  };

  const resetModal = () => {
    console.log('defaultChain', defaultChain)
    setFlow("singleCondition");
    setDisplayedPage("single");
    clearAllAccessControlConditions();
    setError(null);
    setInitialChain(chainList).then(() => {});
  };

  const handleConfirmModalClose = (modalResponse) => {
    if (modalResponse === "yes") {
      resetModal();
      setShowConfirmationModal(false);
      onClose();
    } else {
      setShowConfirmationModal(false);
    }
  };

  const sendAccessControlConditions = (conditionsArePermanent) => {
    const keyParams = {
      accessControlConditions,
      permanent: !conditionsArePermanent,
      chain: 'ethereum'
    };
    onAccessControlConditionsSelected(keyParams);
  };

  return (
    <div className={"lsm-light-theme lsm-share-modal-container"}>

      {(!error && cssLoaded) && (
        <ShareModalContext.Provider
          value={{
            handleUpdateAccessControlConditions,
            handleDeleteAccessControlCondition,
            clearAllAccessControlConditions,
            updateLogicOperator,
            handleClose,
            sendAccessControlConditions,
            resetModal,
            showChainSelector,
            chain,
            chainList,
            setChain,
            setError,
            setDisplayedPage,
            setFlow,
            humanizedAccessControlConditions,
            accessControlConditions,
            displayedPage,
            tokenList,
            flow,
            defaultTokens,
            allowMultipleConditions,
            permanentDefault
          }}
        >
          {allowDevMode ? (
            <DevModeHeader handleClose={handleClose}
                           isModal={isModal}
                           showDevMode={showDevMode}
                           setShowDevMode={setShowDevMode} />
            ) : (
            <LitHeader handleClose={handleClose} isModal={isModal} />
          )}
          {(allowDevMode && showDevMode) ? (
            <DevModeContent accessControlConditions={accessControlConditions} />
          ) : (
            <Fragment>
              {(flow === 'singleCondition' && displayedPage !== 'review') && (
                <SingleConditionSelect stepAfterUpdate={'review'} humanizedAccessControlConditions={humanizedAccessControlConditions} accessControlConditions={accessControlConditions}/>
              )}
              {(flow === 'multipleConditions' && displayedPage !== 'review') && (
                <MultipleConditionSelect humanizedAccessControlConditions={humanizedAccessControlConditions} accessControlConditions={accessControlConditions}/>
              )}
              {displayedPage === 'review' && (
                <ReviewConditions humanizedAccessControlConditions={humanizedAccessControlConditions} accessControlConditions={accessControlConditions} />
              )}
            </Fragment>
          )}
          <LitConfirmationModal
            message={"Are you sure you want to close the modal?"}
            showConfirmationModal={showConfirmationModal}
            onClick={handleConfirmModalClose}
          />
        </ShareModalContext.Provider>
      )}
      {(error && cssLoaded) && (
        <span className={'lsm-error-display'}>
          <p className={'lsm-font-segoe lsm-text-brand-5'}>An error occurred with an external API:</p>
          <p className={'lsm-font-segoe'}>{error}</p>
          <p className={'lsm-font-segoe lsm-text-brand-5'}>Please close and reopen the modal to reconnect.</p>
          <button className={'lsm-error-button lsm-bg-brand-4'} onClick={onClose}>Close</button>
        </span>
      )}
    </div>
  );
};

export default ShareModal;
