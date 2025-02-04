
import { createActor } from "https://esm.run/xstate"


function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}

var objectIs = "function" === typeof Object.is ? Object.is : is,
    useState = React.useState,
    useEffect = React.useEffect,
    useCallback = React.useCallback,
    useLayoutEffect = React.useLayoutEffect,
    useDebugValue = React.useDebugValue;

function useSyncExternalStore$2(subscribe, getSnapshot) {
  var value = getSnapshot(),
      _useState = useState({ inst: { value: value, getSnapshot: getSnapshot } }),
      inst = _useState[0].inst,
      forceUpdate = _useState[1];

  useLayoutEffect(
    function () {
      inst.value = value;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
    },
    [subscribe, value, getSnapshot]
  );

  useEffect(
    function () {
      checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
      return subscribe(function () {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
      });
    },
    [subscribe]
  );

  useDebugValue(value);
  return value;

}

function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(inst, nextValue);
  } catch (error) {
    return !0;
  }

}

function useSyncExternalStore$1(subscribe, getSnapshot) {
  return getSnapshot();
}

var shim =
  "undefined" === typeof window ||
    "undefined" === typeof window.document ||
    "undefined" === typeof window.document.createElement
    ? useSyncExternalStore$1
    : useSyncExternalStore$2;

const useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;

const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? useLayoutEffect : useEffect

const isDevelopment = false;


const forEachActor = (actorRef, callback) => {
  callback(actorRef);
  const children = actorRef.getSnapshot().children;
  if (children) {
    Object.values(children).forEach((child) => {
      forEachActor(child, callback);
    });
  }
};

function stopRootWithRehydration(actorRef) {
  const persistedSnapshots = [];
  forEachActor(actorRef, (ref) => {
    persistedSnapshots.push([ref, ref.getSnapshot()]);
    ref.observers = new Set();
  });
  const systemSnapshot = actorRef.system.getSnapshot?.();

  actorRef.stop();

  actorRef.system._snapshot = systemSnapshot;
  persistedSnapshots.forEach(([ref, snapshot]) => {
    ref._processingStatus = 0;
    ref._snapshot = snapshot;
  });
}

function useIdleActorRef( logic, ...[options] ) {
  let [[currentConfig, actorRef], setCurrent] = useState(() => {
    const actorRef = createActor(logic, options);
    return [logic.config, actorRef];
  });

  if (logic.config !== currentConfig) {
    const newActorRef = createActor(logic, {
      ...options,
      snapshot: actorRef.getPersistedSnapshot({
        __unsafeAllowInlineActors: true
      })
    });
    setCurrent([logic.config, newActorRef]);
    actorRef = newActorRef;
  }

  useIsomorphicLayoutEffect(() => {
    actorRef.logic.implementations = logic.implementations;
  });

  return actorRef;
}

function useActor( logic, ...[options]){
  if (
    isDevelopment &&
    !!logic &&
    'send' in logic &&
    typeof logic.send === 'function'
  ) {
    throw new Error(
      `useActor() expects actor logic (e.g. a machine), but received an ActorRef. Use the useSelector(actorRef, ...) hook instead to read the ActorRef's snapshot.`
    );
  }

  const actorRef = useIdleActorRef(logic, options);

  const getSnapshot = useCallback(() => {
    return actorRef.getSnapshot();
  }, [actorRef]);

  const subscribe = useCallback(
    handleStoreChange => {
      const { unsubscribe } = actorRef.subscribe(handleStoreChange);
      return unsubscribe;
    },
    [actorRef]
  );

  const actorSnapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot
  );

  useEffect(() => {
    actorRef.start();

    return () => {
      stopRootWithRehydration(actorRef);
    };
  }, [actorRef]);

  return [actorSnapshot, actorRef.send, actorRef];
}

function useMachine( machine, ...[options]) {
  return useActor(machine, options);
}

export {
  useMachine,
  useActor,
}