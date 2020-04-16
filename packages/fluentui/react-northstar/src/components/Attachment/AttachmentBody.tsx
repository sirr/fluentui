import { compose, ComponentWithAs } from '@fluentui/react-bindings';

import { WithAsProp } from '../../types';
import { commonPropTypes, createShorthandFactory, ShorthandFactory } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';

interface AttachmentBodyOwnProps {}
export interface AttachmentBodyProps extends AttachmentBodyOwnProps, WithAsProp<BoxProps> {}

export type AttachmentBodyStylesProps = never;
export const attachmentBodyClassName = 'ui-attachment__body';

/**
 * An AttachmentBody provides a slot for header and description in the Attachment.
 */
const AttachmentBody = compose<
  'div',
  AttachmentBodyOwnProps,
  AttachmentBodyStylesProps,
  WithAsProp<BoxProps>,
  BoxStylesProps
>(Box, {
  className: attachmentBodyClassName,
  displayName: 'AttachmentBody',
}) as ComponentWithAs<
  'div',
  AttachmentBodyProps,
  { create?: ShorthandFactory<AttachmentBodyProps>; deprecated_className: string }
>;

AttachmentBody.propTypes = commonPropTypes.createCommon();

AttachmentBody.create = createShorthandFactory({ Component: AttachmentBody, mappedProp: 'content' });

export default AttachmentBody;
