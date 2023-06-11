const UsersRelations = require('../model/usersRelations.model');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

const getLikesByTenantId = async (tenantId) => {
    try {
        return await UsersRelations.find({ tenant: tenantId, status: "pending" });
    } catch (err) {
        throw new Error('Error getting liked apartments: ' + err.message);
    }
}

const getMatchesByTenantId = async (tenantId) => {
    try {
        return await UsersRelations.find({ tenant: tenantId, status: "approved" });
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

const getMatchesByApartmentId = async (apartmentId) => {
    try {
        return await UsersRelations.find({ apartment: apartmentId, status: "approved" });
    } catch (err) {
        throw new Error('Error getting matches of apartment: ' + err.message);
    }
}

const likeApartment = async (tenantId, apartmentId) => {
    try {
        const relation = await UsersRelations.findOne({ apartment: apartmentId, tenant: tenantId });
        // if the relation already exist it delete the relation
        if (!relation) {
            const newRelation = new UsersRelations({
                tenant: tenantId,
                apartment: apartmentId,
                status: 'pending',
                relation: 'match'
            })
            return await newRelation.save();
        } else {
            await UsersRelations.findByIdAndDelete(relation._id)
            return;
        }
    } catch (err) {
        throw new Error('Error create a like/unlike: ' + err.message);
    }
}

const matchTenant = async (tenantId, apartmentId) => {
    try {
        const relation = await UsersRelations.findOne({ apartment: apartmentId, tenant: tenantId });
        return await UsersRelations.findByIdAndUpdate(relation._id, { status: "approved" }, { populate: { path: 'tenant apartment'}, returnOriginal: false});
    } catch (err) {
        throw new Error('Error match tenant: ' + err.message);
    }
}

const declineTenet = async (tenantId, apartmentId) => {
    try {
        const relation = await UsersRelations.findOne({ apartment: apartmentId, tenant: tenantId });
        return await UsersRelations.findByIdAndUpdate(relation._id, { status: "declined" }, { populate: { path: 'tenant apartment'}, returnOriginal: false});
    } catch (err) {
        throw new Error('Error decline tenant: ' + err.message);
    }
}

module.exports = {
    getLikesByTenantId,
    getMatchesByTenantId,
    getLikesByApartmentId,
    getMatchesByApartmentId,
    likeApartment,
    matchTenant,
    declineTenet
};