import React from "react";

const Footer = ({ completedTasksCount = 0, activeTaskCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTaskCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                Tuyệt vời bạn đã hoàn thành {completedTasksCount} việc
                {activeTaskCount > 0 &&
                  `, còn ${activeTaskCount} việc nữa thôi. Cố lên`}
              </>
            )}
            {completedTasksCount === 0 && activeTaskCount > 0 && (
              <>Hãy bắt đầu làm {activeTaskCount} nhiệm vụ nào!</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
