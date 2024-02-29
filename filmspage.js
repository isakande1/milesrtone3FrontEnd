import React, { useState, useEffect } from 'react';


export default function SearchFilm() {
    const [queryResult, setQueryResult] = useState([]);
    const [itemSearched, setItemSearched] = useState("");
    const [option, setOption] = useState(1);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        fetchData();
        console.log(queryResult);
    }, []);
    const fetchData = async () => {
        const response = await fetch('/searchFilmQuery');
        const result = await response.json();
        setQueryResult(result);
    }

    const HandleClick =  async(title)=>{
      const detailsResult = await fetch('/requestDetails',{
           method: 'POST',
           headers:{
            'content-Type' : 'application/json'
           },
           body: JSON.stringify(title)
      });
      const detailsJsonResult = await detailsResult.json();
      setDetails(detailsJsonResult);
      setSelectedFilm(title);
    }

    const fileterdItems = queryResult.filter(item => item[option].includes(itemSearched));
    return (
        <div className='optionSearch'>
        <div className='search'>
            <label>Search</label>
            <input type="text" onChange={e => setItemSearched(e.target.value)} />
            <ul>
                {itemSearched != "" && fileterdItems.map(value => 
               <>
               <p onClick={ () =>HandleClick(value[0])}>{value[0]}</p>
               
                {selectedFilm == value[0] && <div className='filmdetails'>
            <div className='queryRowsDetailsF'> <h5 className='paragraph'>Film_id</h5> <h5 className='paragraph'>Title</h5> <h5 className='paragraphgenre'>Genre </h5> </div>
             {details.map((detailsItem) => (
              <div className='queryRowsDetailsF' key={detailsItem[0]}> <p className='paragraphDetails'>{detailsItem[0]}</p><p className='paragraphDetails'>{detailsItem[1]}</p><p className='paragraphDetailsgenre'>{detailsItem[2]}</p></div>
            ))} </div>}</>
            )}

            </ul>
        </div>
        <div> 
          <input type ='radio' name="option" value = '0' onChange={e=>setOption(Number(e.target.value))}/>filmName
          <input type ='radio' name='option' value = '1' onChange={e=>setOption(Number(e.target.value))}/>firstName
          <input type ='radio' name='option' value = '2' onChange={e=>setOption(Number(e.target.value))}/>lastName
          <input type ='radio' name='option' value = '3' onChange={e=>setOption(Number(e.target.value))}/>genreName
         </div>
       
        </div>
    );
}

