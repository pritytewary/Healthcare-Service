"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HealthcareServicesApp = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [editingService, setEditingService] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const savedServices = localStorage.getItem("healthcareServices");
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("healthcareServices", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    setFormError("");
  }, [editingService]);

  const validateForm = (service) => {
    if (!service.name || !service.description || !service.price) {
      setFormError("All fields are required.");
      return false;
    }
    setFormError("");
    return true;
  };

  const addService = (e) => {
    e.preventDefault();
    if (!validateForm(newService)) {
      return;
    }
    setServices([...services, { ...newService, id: Date.now() }]);
    setNewService({ name: "", description: "", price: "" });
  };

  const updateService = (e) => {
    e.preventDefault();
    if (!validateForm(editingService)) {
      return;
    }
    setServices(
      services.map((service) =>
        service.id === editingService.id ? editingService : service
      )
    );
    setEditingService(null);
  };

  const deleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-indigo-800 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Healthcare Services
          </span>
        </h1>

        <form
          onSubmit={editingService ? updateService : addService}
          className="mb-12 bg-white p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-semibold mb-6 text-indigo-700">
            {editingService ? "Edit Service" : "Add New Service"}
          </h2>
          {formError && <p className="text-red-500 mb-4">{formError}</p>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Service Name"
                value={editingService ? editingService.name : newService.name}
                onChange={(e) =>
                  editingService
                    ? setEditingService({
                        ...editingService,
                        name: e.target.value,
                      })
                    : setNewService({ ...newService, name: e.target.value })
                }
                className="w-full p-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
                required
              />
              <label className="absolute text-sm text-indigo-500 -top-2.5 left-2 px-1 bg-white">
                Service Name
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Description"
                value={
                  editingService
                    ? editingService.description
                    : newService.description
                }
                onChange={(e) =>
                  editingService
                    ? setEditingService({
                        ...editingService,
                        description: e.target.value,
                      })
                    : setNewService({
                        ...newService,
                        description: e.target.value,
                      })
                }
                className="w-full p-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
                required
              />
              <label className="absolute text-sm text-indigo-500 -top-2.5 left-2 px-1 bg-white">
                Description
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Price"
                value={editingService ? editingService.price : newService.price}
                onChange={(e) =>
                  editingService
                    ? setEditingService({
                        ...editingService,
                        price: e.target.value,
                      })
                    : setNewService({ ...newService, price: e.target.value })
                }
                className="w-full p-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
                required
              />
              <label className="absolute text-sm text-indigo-500 -top-2.5 left-2 px-1 bg-white">
                Price
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300 flex items-center justify-center w-full md:w-auto"
          >
            {editingService ? (
              <Edit2 className="mr-2" size={18} />
            ) : (
              <Plus className="mr-2" size={18} />
            )}
            {editingService ? "Update Service" : "Add Service"}
          </button>
        </form>

        <AnimatePresence>
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg mb-6 hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-indigo-800">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingService(service)}
                    className="text-indigo-500 hover:text-indigo-700 transition duration-300"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center bg-indigo-100 px-4 py-2 rounded-full">
                <DollarSign size={18} className="text-indigo-600 mr-1" />
                <span className="text-xl font-bold text-indigo-600">
                  {service.price}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HealthcareServicesApp;
