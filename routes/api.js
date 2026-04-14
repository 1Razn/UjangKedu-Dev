const UserController = require('../controllers/UserController');
const KomentarController = require('../controllers/KomentarController');
const WishlistController = require('../controllers/WishlistController');
const LaporanController = require('../controllers/LaporanController');
const KategoriPropertiController = require('../controllers/KategoriPropertiController');
const PropertiController = require('../controllers/PropertiController');
const PaketIklanController = require('../controllers/PaketIklanController');

const express = require("express");
const PaketIklanController = require('../controllers/PaketIklanController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello Express");
});

router.get("/user", UserController.index);
router.get("/user/:id", UserController.show);
router.post("/user", UserController.store);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.destroy);

router.get("/komentar", KomentarController.index);
router.get("/komentar/:id", KomentarController.show);
router.post("/komentar", KomentarController.store);
router.put("/komentar/:id", KomentarController.update);
router.delete("/komentar/:id", KomentarController.destroy);

router.get("/wishlist", WishlistController.index);
router.get("/wishlist/:id", WishlistController.show);
router.post("/wishlist", WishlistController.store);
router.put("/wishlist/:id", WishlistController.update);
router.delete("/wishlist/:id", WishlistController.destroy);

router.get("/laporan", LaporanController.index);
router.get("/laporan/:id", LaporanController.show);
router.post("/laporan", LaporanController.store);
router.delete("/laporan/:id", LaporanController.destroy);

router.get("/kategori_properti", KategoriPropertiController.index);
router.get("/kategori_properti/:id", KategoriPropertiController.show);
router.post("/kategori_properti", KategoriPropertiController.store);
router.put("/kategori_properti/:id", KategoriPropertiController.update);
router.delete("/kategori_properti/:id", KategoriPropertiController.destroy);

router.get("/properti", PropertiController.index);
router.get("/properti/:id", PropertiController.show);
router.post("/properti", PropertiController.store);
router.put("/properti/:id", PropertiController.update);
router.delete("/properti/:id", PropertiController.destroy);

router.get("/iklan", PaketIklanController.index); 
router.get("/iklan/:id", PaketIklanController.show);
router.post("/iklan", PaketIklanController.store);
router.put("/iklan/:id", PaketIklanController.update);
router.delete("/iklan/:id", PaketIklanController.destroy);

module.exports = router;