import React, { useState, useEffect } from "react";
import axios from "axios";

const InternationalPhoneInput = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCode, setSelectedCode] = useState("+1"); // Default to US code
  const [phoneNumber, setPhoneNumber] = useState("");

  // Fetch country data from the API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryData = response.data.map((country) => ({
          name: country.name.common,
          code: country.idd.root
            ? country.idd.root + (country.idd.suffixes?.[0] || "")
            : "",
          flag: country.flags?.png || "",
        }));
        setCountries(countryData.filter((country) => country.code));
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCodeChange = (e) => {
    setSelectedCode(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <div>
      <label htmlFor="phone-input" className="block mb-2 font-bold">
        Phone Number
      </label>
      <div className="flex items-center">
        {/* Dropdown for country flags */}
        <select
          value={selectedCode}
          onChange={handleCodeChange}
          className="border border-gray-300 rounded-l px-2 py-1"
          style={{ backgroundSize: "20px 15px", backgroundRepeat: "no-repeat" }}
        >
          {countries.map((country) => (
            <option
              key={country.code}
              value={country.code}
              style={{
                backgroundImage: `url(${country.flag})`,
                backgroundPosition: "left center",
                paddingLeft: "24px",
              }}
            >
              {country.code}
            </option>
          ))}
        </select>

        {/* Input field for phone number */}
        <input
          id="phone-input"
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="Enter your phone number"
          className="border border-gray-300 rounded-r px-2 py-1 flex-grow"
        />
      </div>
      <p className="mt-2">
        Full Phone Number: <strong>{selectedCode + phoneNumber}</strong>
      </p>
    </div>
  );
};

export default InternationalPhoneInput;
