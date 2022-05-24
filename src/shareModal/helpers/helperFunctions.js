const logDevError = (message) => {
  console.log(`Error in Lit Share Modal - ${message}`)
}

const checkPropTypes = (props) => {
  // TODO: figure out best way to type all this nonsense
  if (props['chainsAllowed'] && !Array.isArray(props['chainsAllowed'])) {
    logDevError("'chainsAllowed' prop must be an array.")
  }
  if (props['defaultChain'] && typeof props['defaultChain'] !== 'string') {
    logDevError("'defaultChain' prop must be a string.")
  }
  if (props['injectCSS'] && typeof props['injectCSS'] !== 'boolean') {
    logDevError("'injectCSS' prop must be a boolean.")
  }
  if (props['showChainSelector'] && typeof props['showChainSelector'] !== 'boolean') {
    logDevError("'showChainSelector' prop must be a boolean.")
  }
  if (props['allowMultipleConditions'] && typeof props['allowMultipleConditions'] !== 'boolean') {
    logDevError("'allowMultipleConditions' prop must be a boolean.")
  }
  if (props['permanentDefault'] && typeof props['permanentDefault'] !== 'boolean') {
    logDevError("'permanentDefault' prop must be a boolean.")
  }
  if (props['isModal'] && typeof props['isModal'] !== 'boolean') {
    logDevError("'isModal' prop must be a boolean.")
  }
  if (props['allowDevMode'] && typeof props['allowDevMode'] !== 'boolean') {
    logDevError("'allowDevMode' prop must be a boolean.")
  }
}

const getAllowedConditionTypes = (chainData, conditionsAllowed = null) => {
  if (!conditionsAllowed) {
    return chainData;
  } else {
    const chainDataHolder = chainData;
    const chainConditionsAllowed = {};
    conditionsAllowed.forEach(c => {
      if(!!chainData.conditionTypes[c]) {
        chainConditionsAllowed[c] = chainData.conditionTypes[c];
      } else {
        logDevError(`condition '${c}' not found or not supported for this chain.`)
      }
    })
    chainDataHolder.conditionTypes = chainConditionsAllowed;
    return chainDataHolder;
  }
}

const getAllowedConditions = (chainsAllowed, conditionsAllowed, defaultAllowedChainsObj) => {
  const currentlyAllowedChains = [];
  chainsAllowed.forEach(c => {
    if (!!defaultAllowedChainsObj[c]) {
      let chainData = defaultAllowedChainsObj[c];
      chainData = getAllowedConditionTypes(chainData, conditionsAllowed[c]);
      currentlyAllowedChains.push(chainData);
    } else {
      logDevError(`chain '${c}' not found. Check the spelling.`)
    }
  })
  return currentlyAllowedChains;
}

export {
  logDevError,
  checkPropTypes,
  getAllowedConditions
}
