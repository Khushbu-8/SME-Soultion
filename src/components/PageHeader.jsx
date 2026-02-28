import React from "react";

const PageHeader = ({
  title,
  description,
  action = null,
  containerClassName = "flex items-center justify-between",
  titleClassName = "text-3xl font-medium text-black mb-2",
  descriptionClassName = "text-gray-500 text-md",
}) => {
  return (
    <div className={containerClassName}>
      <div>
        <h1 className={titleClassName}>{title}</h1>
        {description ? <p className={descriptionClassName}>{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
};

export default PageHeader;
