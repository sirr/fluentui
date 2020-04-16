import { Accessibility, buttonBehavior } from '@fluentui/accessibility';
import {
  compose,
  ComponentWithAs,
  getElementType,
  useAccessibility,
  useStyles,
  useTelemetry,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  SizeValue,
  ShorthandFactory,
} from '../../utils';
import Box, { BoxProps } from '../Box/Box';
import Loader, { LoaderProps } from '../Loader/Loader';
import { ComponentEventHandler, ShorthandValue, ProviderContextPrepared } from '../../types';
import ButtonGroup from './ButtonGroup';
import ButtonContent, { ButtonContentProps } from './ButtonContent';

export interface ButtonProps
  extends UIComponentProps,
    ContentComponentProps<ShorthandValue<ButtonContentProps>>,
    ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

  /** A button can appear circular. */
  circular?: boolean;

  /** A button can show that it cannot be interacted with. */
  disabled?: boolean;

  /** A button can fill the width of its container. */
  fluid?: boolean;

  /** A button can have an icon. */
  icon?: ShorthandValue<BoxProps>;

  /** A button can contain only an icon. */
  iconOnly?: boolean;

  /** An icon button can format its Icon to appear before or after its content */
  iconPosition?: 'before' | 'after';

  /** A button that inherits its background and has a subtle appearance */
  inverted?: boolean;

  /** Shorthand to customize a button's loader. */
  loader?: ShorthandValue<LoaderProps>;

  /** A button can show a loading indicator. */
  loading?: boolean;

  /**
   * Called after a user clicks the button.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<ButtonProps>;

  /**
   * Called after a user focuses the button.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<ButtonProps>;

  /** A button can emphasize that it represents the primary action. */
  primary?: boolean;

  /** A button can be formatted to show only text in order to indicate a less-pronounced action. */
  text?: boolean;

  /** A button can emphasize that it represents an alternative action. */
  secondary?: boolean;

  /** A button can be sized. */
  size?: SizeValue;
}

export type ButtonStylesProps = Pick<
  ButtonProps,
  'text' | 'primary' | 'disabled' | 'circular' | 'size' | 'loading' | 'inverted' | 'iconOnly' | 'fluid' | 'iconPosition'
> & {
  hasContent?: boolean;
};

/**
 * A Button enables users to take an action, such as submitting a form, opening a dialog, etc.
 *
 * @accessibility
 * Implements [ARIA Button](https://www.w3.org/TR/wai-aria-practices-1.1/#button) design pattern.
 */
const Button = compose<'button', ButtonProps, ButtonStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context: ProviderContextPrepared = React.useContext(ThemeContext);
    const { setStart, setEnd } = useTelemetry(Button.displayName, context.telemetry);
    setStart();

    const {
      accessibility,
      // @ts-ignore
      active,
      as,
      children,
      content,
      icon,
      loader,
      disabled,
      iconPosition,
      loading,
      text,
      primary,
      inverted,
      size,
      iconOnly,
      fluid,
      circular,
      className,
      styles,
      variables,
      design,
    } = props;

    const hasChildren = childrenExist(children);

    const getA11Props = useAccessibility(accessibility, {
      debugName: composeOptions.displayNames[0],
      mapPropsToBehavior: () => ({
        as,
        active,
        disabled,
        loading,
      }),
      actionHandlers: {
        performClick: event => {
          event.preventDefault();
          handleClick(event);
        },
      },
      rtl: context.rtl,
    });
    const { classes, styles: resolvedStyles } = useStyles<ButtonStylesProps>(composeOptions.displayNames[0], {
      className: composeOptions.className,
      mapPropsToStyles: () => ({
        text,
        primary,
        disabled,
        circular,
        size,
        loading,
        inverted,
        iconOnly,
        iconPosition,
        fluid,
        hasContent: !!content,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
    });

    const unhandledProps = useUnhandledProps(composeOptions.handledProps as any, props);
    const ElementType = getElementType(props);

    const renderIcon = () => {
      return Box.create(icon, {
        defaultProps: () =>
          getA11Props('icon', {
            styles: resolvedStyles.icon,
          }),
      });
    };

    const renderLoader = () => {
      return Loader.create(loader || {}, {
        defaultProps: () =>
          getA11Props('loader', {
            role: undefined,
            styles: resolvedStyles.loader,
          }),
      });
    };

    const handleClick = (e: React.SyntheticEvent) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      _.invoke(props, 'onClick', e, props);
    };

    const handleFocus = (e: React.SyntheticEvent) => {
      _.invoke(props, 'onFocus', e, props);
    };

    const result = (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...getA11Props('root', {
          onClick: handleClick,
          disabled,
          className: classes.root,
          onFocus: handleFocus,
          ref,
          ...unhandledProps,
        })}
      >
        {hasChildren ? (
          children
        ) : (
          <>
            {loading && renderLoader()}
            {iconPosition !== 'after' && renderIcon()}
            {(ButtonContent as any).create(content, {
              defaultProps: () => getA11Props('content', { as: 'span', size, styles: resolvedStyles.content }),
            })}
            {iconPosition === 'after' && renderIcon()}
          </>
        )}
      </ElementType>
    );

    setEnd();

    return result;
  },
  {
    className: 'ui-button',
    displayName: 'Button',

    handledProps: [
      'accessibility',
      'children',
      'circular',
      'className',
      'content',
      'design',
      'disabled',
      'fluid',
      'icon',
      'iconOnly',
      'iconPosition',
      'inverted',
      'loader',
      'loading',
      'onClick',
      'onFocus',
      'primary',
      'text',
      'secondary',
      'size',
      'styles',
      'variables',
    ],
  },
) as ComponentWithAs<
  'button',
  ButtonProps,
  {
    create: ShorthandFactory<ButtonProps>;

    Content: typeof ButtonContent;
    Group: typeof ButtonGroup;
  }
>;

Button.defaultProps = {
  as: 'button',
  accessibility: buttonBehavior,
  size: 'medium',
};

Button.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  circular: PropTypes.bool,
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  icon: customPropTypes.shorthandAllowingChildren,
  iconOnly: PropTypes.bool,
  iconPosition: PropTypes.oneOf(['before', 'after']),
  inverted: PropTypes.bool,
  loader: customPropTypes.itemShorthandWithoutJSX,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
  text: PropTypes.bool,
  secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
  size: customPropTypes.size,
};

Button.Group = ButtonGroup;
Button.Content = ButtonContent;

Button.create = createShorthandFactory({ Component: Button, mappedProp: 'content' });

export default Button;
