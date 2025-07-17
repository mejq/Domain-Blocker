import { __spreadProps, __spreadValues } from "@nf-internal/chunk-WDMUDEB6";
// node_modules/@angular/core/fesm2022/untracked-BKcld_ew.mjs
function defaultEquals(a, b) {
    return Object.is(a, b);
}
var activeConsumer = null;
var inNotificationPhase = false;
var epoch = 1;
var SIGNAL = /* @__PURE__ */ Symbol("SIGNAL");
function setActiveConsumer(consumer) {
    const prev = activeConsumer;
    activeConsumer = consumer;
    return prev;
}
function getActiveConsumer() {
    return activeConsumer;
}
function isInNotificationPhase() {
    return inNotificationPhase;
}
function isReactive(value) {
    return value[SIGNAL] !== void 0;
}
var REACTIVE_NODE = {
    version: 0,
    lastCleanEpoch: 0,
    dirty: false,
    producerNode: void 0,
    producerLastReadVersion: void 0,
    producerIndexOfThis: void 0,
    nextProducerIndex: 0,
    liveConsumerNode: void 0,
    liveConsumerIndexOfThis: void 0,
    consumerAllowSignalWrites: false,
    consumerIsAlwaysLive: false,
    kind: "unknown",
    producerMustRecompute: () => false,
    producerRecomputeValue: () => { },
    consumerMarkedDirty: () => { },
    consumerOnSignalRead: () => { }
};
function producerAccessed(node) {
    if (inNotificationPhase) {
        throw new Error(typeof ngDevMode !== "undefined" && ngDevMode ? `Assertion error: signal read during notification phase` : "");
    }
    if (activeConsumer === null) {
        return;
    }
    activeConsumer.consumerOnSignalRead(node);
    const idx = activeConsumer.nextProducerIndex++;
    assertConsumerNode(activeConsumer);
    if (idx < activeConsumer.producerNode.length && activeConsumer.producerNode[idx] !== node) {
        if (consumerIsLive(activeConsumer)) {
            const staleProducer = activeConsumer.producerNode[idx];
            producerRemoveLiveConsumerAtIndex(staleProducer, activeConsumer.producerIndexOfThis[idx]);
        }
    }
    if (activeConsumer.producerNode[idx] !== node) {
        activeConsumer.producerNode[idx] = node;
        activeConsumer.producerIndexOfThis[idx] = consumerIsLive(activeConsumer) ? producerAddLiveConsumer(node, activeConsumer, idx) : 0;
    }
    activeConsumer.producerLastReadVersion[idx] = node.version;
}
function producerIncrementEpoch() {
    epoch++;
}
function producerUpdateValueVersion(node) {
    if (consumerIsLive(node) && !node.dirty) {
        return;
    }
    if (!node.dirty && node.lastCleanEpoch === epoch) {
        return;
    }
    if (!node.producerMustRecompute(node) && !consumerPollProducersForChange(node)) {
        producerMarkClean(node);
        return;
    }
    node.producerRecomputeValue(node);
    producerMarkClean(node);
}
function producerNotifyConsumers(node) {
    if (node.liveConsumerNode === void 0) {
        return;
    }
    const prev = inNotificationPhase;
    inNotificationPhase = true;
    try {
        for (const consumer of node.liveConsumerNode) {
            if (!consumer.dirty) {
                consumerMarkDirty(consumer);
            }
        }
    }
    finally {
        inNotificationPhase = prev;
    }
}
function producerUpdatesAllowed() {
    return activeConsumer?.consumerAllowSignalWrites !== false;
}
function consumerMarkDirty(node) {
    node.dirty = true;
    producerNotifyConsumers(node);
    node.consumerMarkedDirty?.(node);
}
function producerMarkClean(node) {
    node.dirty = false;
    node.lastCleanEpoch = epoch;
}
function consumerBeforeComputation(node) {
    node && (node.nextProducerIndex = 0);
    return setActiveConsumer(node);
}
function consumerAfterComputation(node, prevConsumer) {
    setActiveConsumer(prevConsumer);
    if (!node || node.producerNode === void 0 || node.producerIndexOfThis === void 0 || node.producerLastReadVersion === void 0) {
        return;
    }
    if (consumerIsLive(node)) {
        for (let i = node.nextProducerIndex; i < node.producerNode.length; i++) {
            producerRemoveLiveConsumerAtIndex(node.producerNode[i], node.producerIndexOfThis[i]);
        }
    }
    while (node.producerNode.length > node.nextProducerIndex) {
        node.producerNode.pop();
        node.producerLastReadVersion.pop();
        node.producerIndexOfThis.pop();
    }
}
function consumerPollProducersForChange(node) {
    assertConsumerNode(node);
    for (let i = 0; i < node.producerNode.length; i++) {
        const producer = node.producerNode[i];
        const seenVersion = node.producerLastReadVersion[i];
        if (seenVersion !== producer.version) {
            return true;
        }
        producerUpdateValueVersion(producer);
        if (seenVersion !== producer.version) {
            return true;
        }
    }
    return false;
}
function consumerDestroy(node) {
    assertConsumerNode(node);
    if (consumerIsLive(node)) {
        for (let i = 0; i < node.producerNode.length; i++) {
            producerRemoveLiveConsumerAtIndex(node.producerNode[i], node.producerIndexOfThis[i]);
        }
    }
    node.producerNode.length = node.producerLastReadVersion.length = node.producerIndexOfThis.length = 0;
    if (node.liveConsumerNode) {
        node.liveConsumerNode.length = node.liveConsumerIndexOfThis.length = 0;
    }
}
function producerAddLiveConsumer(node, consumer, indexOfThis) {
    assertProducerNode(node);
    if (node.liveConsumerNode.length === 0 && isConsumerNode(node)) {
        for (let i = 0; i < node.producerNode.length; i++) {
            node.producerIndexOfThis[i] = producerAddLiveConsumer(node.producerNode[i], node, i);
        }
    }
    node.liveConsumerIndexOfThis.push(indexOfThis);
    return node.liveConsumerNode.push(consumer) - 1;
}
function producerRemoveLiveConsumerAtIndex(node, idx) {
    assertProducerNode(node);
    if (typeof ngDevMode !== "undefined" && ngDevMode && idx >= node.liveConsumerNode.length) {
        throw new Error(`Assertion error: active consumer index ${idx} is out of bounds of ${node.liveConsumerNode.length} consumers)`);
    }
    if (node.liveConsumerNode.length === 1 && isConsumerNode(node)) {
        for (let i = 0; i < node.producerNode.length; i++) {
            producerRemoveLiveConsumerAtIndex(node.producerNode[i], node.producerIndexOfThis[i]);
        }
    }
    const lastIdx = node.liveConsumerNode.length - 1;
    node.liveConsumerNode[idx] = node.liveConsumerNode[lastIdx];
    node.liveConsumerIndexOfThis[idx] = node.liveConsumerIndexOfThis[lastIdx];
    node.liveConsumerNode.length--;
    node.liveConsumerIndexOfThis.length--;
    if (idx < node.liveConsumerNode.length) {
        const idxProducer = node.liveConsumerIndexOfThis[idx];
        const consumer = node.liveConsumerNode[idx];
        assertConsumerNode(consumer);
        consumer.producerIndexOfThis[idxProducer] = idx;
    }
}
function consumerIsLive(node) {
    return node.consumerIsAlwaysLive || (node?.liveConsumerNode?.length ?? 0) > 0;
}
function assertConsumerNode(node) {
    node.producerNode ??= [];
    node.producerIndexOfThis ??= [];
    node.producerLastReadVersion ??= [];
}
function assertProducerNode(node) {
    node.liveConsumerNode ??= [];
    node.liveConsumerIndexOfThis ??= [];
}
function isConsumerNode(node) {
    return node.producerNode !== void 0;
}
function createComputed(computation, equal) {
    const node = Object.create(COMPUTED_NODE);
    node.computation = computation;
    if (equal !== void 0) {
        node.equal = equal;
    }
    const computed = () => {
        producerUpdateValueVersion(node);
        producerAccessed(node);
        if (node.value === ERRORED) {
            throw node.error;
        }
        return node.value;
    };
    computed[SIGNAL] = node;
    return computed;
}
var UNSET = /* @__PURE__ */ Symbol("UNSET");
var COMPUTING = /* @__PURE__ */ Symbol("COMPUTING");
var ERRORED = /* @__PURE__ */ Symbol("ERRORED");
var COMPUTED_NODE = /* @__PURE__ */ (() => {
    return __spreadProps(__spreadValues({}, REACTIVE_NODE), {
        value: UNSET,
        dirty: true,
        error: null,
        equal: defaultEquals,
        kind: "computed",
        producerMustRecompute(node) {
            return node.value === UNSET || node.value === COMPUTING;
        },
        producerRecomputeValue(node) {
            if (node.value === COMPUTING) {
                throw new Error("Detected cycle in computations.");
            }
            const oldValue = node.value;
            node.value = COMPUTING;
            const prevConsumer = consumerBeforeComputation(node);
            let newValue;
            let wasEqual = false;
            try {
                newValue = node.computation();
                setActiveConsumer(null);
                wasEqual = oldValue !== UNSET && oldValue !== ERRORED && newValue !== ERRORED && node.equal(oldValue, newValue);
            }
            catch (err) {
                newValue = ERRORED;
                node.error = err;
            }
            finally {
                consumerAfterComputation(node, prevConsumer);
            }
            if (wasEqual) {
                node.value = oldValue;
                return;
            }
            node.value = newValue;
            node.version++;
        }
    });
})();
function defaultThrowError() {
    throw new Error();
}
var throwInvalidWriteToSignalErrorFn = defaultThrowError;
function throwInvalidWriteToSignalError(node) {
    throwInvalidWriteToSignalErrorFn(node);
}
function setThrowInvalidWriteToSignalError(fn) {
    throwInvalidWriteToSignalErrorFn = fn;
}
var postSignalSetFn = null;
function createSignal(initialValue, equal) {
    const node = Object.create(SIGNAL_NODE);
    node.value = initialValue;
    if (equal !== void 0) {
        node.equal = equal;
    }
    const getter = () => {
        producerAccessed(node);
        return node.value;
    };
    getter[SIGNAL] = node;
    return getter;
}
function setPostSignalSetFn(fn) {
    const prev = postSignalSetFn;
    postSignalSetFn = fn;
    return prev;
}
function signalSetFn(node, newValue) {
    if (!producerUpdatesAllowed()) {
        throwInvalidWriteToSignalError(node);
    }
    if (!node.equal(node.value, newValue)) {
        node.value = newValue;
        signalValueChanged(node);
    }
}
function signalUpdateFn(node, updater) {
    if (!producerUpdatesAllowed()) {
        throwInvalidWriteToSignalError(node);
    }
    signalSetFn(node, updater(node.value));
}
function runPostSignalSetFn() {
    postSignalSetFn?.();
}
var SIGNAL_NODE = /* @__PURE__ */ (() => {
    return __spreadProps(__spreadValues({}, REACTIVE_NODE), {
        equal: defaultEquals,
        value: void 0,
        kind: "signal"
    });
})();
function signalValueChanged(node) {
    node.version++;
    producerIncrementEpoch();
    producerNotifyConsumers(node);
    postSignalSetFn?.();
}
function createLinkedSignal(sourceFn, computationFn, equalityFn) {
    const node = Object.create(LINKED_SIGNAL_NODE);
    node.source = sourceFn;
    node.computation = computationFn;
    if (equalityFn != void 0) {
        node.equal = equalityFn;
    }
    const linkedSignalGetter = () => {
        producerUpdateValueVersion(node);
        producerAccessed(node);
        if (node.value === ERRORED) {
            throw node.error;
        }
        return node.value;
    };
    const getter = linkedSignalGetter;
    getter[SIGNAL] = node;
    return getter;
}
function linkedSignalSetFn(node, newValue) {
    producerUpdateValueVersion(node);
    signalSetFn(node, newValue);
    producerMarkClean(node);
}
function linkedSignalUpdateFn(node, updater) {
    producerUpdateValueVersion(node);
    signalUpdateFn(node, updater);
    producerMarkClean(node);
}
var LINKED_SIGNAL_NODE = /* @__PURE__ */ (() => {
    return __spreadProps(__spreadValues({}, REACTIVE_NODE), {
        value: UNSET,
        dirty: true,
        error: null,
        equal: defaultEquals,
        kind: "linkedSignal",
        producerMustRecompute(node) {
            return node.value === UNSET || node.value === COMPUTING;
        },
        producerRecomputeValue(node) {
            if (node.value === COMPUTING) {
                throw new Error("Detected cycle in computations.");
            }
            const oldValue = node.value;
            node.value = COMPUTING;
            const prevConsumer = consumerBeforeComputation(node);
            let newValue;
            try {
                const newSourceValue = node.source();
                const prev = oldValue === UNSET || oldValue === ERRORED ? void 0 : {
                    source: node.sourceValue,
                    value: oldValue
                };
                newValue = node.computation(newSourceValue, prev);
                node.sourceValue = newSourceValue;
            }
            catch (err) {
                newValue = ERRORED;
                node.error = err;
            }
            finally {
                consumerAfterComputation(node, prevConsumer);
            }
            if (oldValue !== UNSET && newValue !== ERRORED && node.equal(oldValue, newValue)) {
                node.value = oldValue;
                return;
            }
            node.value = newValue;
            node.version++;
        }
    });
})();
function setAlternateWeakRefImpl(impl) { }
function untracked(nonReactiveReadsFn) {
    const prevConsumer = setActiveConsumer(null);
    try {
        return nonReactiveReadsFn();
    }
    finally {
        setActiveConsumer(prevConsumer);
    }
}
export { defaultEquals, SIGNAL, setActiveConsumer, getActiveConsumer, isInNotificationPhase, isReactive, REACTIVE_NODE, producerAccessed, producerIncrementEpoch, producerUpdateValueVersion, producerNotifyConsumers, producerUpdatesAllowed, consumerMarkDirty, producerMarkClean, consumerBeforeComputation, consumerAfterComputation, consumerPollProducersForChange, consumerDestroy, createComputed, setThrowInvalidWriteToSignalError, createSignal, setPostSignalSetFn, signalSetFn, signalUpdateFn, runPostSignalSetFn, SIGNAL_NODE, createLinkedSignal, linkedSignalSetFn, linkedSignalUpdateFn, setAlternateWeakRefImpl, untracked };
/*! Bundled license information:

@angular/core/fesm2022/untracked-BKcld_ew.mjs:
  (**
   * @license Angular v19.2.14
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
