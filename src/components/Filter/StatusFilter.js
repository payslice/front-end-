import { Dropdown, Menu } from "antd";

export const StatusFilter = ({ filterBy, ...props }) => {
  const onClick = ({ key }) => {
    filterBy(key);
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">Status: Complete</Menu.Item>
      <Menu.Item key="2">Status: In Progress</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Clear Filter</Menu.Item>
    </Menu>
  );

  return (
    <div {...props}>
      <Dropdown className="filter" overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Filter By <span></span>
        </a>
      </Dropdown>
    </div>
  );
};
