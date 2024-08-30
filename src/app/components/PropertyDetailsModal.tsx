import React from "react";

interface PropertyDetailsModalProps {
  property: any;
  onClose: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <p>{property.description}</p>
        <p className="text-xl font-bold mt-4">${property.price} / night</p>
        <p className="text-sm text-gray-500">Booking Date: {property.bookingDate}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
