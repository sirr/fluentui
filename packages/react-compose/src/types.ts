import * as React from 'react';

//
// "as" type safety
//

export type PropsOfElement<
  E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

export type ComponentWithAs<E extends React.ElementType, P, S = {}> = (<EE extends React.ElementType = E>(
  props: Omit<PropsOfElement<EE>, 'as' | keyof P> & { as?: EE } & P,
) => JSX.Element) & {
  displayName?: string;

  defaultProps?: Partial<P & { as: E }>;
  propTypes?: React.WeakValidationMap<P> & {
    as: React.Requireable<string | ((props: any, context?: any) => any) | (new (props: any, context?: any) => any)>;
  };
} & S;

//
// Compose types
//

export type ComposedComponent<P = {}> = React.FunctionComponent<P> & {
  fluentComposeConfig: ComposePreparedOptions;
};

export type Input<T extends React.ElementType = 'div', P = {}> =
  | (React.FunctionComponent<P> & { fluentComposeConfig?: ComposePreparedOptions })
  | ComposeRenderFunction<T, P & { as?: React.ElementType }>;

export type ComposeRenderFunction<T extends React.ElementType = 'div', P = {}> = (
  props: P,
  ref: React.Ref<T>,
  composeOptions: ComposePreparedOptions,
) => React.ReactElement | null;

export type ComposeOptions<InputProps = {}, InputStylesProps = {}, ParentStylesProps = {}> = {
  className?: string;
  displayName?: string;

  mapPropsToStylesProps?: (props: ParentStylesProps & InputProps) => InputStylesProps;

  handledProps?: (keyof InputProps)[];
  overrideStyles?: boolean;
};

export type ComposePreparedOptions<Props = {}> = {
  className: string;
  displayNames: string[];

  mapPropsToStylesPropsChain: ((props: object) => object)[];
  render: ComposeRenderFunction;

  handledProps: (keyof Props)[];
  overrideStyles: boolean;
};
