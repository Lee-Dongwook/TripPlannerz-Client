function TravelDetailDrawer({
  handleCloseDrawer,
  selectedTripRoute,
  handleOpenOptimizeModal,
  optimizeModalState,
  startLocation,
  handleSaveStartLocation,
  calculateRouteLoading,
  handleSendStartLocationToServer,
}) {
  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
      <div className='relative top-20 mx-auto p-5 border 2-96 shadow-lg rounded-md bg-white'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>Trip Details</h2>
          <button onClick={handleCloseDrawer}>X</button>
        </div>
        <div>
          <p>
            <strong>Route: </strong>
          </p>
          <ul>
            {selectedTripRoute!.map((route, idx) => (
              <li key={idx}>{route.name}</li>
            ))}
          </ul>
        </div>
        <button className='btn btn-primary my-2' onClick={handleOpenOptimizeModal}>
          Optimize Route
        </button>
        {optimizeModalState && (
          <>
            <input
              type='text'
              placeholder='Enter start location'
              value={startLocation}
              onChange={handleSaveStartLocation}
              className='input input-bordered w-full my-2'
            />
            <button
              className={`btn ${calculateRouteLoading ? 'loading' : ''}`}
              onClick={handleSendStartLocationToServer}
            >
              Calculate Route
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TravelDetailDrawer;
