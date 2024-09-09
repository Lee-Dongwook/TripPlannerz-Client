import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import type { Trip } from "@/types/TripList";
import { getPaginatedTripList } from "@/services/getPaginatedTripList";
import { getDetailTripRoute } from "@/services/getDetailTripRoute";
import { postStartLocationToServer } from "@/services/postStartLocationToServer";

import TravelCard from "./TravelCard";
import TravelDetailDrawer from "./TravelDetailDrawer";

function SearchPage() {
  const location = useLocation();
  const token = useSelector((state: any) => state.token.token);
  const searchParams = new URLSearchParams(location.search);
  const searchedKeyword = searchParams.get("keyword");

  const [tripList, setTripList] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [selectedTripRoute, setSelectedTripRoute] = useState<any[]>([]);
  const [selectedTripUuid, setSelectedTripUuid] = useState<string>("");

  const [startLocation, setStartLocation] = useState<string>("");

  const [drawerState, setDrawerState] = useState<boolean>(false);
  const [optimizeModalState, setOptimizeModalState] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [calculateRouteLoading, setCalculateRouteLoading] =
    useState<boolean>(false);

  // API 호출: 여행 리스트 가져오기
  const fetchTripList = async () => {
    setLoading(true);
    try {
      const response = await getPaginatedTripList(token, 0, "new");
      setTripList(response.data.content);
    } catch (error) {
      console.error("Error fetching trip list:", error);
    } finally {
      setLoading(false);
    }
  };

  // API 호출: 여행 상세 정보 및 경로 가져오기
  const fetchTripRoute = async (uuid: string) => {
    try {
      const response = await getDetailTripRoute(token, uuid);
      setSelectedTripRoute(response.data);
    } catch (error) {
      console.error("Error fetching trip route:", error);
    }
  };

  // Drawer 열기
  const handleOpenDrawer = async (trip: Trip) => {
    setSelectedTrip(trip);
    if (trip.uuid) {
      setSelectedTripUuid(trip.uuid);
      await fetchTripRoute(trip.uuid);
      setDrawerState(true);
    }
  };

  // Drawer 닫기
  const handleCloseDrawer = () => {
    setDrawerState(false);
    setSelectedTrip(null);
    setSelectedTripRoute([]);
  };

  // 최적화 모달 열기
  const handleOpenOptimizeModal = () => setOptimizeModalState(true);

  // 출발지 정보 저장
  const handleSaveStartLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartLocation(e.target.value);
  };

  // 출발지 정보 서버 전송
  const handleSendStartLocationToServer = async () => {
    try {
      setCalculateRouteLoading(true);
      const response = await postStartLocationToServer(token, {
        name: startLocation,
        tripUUID: selectedTripUuid,
      });

      if (response) {
        alert("최단 경로 계산이 완료되었습니다.");
        setOptimizeModalState(false);
      }
    } catch (error) {
      console.error("Error sending start location to server:", error);
    } finally {
      setCalculateRouteLoading(false);
    }
  };

  // 검색 키워드 변경 시 리스트 업데이트
  useEffect(() => {
    fetchTripList();
  }, [searchedKeyword]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <input
              className="input input-bordered w-full"
              placeholder="Search for trips..."
              value={searchedKeyword || ""}
              readOnly
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tripList.map((trip) => (
              <TravelCard
                key={trip.id}
                trip={trip}
                onClick={handleOpenDrawer}
              />
            ))}
          </div>

          {drawerState && selectedTrip && (
            <TravelDetailDrawer
              handleCloseDrawer={handleCloseDrawer}
              selectedTripRoute={selectedTripRoute}
              handleOpenOptimizeModal={handleOpenOptimizeModal}
              optimizeModalState={optimizeModalState}
              startLocation={startLocation}
              handleSaveStartLocation={handleSaveStartLocation}
              calculateRouteLoading={calculateRouteLoading}
              handleSendStartLocationToServer={handleSendStartLocationToServer}
            />
          )}
        </>
      )}
    </>
  );
}

export default SearchPage;
