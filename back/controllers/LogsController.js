const Log = require('../models/Log');
exports.getLogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Page number, default is 1
        const limit = parseInt(req.query.limit) || 10; // Number of documents per page, default is 10

        const skip = (page - 1) * limit; // Number of documents to skip

        const totalLogsCount = await Log.countDocuments(); // Total number of logs

        const logs = await Log.find({}, { __v: 0, _id: 0 })
                                .skip(skip)
                                .limit(limit);

        return res.json({
            currentPage: page,
            totalPages: Math.ceil(totalLogsCount / limit),
            totalLogsCount: totalLogsCount,
            logs
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
