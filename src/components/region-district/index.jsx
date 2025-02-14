import { useState } from "react";
import { data } from "@/data/region";

const RegionDistrictDropdown = () => {
  const regions = data.regions;
  const districts = data.districts;
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);

  const handleRegionSelect = (regionId) => {
    setSelectedRegion(regionId);
    setSelectedDistrict(null);
    const filterDistricts = districts.filter(
      (district) => district.region_id === regionId
    );
    setFilteredDistricts(filterDistricts);
    setRegionDropdownOpen(false);
  };

  const handleDistrictSelect = (districtId) => {
    setSelectedDistrict(districtId);
    setDistrictDropdownOpen(false);
  };

  const toggleDistrictDropdown = () => {
    if (filteredDistricts.length) {
      setDistrictDropdownOpen((prev) => !prev);
    }
  };

  return (
    <div className="">
      {/* Region Dropdown */}
      <div className="relative">
        <p className="mb-2 text-lg font-semibold text-gray-800">Viloyat</p>
        <button
          onClick={() => setRegionDropdownOpen((prev) => !prev)}
          className="w-full text-left border border-[#EAEFF4] px-4 py-2 rounded-md bg-white"
        >
          {selectedRegion
            ? regions.find((r) => r.id === selectedRegion)?.name
            : "Viloyatni tanlang"}
        </button>
        {regionDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md">
            {regions.map((region) => (
              <div
                key={region.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRegionSelect(region.id)}
              >
                {region.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* District Dropdown */}
      <div className="relative">
        <p className="mb-2 text-lg font-semibold text-gray-800">Hudud</p>
        <button
          onClick={toggleDistrictDropdown}
          className={`w-full text-left border border-[#EAEFF4] px-4 py-2 rounded-md bg-white ${
            !filteredDistricts.length ? "cursor-not-allowed" : ""
          }`}
          disabled={!filteredDistricts.length}
        >
          {selectedDistrict
            ? filteredDistricts.find((d) => d.id === selectedDistrict)?.name
            : filteredDistricts.length
            ? "Hududni tanlang"
            : "Hudud mavjud emas"}
        </button>
        {districtDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md max-h-60 overflow-y-auto">
            {filteredDistricts.map((district) => (
              <div
                key={district.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDistrictSelect(district.id)}
              >
                {district.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionDistrictDropdown;
