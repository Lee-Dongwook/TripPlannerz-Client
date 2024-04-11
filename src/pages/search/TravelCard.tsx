function TravelCard({ trip, onClick }) {
  return (
    <div className='card bg-white p-4 shadow rounded cursor-pointer' onClick={() => onClick(trip)}>
      <h3 className='text-lg font-semibold'>{trip.title}</h3>
      <p>Participants: {trip.capacity}</p>
      <p>
        Date: {trip.startingDate} ~ {trip.comingDate}
      </p>
    </div>
  );
}

export default TravelCard;
