import { useState } from "react";
import bg from "./assets/bg.jpg";
const App = () => {
  const [city, setcity] = useState("");
  const [loading, setloading] = useState(false);
  const [location, setLocation] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState("");
  const API_KEY = "e9eaa1f26ab89b729427e0d532d6a4c7";
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

  const getWeather = async () => {
    try {
      setloading(true);
      const fullUrl = `${baseUrl}q=${city}&units=metric&appid=${API_KEY}`;
      const res = await fetch(fullUrl);
      const data = await res.json();
      console.log(data);
      if (data.cod == "404") {
        setError(data.message + " !");
      }
      setLocation(data.name);
      setWindSpeed(`${data.wind.speed} KPH`);
      setHumidity(data.main.humidity);
      setFeelsLike(data.main.feels_like);
      setTemp(data.main.temp);
      setWeather(data.weather[0].main);
      console.log(data);
      setloading(false);
      setError("");
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  return (
    <div
      className="h-screen bg-no-repeat bg-cover bg-black bg-opacity-85 relative bg-center flex items-center justify-center "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="rounded-2xl p-4 bg-gray-900 w-[500px] h-[500px] bg-opacity-55 flex flex-col">
        <header className="flex gap-2 items-center justify-center">
          <input
            value={city}
            onChange={(e) => setcity(e.target.value)}
            type="text"
            placeholder="Enter a city"
            className="py-1 px-3 rounded-full"
          />
          <div className="w-28 flex items-center justify-center">
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-200 animate-spin  fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                className={` text-white rounded-md py-1 px-3 ${
                  city ? `bg-blue-500 hover:to-blue-600` : `bg-gray-400`
                }`}
                disabled={!city}
                onClick={getWeather}
              >
                Get weather
              </button>
            )}
          </div>
        </header>
        <div className="flex-1 text-white  flex text-3xl font-bold flex-col items-center justify-center gap-10">
          <p className="text-red-400">{error}</p>
          <div className="flex gap-5 items-center ">
            <h2 className="text-2xl">{location}</h2>
            <p>{temp}</p>
          </div>
          <p className="font-bold">{weather}</p>
        </div>
        <div className="flex items-center justify-between text-white font-semibold ">
          <div className="text-center">
            <p>{feelsLike}</p>
            <p>Feels Like</p>
          </div>
          <div className="text-center">
            <p>{humidity}</p>
            <p>Humidity</p>
          </div>
          <div className="text-center">
            <p>{windSpeed}</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
