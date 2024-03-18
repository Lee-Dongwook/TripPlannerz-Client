
# ✈️ TripPlannerZ - Front-end

**여행 일정 관리 및 동행자 찾기 플랫폼, TripPlannerZ** 의 프론트엔드 레포지토리입니다.

`TripPlannerZ`는 함께 여행을 가고 싶어하는 사람들이 여행 일정을 조율하고, 비슷한 관심사를 가진 동행자를 찾을 수 있도록 도와주는 온라인 플랫폼입니다.

[기존 레포지토리](https://github.com/GraudationProject2023/Tripplannerz)에서 발생하였던 문제들을 해결하고, 새로운 기술들을 도입하고자 재구성하였습니다.

## ⚙️ 시스템 아키텍처

현재 추가 구현중 입니다! (2024.01 - )
![시스템 아키텍처 최종](https://github.com/GraudationProject2023/Client/assets/97590636/fd894fdf-fb06-4fae-99ca-feaaa075a1af)

## 🛠️ 기술적 도전

### 사용자 인증 방식의 변경 (JWT 인증 방식)

![JWT](https://github.com/GraudationProject2023/Client/assets/97590636/566da63c-8cb3-4ba1-905b-34fbb0bbf549)

- 보안 취약점 (CSRF, XSS) 개선과 시스템 확장성을 위해 JWT 인증 방식으로 변경하였습니다.
- Redux의 중앙 집중식 상태 관리 기능을 활용하여 애플리케이션 전반에 걸친 인증 상태를 효과적으로 관리하고자 하였습니다.
- Redux-toolkit의 Slice를 사용하여 인증 관련 로직을 모듈화하였고, 비동기 처리 미들웨어 createAsyncThunk를 사용하여 서버와의 비동기 통신 과정에서 발생하는 엑세스 토큰의 갱신 및 관리를 자동화 하였습니다.
- 사용자가 인증 과정에서 경험할 수 있는 지연 시간을 최소화하여 전반적인 사용자 경험을 크게 개선하였습니다.

### SSE(Server Sent Event) 통신 방식으로 동행 신청 실시간 알림 구현

![SSE](https://github.com/GraudationProject2023/Client/assets/97590636/84770ea4-8c12-41f6-9e94-cd71e63fd73e)

### useInfiniteQuery와 InterSectionObserver API로 여행 일정 목록 무한 스크롤 기능 구현

![InfiniteScroll](https://github.com/GraudationProject2023/Client/assets/97590636/76ca9f9b-1888-4452-bc47-d28f9608358e)

### Kakao Map SDK 활용 및 디바운싱 기술 적용

- 사용자가 여행하고자 하는 장소를 쉽게 검색하고 지도 상에 마커를 표시할 수 있도록 Kakao Map SDK를 활용하여 지도를 렌더링하였습니다.
- 검색 성능 최적화를 위해 Debouncing 기술을 적용했습니다. 사용자가 검색어를 입력할 때마다 즉시 검색 요청을 보내지 않고 일정 시간(1000ms) 입력 지연 시 검색 요청을 보내도록 설정하여 서버 부하를 감소시키고 사용자 경험을 개선하였습니다

### OpenWeatherMap API 응답 지연 해결을 위한 Skeleton UI 적용

- 사용자 경험(UX) 개선을 목표로, OpenWeather API로부터 날씨 정보를 응답 받는 동안 발생할 수 있는 업데이트 지연 문제를 해결하기 위해 Skeleton UI를 도입했습니다.

- OpenWeather API로부터 날씨 데이터를 요청하고 응답을 받는 동안, Skeleton UI는 날씨 정보가 표시될 자리에 미리 형태를 갖춘 플레이스홀더를 보여주어 사용자 이탈률을 줄이고자 합니다.

### pnpm에서 yarn berry 전환 및 yarn workspace 모노레포 구축

- 프로젝트 패키지 매니저를 pnpm에서 yarn berry의 Zero Install 방식으로 전환하였습니다.
- yarn workspace를 활용하여 모노레포 구조를 구축하였습니다.
- 본 프로젝트가 모노레포를 적용하기에 큰 규모는 아니지만 인턴 경험에서 체감하였던 모노레포의 이점과 효율성에 대해 학습해보고자 도입하였습니다.
- StoryBook을 활용한 UI 시각적 회귀 테스트, Playwright를 활용한 E2E테스트를 Shared 폴더에 따로 구축을 하며 공통으로 사용되는 테스트 리소스를 중앙에서 관리할 수 있도록 하였습니다.
