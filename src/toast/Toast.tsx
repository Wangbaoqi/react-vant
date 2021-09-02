import React, { useEffect } from 'react';
import classnames from 'classnames';

import Icon from '../icon';
import Popup from '../popup';
import Loading from '../loading';

import { lockClick } from './lock-click';
import { createNamespace, isDef } from '../utils';
import { ToastProps } from './PropsType';

const [bem] = createNamespace('toast');

const Toast: React.FC<ToastProps & { visible?: boolean }> = (props) => {
  let clickable = false;

  const toggleClickable = () => {
    const newValue = props.visible && props.forbidClick;
    if (clickable !== newValue) {
      clickable = newValue;
      lockClick(clickable);
    }
    if (!props.visible) {
      lockClick(false);
    }
  };

  const onClick = () => {
    if (props.closeOnClick) {
      props.onClose();
    }
  };

  const clearTimer = () => {
    props.onClose();
  };

  useEffect(() => {
    toggleClickable();
  }, [props.visible, props.forbidClick]);

  const renderIcon = () => {
    const { icon, type, iconPrefix, iconSize, loadingType } = props;
    const hasIcon = icon || type === 'success' || type === 'fail';
    if (hasIcon) {
      return (
        <Icon
          name={icon || (type === 'fail' ? 'cross' : type)}
          size={iconSize}
          className={classnames(bem('icon'))}
          classPrefix={iconPrefix}
        />
      );
    }

    if (type === 'loading') {
      return <Loading className={classnames(bem('loading'))} type={loadingType} />;
    }

    return null;
  };

  const renderMessage = () => {
    const { message } = props;
    if (isDef(message) && message !== '') {
      return <div className={classnames(bem('info'))}>{message}</div>;
    }
    return null;
  };

  return (
    <Popup
      className={classnames([
        bem([props.position, { [props.type]: !props.icon }]),
        props.className,
      ])}
      visible={props.visible}
      overlay={props.overlay}
      transition={props.transition}
      overlayClass={props.overlayClass}
      overlayStyle={props.overlayStyle}
      closeOnClickOverlay={props.closeOnClickOverlay}
      lockScroll={false}
      onClick={onClick}
      onClosed={clearTimer}
      onOpened={props.onOpened}
      teleport={props.teleport}
    >
      {renderIcon()}
      {renderMessage()}
    </Popup>
  );
};

Toast.defaultProps = {
  type: 'info',
  duration: 2000,
  position: 'middle',
  transition: 'rv-fade',
  loadingType: 'circular',
  overlay: false,
};

export default Toast;