const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const RepostSchema = new mongoose.Schema({

    from: {
        type: ObjectId,
        require: true
    },
    to: {
        type: ObjectId,
        require: true
    }
});

RepostSchema.methods.toJSON = function () {
    const follow = this.toObject();
    delete follow.__v;
    return follow;
};

const RepostModel = mongoose.model("repost", RepostSchema);
module.exports = RepostModel;