import { buttonBehavior } from '@fluentui/accessibility';
import { compose } from '@fluentui/react-bindings';
import * as React from 'react';

import { WithAsProp } from '../../types';
import { createShorthandFactory, ShorthandFactory } from '../../utils';
import Button, { ButtonProps, ButtonStylesProps } from '../Button/Button';

interface AttachmentActionOwnProps {}
export interface AttachmentActionProps extends AttachmentActionOwnProps, WithAsProp<ButtonProps> {}

export type AttachmentActionStylesProps = never;
export const attachmentActionClassName = 'ui-attachment__action';

export type PropsOfElement<
  E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

export interface ComponentWithAs<E extends React.ElementType, P> {
  <EE extends React.ElementType = E>(props: Omit<PropsOfElement<EE>, 'as' | keyof P> & { as?: EE } & P): JSX.Element;
  displayName?: string;

  defaultProps?: Partial<P & { as: E }>;
  propTypes?: React.WeakValidationMap<P> & {
    as: React.Requireable<string | ((props: any, context?: any) => any) | (new (props: any, context?: any) => any)>;
  };
}

/**
 * An AttachmentAction provides a slot for actions in the Attachment.
 */
const AttachmentAction = compose<
  'button',
  AttachmentActionOwnProps,
  AttachmentActionStylesProps,
  WithAsProp<ButtonProps>,
  ButtonStylesProps
>(Button, {
  className: attachmentActionClassName,
  displayName: 'AttachmentAction2',
}) as ComponentWithAs<'button', AttachmentActionProps> & { create: ShorthandFactory<any> };

AttachmentAction.defaultProps = {
  accessibility: buttonBehavior,
  as: 'button',
  iconOnly: true,
  text: true,
};
AttachmentAction.propTypes = Button.propTypes;

AttachmentAction.create = createShorthandFactory({ Component: AttachmentAction, mappedProp: 'content' });

export default AttachmentAction;
