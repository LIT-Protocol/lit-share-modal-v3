import React, {
  useEffect,
  useState,
} from "react";
import { ShareModalContext } from "./createShareContext";

import LitJsSdk from "lit-js-sdk";
import { TOP_LIST } from "./helpers/topList";
import {
  humanizeNestedConditions,
  cleanUnifiedAccessControlConditions, getAllNeededAuthSigs, getAllChains,
} from "./helpers/multipleConditionHelpers";
import LitHeader from "../reusableComponents/litHeader/LitHeader";
import SingleConditionSelect from "./singleConditionSelect/SingleConditionSelect";
import MultipleConditionSelect from "./multipleConditionSelect/MultipleConditionSelect";
import { chainConfig } from "../chainComponents/chainConfig.js";
import {
  checkPropTypes,
  getAllowedConditions,
  logDevError,
  setDevModeIsAllowed,
  stripNestedArray
} from "./helpers/helperFunctions.js";
import ReviewConditions from "./reviewConditions/ReviewConditions";
import LitConfirmationModal from "../reusableComponents/litConfirmationModal/LitConfirmationModal";
import DevModeHeader from "./devMode/DevModeHeader";
import DevModeContent from "./devMode/DevModeContent";

import baseCss from "../index.css";
import shareModalCss from "./ShareModal.css";
import litSingleConditionSelectCss from "../shareModal/singleConditionSelect/SingleConditionSelect.css";
import litMultipleConditionSelectCss from "../shareModal/multipleConditionSelect/MultipleConditionSelect.css";
import litReviewConditionsCss from './reviewConditions/ReviewConditions.css';
import litChainSelectorCss from "../reusableComponents/litChainSelector/LitChainSelector.css";
import litHeaderCss from "../reusableComponents/litHeader/LitHeader.css";
import litChooseAccessButtonCss from "../reusableComponents/litChooseAccessButton/LitChooseAccessButton.css";
import litReusableSelectCss from '../reusableComponents/litReusableSelect/LitReusableSelect.css'
import litInputCss from '../reusableComponents/litInput/LitInput.css';
import litDevModeCss from '../shareModal/devMode/DevModeContent.css';
import litFooterCss from '../reusableComponents/litFooter/LitFooter.css';
import litBackButtonCss from '../reusableComponents/litFooter/LitBackButton.css';
import litNextButtonCss from '../reusableComponents/litFooter/LitNextButton.css';
import litConfirmationModalCss from '../reusableComponents/litConfirmationModal/LitConfirmationModal.css';
import litDeleteModalCss from '../reusableComponents/litDeleteModal/LitDeleteModal.css';
import litMultipleAddConditionCss from './multipleConditionSelect/MultipleAddCondition.css';
import litMultipleConditionEditorCss from './multipleConditionSelect/MultipleConditionEditor.css';
import litCheckboxCss from '../reusableComponents/litCheckbox/LitCheckbox.css';
import litTokenSelectCss from '../reusableComponents/litTokenSelect/LitTokenSelect.css';
import litLoadingCss from '../reusableComponents/litLoading/LitLoading.css';
import LitLoading from "../reusableComponents/litLoading/LitLoading";

const cssReference = {
  baseCss,
  shareModalCss,
  litSingleConditionSelectCss,
  litMultipleConditionSelectCss,
  litMultipleAddConditionCss,
  litMultipleConditionEditorCss,
  litReviewConditionsCss,
  litChainSelectorCss,
  litHeaderCss,
  litDevModeCss,
  litChooseAccessButtonCss,
  litReusableSelectCss,
  litInputCss,
  litFooterCss,
  litNextButtonCss,
  litBackButtonCss,
  litConfirmationModalCss,
  litDeleteModalCss,
  litCheckboxCss,
  litTokenSelectCss,
  litLoadingCss
}

