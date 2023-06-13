const Apartment = require('../model/apartment.model');
const Storage = require('./firebase-storage.service');

const createApartment = async (apartmentData) => {
  try {
    let base64Images = apartmentData.images;
    apartmentData.images = [];
    const apartment = new Apartment(apartmentData);
    const newApartment = await apartment.save();
    const imagesUrl = await Storage.uploadApartmentImages(newApartment._id.toString(),base64Images);
    return await Apartment.findByIdAndUpdate(newApartment._id, { images: imagesUrl }, { populate: { path: 'user'}, returnOriginal: false})
  } catch (err) {
    throw new Error('Error creating apartment: ' + err.message);
  }
};

const getApartments = async () => {
  try {
    return await Apartment.find().populate('user', '-password');
  } catch (err) {
    throw new Error('Error getting apartments: ' + err.message);
  }
};

const getApartment = async (id) => {
  try {
    return await Apartment.findById(id).populate('user', '-password');
  } catch (err) {
    throw new Error('Error getting apartment: ' + err.message);
  }
};

const updateApartment = async (id, apartmentData) => {
  try {
    const apartment = await Apartment.findById(id);
    return await apartment.save();
  } catch (err) {
    throw new Error('Error updating apartment: ' + err.message);
  }
};

const deleteApartment = async (id) => {
  try {
    return await Apartment.findByIdAndRemove(id);
  } catch (err) {
    throw new Error('Error deleting apartment: ' + err.message);
  }
};

module.exports = {
  createApartment,
  getApartments,
  getApartment,
  updateApartment,
  deleteApartment,
};