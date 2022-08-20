import { AvatarProps } from './Avatart.types';

const Avatar: React.FC<AvatarProps> = props => (
  <div className="avatar placeholder">
    <div className="bg-primary text-neutral-content rounded-full w-8">
      <span className="text-lg">{props.children}</span>
    </div>
  </div>
);

export default Avatar;
