import { useEffect, useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import axios from "axios";
import $ from 'jquery'

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedTour, setExpandedTour] = useState(null); 

  useEffect(() => {
    const getTours = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://www.course-api.com/react-tours-project");
        setTours(response.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    getTours();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TbLoader2 className="animate-spin text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        {error}
      </div>
    );
  }

  const toggleTourInfo = (id) => {
    if (expandedTour === id) {
      setExpandedTour(null); 
    } else {
      setExpandedTour(id); 
    }
  };
  const handleDeleteProduct = (id) => {
  
    setTours(tours.filter((tour) => tour.id !== id));
  };

  return (
    <div className="container mx-auto p-4 place-items-center">
      <h1 className="text-3xl font-bold text-center mb-6">Our Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg "
          >
            <a href="#">
              <img
                className="rounded-t-lg h-56 object-cover w-full"
                src={tour.image}
                alt={tour.name}
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
                  {tour.name}
                </h5>
              </a>
              <p className="mb-3 font-normal  text-green-500">{tour.price}$</p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {tour.info.substring(0,100)}
                {expandedTour === tour.id ? tour.info : $`{tour.info.substring(0, 100)}...`}
                
              </p>
              <button
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center w-full my-3 text-green-500 px-4 py-2 "
                onClick={() => toggleTourInfo(tour.id)} 
              >
                {expandedTour === tour.id ? 'Read less' : 'Read more'}
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
              <button
              onClick={() => handleDeleteProduct(tour.id)}
              className="w-full my-3 border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white "
            >
              Delete
            </button>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tours;