import {
  compose,
  ComponentWithAs,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  useTelemetry,
} from '@fluentui/react-bindings';
import { Accessibility } from '@fluentui/accessibility';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import {
  childrenExist,
  createShorthandFactory,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  UIComponentProps,
  ShorthandFactory,
} from '../../utils';
import { ProviderContextPrepared } from '../../types';

export interface BoxProps extends UIComponentProps<BoxProps>, ContentComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;
}
export type BoxStylesProps = never;

export const boxClassName = 'ui-box';

/**
 * A Box is a basic component, commonly used for slots in other Fluent UI components.
 * By default it just renders a `div`.
 */
const Box = compose<'div', BoxProps, BoxStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context: ProviderContextPrepared = React.useContext(ThemeContext);
    const { setStart, setEnd } = useTelemetry(composeOptions.displayNames[0], context.telemetry);
    setStart();

    const { accessibility, className, design, styles, variables, children, content } = props;

    const getA11Props = useAccessibility(accessibility, {
      debugName: composeOptions.displayNames[0],
      rtl: context.rtl,
    });

    const { classes } = useStyles<BoxStylesProps>(Box.displayName, {
      className: composeOptions.className,
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

    const result = (
      <ElementType
        {...getA11Props('root', {
          ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
          className: classes.root,
          ref,
          ...unhandledProps,
        })}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    );

    setEnd();

    return result;
  },
  {
    className: boxClassName,
    displayName: 'Box',
    handledProps: ['accessibility', 'className', 'children', 'content', 'design', 'styles', 'variables'],
  },
) as ComponentWithAs<'div', BoxProps, { create: ShorthandFactory<BoxProps> }>;

Box.propTypes = commonPropTypes.createCommon();
Box.create = createShorthandFactory({ Component: Box });

export default Box;
