const UsersRelations = require('../model/usersRelations.model');

const getLikesByTenentId = async (tenentId) => {
    try {
        return await UsersRelations.find({ tenent: tenentId, status: "pending" });
    } catch (err) {
        throw new Error('Error getting liked apartments: ' + err.message);
    }
}

const getMatchesByTenentId = async (tenentId) => {
    try {
        return await UsersRelations.find({ tenent: tenentId, status: "approved" });
    } catch (err) {
        throw new Error('Error getting matched apartments: ' + err.message);
    }
}

const getLikesByApartmentId = async (apartmentId) => {
    try {
        return await UsersRelations.find({ apartment: apartmentId, status: "pending" });
    } catch (err) {
        throw new Error('Error getting likes of apartment: ' + err.message);
    }
}

const getMatchesByApartmentId = async (tenentId) => {
    try {
        return await UsersRelations.find({ apartment: apartmentId, status: "approved" });
    } catch (err) {
        throw new Error('Error getting matches of apartment: ' + err.message);
    }
}

const likeApartment = async (tenentId, apartmentId) => {
    try {
        const relation = await UsersRelations.findOne({ apartment: apartmentId, tenent: tenentId });
        // if the relation already exist it delete the relation
        if (!relation) {
            const newRelation = new UsersRelations({
                tenant: tenentId,
                apartment: apartmentId,
                status: 'pending',
                relation: 'match'
            })
            return await newRelation.save();
        } else {
            return;
        }
    } catch (err) {
        throw new Error('Error create a like/unlike: ' + err.message);
    }
}

const matchTenent = async (tenentId, apartmentId) => {
    try {
        const relation = await UsersRelations.findOne({ apartment: apartmentId, tenent: tenentId });
        return await UsersRelations.findByIdAndUpdate({status: "approved"})
    } catch (err) {
        throw new Error('Error match tenent: ' + err.message);
    }
}

const declineTenet = async (tenentId, apartmentId) => {
    try {
        const relation = await UsersRelations.findOne({ apartment: apartmentId, tenent: tenentId });
        return await UsersRelations.findByIdAndUpdate({status: "declined"})
    } catch (err) {
        throw new Error('Error decline tenent: ' + err.message);
    }
}

module.exports = {
    getLikesByTenentId,
    getMatchesByTenentId,
    getLikesByApartmentId,
    getMatchesByApartmentId,
    likeApartment,
    matchTenent,
    declineTenet
};