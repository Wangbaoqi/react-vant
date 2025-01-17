import React, { useContext, useMemo } from 'react';

import RadioContext from './RadioContext';
import Checker from '../checkbox/Checker';

import { RadioProps, RadioValueType } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

function Radio<T = RadioValueType>(props: RadioProps<T>) {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('radio', prefixCls);
  const { parent, ...context } = useContext(RadioContext);

  const checked = useMemo(() => {
    return parent ? context.checked === props.name : props.checked;
  }, [context.checked]);

  const toggle = () => {
    const emitter = parent ? context.toggle : () => {};
    emitter(props.name);
  };

  return (
    <Checker
      {...props}
      bem={bem}
      role="radio"
      parent={parent}
      checked={checked}
      onToggle={toggle}
    />
  );
}

export default Radio;
