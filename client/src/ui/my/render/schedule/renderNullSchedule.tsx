export const renderNullSchedulePage = (name: string) => {
    return (
      <div>
        <h5>{name}님의 여행 정보를 찾을 수 없습니다.</h5>
        <h6>
          동행자를 모집하여 직접 여행 일정을 작성하거나, 다른 사람이 만든 여행
          일정에 참여해보세요!
        </h6>
        <br />
        <br />
        <button>일정 생성</button>
      </div>
    );
  };