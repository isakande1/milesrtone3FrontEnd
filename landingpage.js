import React, { useState, useEffect } from 'react';


function App() {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState([]);
  const [actorFilm, setActorFilm] = useState([]);
  const [detailsActorFilm, setDetailsActorFilm] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedActor, setSelectedActor] = useState(null);

  useEffect(() => {
    fetchData();
    fetchActor();
    console.log(data);
    // eslint-disable-next-line 
  }, []);

  const ClickActor = async (actorId) => {
    const actorDetails = await fetch('/actorFilm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(actorId)
    });
    const detailsJsonResult = await actorDetails.json();
    setDetailsActorFilm(detailsJsonResult);
    setSelectedActor(actorId);
  }

  const HandleClick = async (filmTitle) => {
    const detailsResult = await fetch('/requestDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filmTitle)
    });
    const detailsJsonResult = await detailsResult.json();
    setDetails(detailsJsonResult);
    setSelectedFilm(filmTitle);
  }

  const fetchActor = async () => {
    const response = await fetch('/topFiveActor');
    const result = await response.json();
    setActorFilm(result);
    console.log(actorFilm);
  }

  const fetchData = async () => {
    const response = await fetch('/dat');
    const result = await response.json();
    setData(result);
  };

  return (
    <div className="App">

      <div className='halfSide'>
        <h2 className='section'>Top five rented movies</h2>
        <div className='queryRowsFilm'> <h4 className='paragraph'>Film_id</h4> <h4 className='paragraph'>Category</h4> <h4 className='paragraph'>Rented</h4> <h4 className='paragraph'>Title</h4></div>
        {data.map((item) => (
          <div key={item[0]}>
            <div className='queryRowsFilm' onClick={() => HandleClick(item[3])}>
              <p className='paragraph'>{item[0]}</p> <p className='paragraph'>{item[1]}</p> <p className='paragraph'>{item[2]}</p><p className='paragraph'>{item[3]}</p>
            </div>

            {selectedFilm == item[3] && <>
            <div className='queryRowsDetails'> <h5 className='paragraph'>Film_id</h5> <h5 className='paragraph'>Title</h5> <h5 className='paragraph'>Genre </h5> </div>
             {details.map((detailsItem) => (
              <div className='queryRowsDetails' key={detailsItem[0]}> <p className='paragraphDetails'>{detailsItem[0]}</p><p className='paragraphDetails'>{detailsItem[1]}</p><p className='paragraphDetails'>{detailsItem[2]}</p></div>
            ))} </>}

          </div>
        ))}
      </div>

      <div className='halfSide'>
        <h2 className='section'>Top 5 actors</h2>
        <p className='queryRowsActor'> <h4 className='paragraph'>Actor_id</h4><h4 className='paragraph'>First_name</h4><h4 className='paragraph'>Last_name</h4></p>
        {actorFilm.map((item) => (
          <div key={item[0]}>
            <div className='queryRowsActor' onClick={() => ClickActor(item[0])}>
            <p className='paragraph'>{item[0]}</p> <p className='paragraph'>{item[1]}</p> <p className='paragraph'>{item[2]}</p>
            </div>

            {selectedActor == item[0] && <>
            <div className='detailsRow'> <h5 className='detailsRowP'>Title</h5> <h5 className='detailsRowP'>Category</h5> <h5 className='detailsRowP'>Rented</h5></div>
              {detailsActorFilm.map((detailsItem) => (
                <div className='detailsRow' key={detailsItem[0]}> <p className='actorDetails'>{detailsItem[0]}</p><p className='actorDetails'>{detailsItem[1]}</p><p className='actorDetails'>{detailsItem[2]}</p> </div>

              ))}</>}

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
