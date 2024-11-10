import "./Css/PlantCareGuide.module.css";

// import { FaTint, FaSun, FaLeaf } from 'react-icons/fa'; // Install react-icons package

// const icons = {
//   Watering: <FaTint />,
//   Sunlight: <FaSun />,
//   Soil: <FaLeaf />,
// };

const PlantCareGuide = ({ careGuide }: { careGuide: { feature: string, details: string }[] }) => {
  return (
    <div className="care-panel">
      {careGuide.map((item, index) => (
        <div key={index} className="care-section items-start">
          <div className="icon">{[item.feature]}</div>
          <div className="details">
            <h3>{item.feature}</h3>
            <p>{item.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlantCareGuide;