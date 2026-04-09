const Laporan = require('../models/laporan');


const getLaporan = (req, res) => {
    Laporan.getAllLaporan((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};


const addLaporan = (req, res) => {
    const data = req.body;

    Laporan.createLaporan(data, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({
            message: 'Laporan berhasil ditambahkan',
            data: results
        });
    });
};


const deleteLaporan = (req, res) => {
    const id = req.params.id;

    Laporan.deleteLaporan(id, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({
            message: 'Laporan berhasil dihapus'
        });
    });
};

module.exports = {
    getLaporan,
    addLaporan,
    deleteLaporan
};