const ShareModal = (props) => {
  const [ displayedPage, setDisplayedPage ] = useState("single");
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ unifiedAccessControlConditions, setUnifiedAccessControlConditions ] = useState([]);
  const [
    humanizedUnifiedAccessControlConditions,
    setHumanizedUnifiedAccessControlConditions,
  ] = useState([]);
  const [ flow, setFlow ] = useState("singleCondition");
  const [ tokenList, setTokenList ] = useState(null);
  const [ showConfirmationModal, setShowConfirmationModal ] = useState(false);
  const [ chain, setChain ] = useState(null);
  const [ cssLoaded, setCssLoaded ] = useState(false);
  const [ chainList, setChainList ] = useState([]);
  const [ showDevMode, setShowDevMode ] = useState(false);

  const [ storedInitialState, setStoredInitialState ] = useState(null);
  const [ storedInitialCondition, setStoredInitialCondition ] = useState('chooseAccess');

  const {
    onClose = () => false,
    onUnifiedAccessControlConditionsSelected = (conditions) => console.log('conditions', conditions),
    injectInitialState = false,
    initialUnifiedAccessControlConditions = null,
    initialFlow = null,
    initialCondition = null,
    initialState = null,
    defaultTokens = TOP_LIST,
    defaultChain = 'ethereum',
    allowChainSelector = true,
    allowMultipleConditions = true,
    permanentDefault = false,
    chainsAllowed = Object.keys(chainConfig),
    conditionsAllowed = {},
    isModal = true,
    injectCSS = true,
    darkMode = false,
    allowDevMode = false,
    cssSubstitution = {}
  } = props;

  useEffect(() => {
    // const allChains = LitJsSdk.ALL_LIT_CHAINS
    //
    // console.log('ALL CHAINS', allChains)
    checkPropTypes(props);
    setDevModeIsAllowed(allowDevMode);
    // check and set allowed conditions per chain
    const chainsWithAllowedConditions = getAllowedConditions(chainsAllowed, conditionsAllowed, chainConfig);
    setChainList(chainsWithAllowedConditions);

    setInitialChain(chainsWithAllowedConditions)

    getTokens();

    if (injectInitialState) {
      if (Array.isArray(initialUnifiedAccessControlConditions)) {
        updateState(initialUnifiedAccessControlConditions);
        setFlow('multipleConditions');
        setDisplayedPage('multiple');
      }
      if (initialFlow) {
        setFlow(initialFlow);
        if (initialFlow === 'multipleConditions') {
          setDisplayedPage('multiple');
        }
      }
      if (initialCondition) {
        setStoredInitialCondition(initialCondition)
        if (initialFlow === 'multipleConditions') {
          setDisplayedPage('multiple-add');
        }
      }
      if (initialState) {
        setStoredInitialState(initialState);
      }
    }

    checkInjectCss();
  }, []);

  const wipeInitialProps = () => {
    // setStoredInitialCondition(null);
    // setStoredInitialState(null);
  }

  // switch from useEffect to call after `initialState` props have been checked
  // useEffect(() => {
  const checkInjectCss = () => {
    if (injectCSS) {
      // concat the CSS
      let cssInjectArray = [];
      // const cssReference = import('./cssReference.js');
      Object.keys(cssReference).forEach((s, i) => {
        // if it's the last css file don't concat a + to the string
        // also check for the object existing in the cssSubstitution object in case the user wants to overwrite a specific part
        if (i === Object.keys(cssReference).length && cssSubstitution[s]) {
          cssInjectArray.push(cssSubstitution[s]);
        } else if (i === Object.keys(cssReference).length) {
          cssInjectArray.push(cssReference[s]);
        } else if (cssSubstitution[s]) {
          cssInjectArray.push(cssSubstitution[s]);
        } else {
          cssInjectArray.push(cssReference[s]);
        }
      })
      const cssInjectString = cssInjectArray.join('\n');
      // inject the CSS
      const style = document.createElement("style");
      style.innerHTML = cssInjectString;
      document.head.appendChild(style);
    }
    // wait for style tag to be placed before rendering page
    setTimeout(() => {
      setCssLoaded(true);
    }, 100)
  }
  // }, [ injectCSS ]);

  const setInitialChain = async (chainsAllowed) => {
    // get default chain
    const initialChain = chainsAllowed.find(c => c.value === defaultChain);
    if (!initialChain) {
      logDevError('no default chain found.  Check defaultChain prop.')
      return;
    }
    await setChain(initialChain);
  }

  document.addEventListener("lit-ready", function (e) {
  }, false);

  // TODO: maybe keep functions below

  const getTokens = async () => {
    // get token list and cache it
    console.log('getting tokens')
    try {
      const tokens = await LitJsSdk.getTokenList();
      setTokenList(tokens);
    } catch (err) {
      setTokenList([])
      setError(err)
      console.log('Error retrieving token list:', err)
    }
    setLoading(false);
  };

  const handleDeleteAccessControlCondition = async (
    localIndex,
    nestedIndex
  ) => {
    const updatedAcc = unifiedAccessControlConditions;
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
      updatedAcc.push({operator: "and"});
      updatedAcc.push(newAccessControlCondition[0]);
    }
    return updatedAcc;
  };

  const handleUpdateUnifiedAccessControlConditions = async (
    newAccessControlCondition,
    isNested = false,
    index = null
  ) => {
    let updatedAcc = [ ...unifiedAccessControlConditions ];
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
          [ updatedAcc[index] ],
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
    let updatedAcc = [ ...unifiedAccessControlConditions ];
    if (nestedIndex) {
      updatedAcc[localIndex][nestedIndex].operator = value;
    } else {
      updatedAcc[localIndex].operator = value;
    }

    await updateState(updatedAcc);
  };

  const updateState = async (acc) => {

    const cleanedAcc = cleanUnifiedAccessControlConditions(acc);
    let humanizedData;
    try {
      humanizedData = await humanizeNestedConditions([ ...cleanedAcc ]);
      setHumanizedUnifiedAccessControlConditions([ ...humanizedData ]);
    } catch (err) {
      logDevError(err);
    }
    setUnifiedAccessControlConditions([ ...cleanedAcc ]);
  };

  // TODO: functions for keeping


  const clearAllAccessControlConditions = () => {
    setUnifiedAccessControlConditions([]);
    setHumanizedUnifiedAccessControlConditions([]);
  };

  const handleClose = () => {
    if (unifiedAccessControlConditions.length) {
      setShowConfirmationModal(true);
    } else {
      resetModal();
      onClose();
    }
  };

  const resetModal = () => {
    setFlow("singleCondition");
    setDisplayedPage("single");
    clearAllAccessControlConditions();
    setError(null);
    setInitialChain(chainList).then(() => {
    });
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

  const sendUnifiedAccessControlConditions = async (conditionsArePermanent) => {
    const cleanedAccessControlConditions = stripNestedArray(unifiedAccessControlConditions);

    const allConditionTypes = getAllNeededAuthSigs(unifiedAccessControlConditions);
    const authSigTypes = [ ...new Set(allConditionTypes) ];

    const allChainTypes = getAllChains(unifiedAccessControlConditions);
    const chains = [ ...new Set(allChainTypes) ];

    const keyParams = {
      unifiedAccessControlConditions: cleanedAccessControlConditions,
      permanent: conditionsArePermanent,
      chains,
      authSigTypes
    };
    // TODO: comment back in to export conditions
    await onUnifiedAccessControlConditionsSelected(keyParams);
    resetModal();
  };

  const getTheme = () => {
    if (darkMode) {
      return 'lsm-dark-theme';
    } else {
      return 'lsm-light-theme';
    }
  }

  if (loading) {
    return (
      <span className={'lsm-loading-display'}>
        <LitLoading/>
      </span>
    )
  }

  return (
    <div className={`lsm-share-modal-container ${getTheme()}`}>
      {(!error && cssLoaded) && (
        <ShareModalContext.Provider
          value={{
            handleUpdateUnifiedAccessControlConditions,
            handleDeleteAccessControlCondition,
            clearAllAccessControlConditions,
            updateLogicOperator,
            handleClose,
            sendUnifiedAccessControlConditions,
            resetModal,
            wipeInitialProps,
            allowChainSelector,
            chain,
            chainList,
            setChain,
            setError,
            setDisplayedPage,
            setFlow,
            humanizedUnifiedAccessControlConditions,
            unifiedAccessControlConditions,
            displayedPage,
            tokenList,
            flow,
            defaultTokens,
            allowMultipleConditions,
            permanentDefault,
          }}
        >
          {allowDevMode ? (
            <DevModeHeader handleClose={handleClose}
                           isModal={isModal}
                           showDevMode={showDevMode}
                           setShowDevMode={setShowDevMode}/>
          ) : (
            <LitHeader handleClose={handleClose} isModal={isModal}/>
          )}
          {(allowDevMode && showDevMode) ? (
            <DevModeContent unifiedAccessControlConditions={unifiedAccessControlConditions}/>
          ) : (
            <div className={'lsm-condition-display'}>
              {(flow === 'singleCondition' && displayedPage !== 'review') && (
                <SingleConditionSelect stepAfterUpdate={'review'}
                                       chain={chain}
                                       initialState={storedInitialState}
                                       initialCondition={storedInitialCondition}
                                       humanizedUnifiedAccessControlConditions={humanizedUnifiedAccessControlConditions}
                                       unifiedAccessControlConditions={unifiedAccessControlConditions}/>
              )}
              {(flow === 'multipleConditions' && displayedPage !== 'review') && (
                <MultipleConditionSelect chain={chain}
                                         initialState={storedInitialState}
                                         initialCondition={initialCondition}
                                         humanizedUnifiedAccessControlConditions={humanizedUnifiedAccessControlConditions}
                                         unifiedAccessControlConditions={unifiedAccessControlConditions}/>
              )}
              {displayedPage === 'review' && (
                <ReviewConditions chain={chain}
                                  humanizedUnifiedAccessControlConditions={humanizedUnifiedAccessControlConditions}
                                  unifiedAccessControlConditions={unifiedAccessControlConditions}/>
              )}
            </div>
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
          <p className={'lsm-font-segoe'}>{error.toString()}</p>
          <p className={'lsm-font-segoe lsm-text-brand-5'}>Please close and reopen the modal to reconnect.</p>
          <button className={'lsm-error-button lsm-bg-brand-4'} onClick={onClose}>Close</button>
        </span>
      )}
    </div>
  );
};

export default ShareModal;
