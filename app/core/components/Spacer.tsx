import { FC } from 'react';

import { SpacingKey, useTheme } from 'app/core/theme';

import { SpacerProps } from './Spacer.types';

const Spacer: FC<SpacerProps> = props => {
  const theme = useTheme();

  const getSpacing = (spacing: SpacingKey | undefined): string | undefined =>
    spacing ? theme.spacing[spacing] : undefined;

  const allSpacing = getSpacing(props.all);

  return (
    <div
      style={{
        paddingLeft: getSpacing(props.left) ?? allSpacing,
        paddingRight: getSpacing(props.right) ?? allSpacing,
        paddingTop: getSpacing(props.top) ?? allSpacing,
        paddingBottom: getSpacing(props.bottom) ?? allSpacing,
      }}
    >
      {props.children}
    </div>
  );
};

export default Spacer;
