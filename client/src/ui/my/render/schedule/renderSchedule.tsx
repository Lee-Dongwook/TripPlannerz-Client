import { Select } from "antd";
import { renderNullSchedulePage } from "@/ui/my/render/schedule/renderNullSchedule";
import type { RenderScheduleProp } from "@/ui/my/render/schedule/renderScheduleProp.types";
const { Option } = Select;

export const renderSchedulePage = ({value, onChange}: RenderScheduleProp) => {
    return (
      <div className="profilecard">
        <h2>내 일정 조회</h2>
        <Select className="select" value={value} onChange={onChange}>
          <Option default value="new">최신 순</Option>
          <Option value="hits">조회 수</Option>
        </Select>
        <hr />
        {/* <table className="table">
          <tbody>
            {size === 0 ? (
              <renderNullSchedulePage name="1" />
            ) : (
              <Posts
                posts={currentPosts(posts)}
                handleClick={handleClick}
              ></Posts>
            )}
          </tbody>
        </table>
        <div>
        </div>
        <br />
        {size === 0 ? (
          ""
        ) : (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={(pageNumber) => setCurrentNumber(pageNumber - 1)}
            total={total}
          ></Pagination>
        )} */}
      </div>
    );
  };