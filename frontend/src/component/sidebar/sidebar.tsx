import MenuOptions from './menuOptions';

const Sidebar = () => {
  return (
    <div>
      <MenuOptions defaultOpen={true} />
      <MenuOptions />
    </div>
  );
};

export default Sidebar;
