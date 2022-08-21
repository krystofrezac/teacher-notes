import { DropdownProps } from './Dropdown.types';

const Dropdown: React.FC<DropdownProps> = props => {
  const classes = [
    props.top && 'dropdown-top',
    props.end && 'dropdown-end',
    props.left && 'dropdown-left',
    props.right && 'dropdown-right',
  ]
    .filter(item => !!item)
    .join(' ');

  return (
    <div className={`dropdown ${classes}`}>
      {props.trigger}
      <ul className='dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 border'>
        {props.options.map(option => (
          <li key={option.key}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
