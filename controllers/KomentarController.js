const Komentar = require("../models/komentar");

class KomentarController {
    index(req, res) {
        Komentar.getAll((err, results) => {
            if (err) return res.status(500).json({ message: "Gagal ambil data" });
            res.json({ message: "Daftar Komentar", data: results });
        });
    }

    show(req, res) {
        const id = req.params.id;
        Komentar.getById(id, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    }

    store(req, res) {
        const data = req.body;
        Komentar.create(data, (err, results) => {
            if (err) {

                return res.status(500).json({
                    message: "Gagal mengirim komentar",
                    error: err.message
                });
            }
            res.status(201).json({ message: "Komentar berhasil dikirim", data });
        });
    }
    
    destroy(req, res) {
        const { id } = req.params;
        Komentar.delete(id, (err) => {
            if (err) return res.status(500).json({ message: "Gagal hapus komentar" });
            res.json({ message: "Komentar dihapus" });
        });
    }
}

module.exports = new KomentarController();