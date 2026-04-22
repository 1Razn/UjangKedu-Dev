const UserController = require('../controllers/UserController');
const KomentarController = require('../controllers/KomentarController');
const WishlistController = require('../controllers/WishlistController');
const LaporanController = require('../controllers/LaporanController');
const KategoriPropertiController = require('../controllers/KategoriPropertiController');
const PropertiController = require('../controllers/PropertiController');
const PaketIklanController = require('../controllers/PaketIklanController');

const express = require("express");
const router = express.Router();

const authRoutes = require('./auth');
const authenticateToken = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.use('/auth', authRoutes);

router.get('/', (req, res) => {
    res.send("Hello Express");
});

router.get("/user", authenticateToken, authorize('Admin'), UserController.index);
router.get("/user/:id", authenticateToken, UserController.show);
router.post("/user", UserController.store);
router.put("/user/:id", authenticateToken, UserController.update);
router.delete("/user/:id", authenticateToken, authorize('Admin'), UserController.destroy);

router.get("/komentar", KomentarController.index);
router.get("/komentar/:id", KomentarController.show);
router.post("/komentar", authenticateToken, KomentarController.store);
router.delete("/komentar/:id", authenticateToken, KomentarController.destroy);

router.get("/wishlist", authenticateToken, WishlistController.index);
router.get("/wishlist/:id", authenticateToken, WishlistController.show);
router.post("/wishlist", authenticateToken, WishlistController.store);
router.delete("/wishlist/:id", authenticateToken, WishlistController.destroy);

router.get("/laporan", authenticateToken, authorize('Admin'), LaporanController.index);
router.get("/laporan/:id", authenticateToken, LaporanController.show);
router.post("/laporan", authenticateToken, LaporanController.store);
router.delete("/laporan/:id", authenticateToken, authorize('Admin'), LaporanController.destroy);

router.get("/kategori_properti", KategoriPropertiController.index);
router.get("/kategori_properti/:id", KategoriPropertiController.show);
router.post("/kategori_properti", authenticateToken, authorize('Admin'), KategoriPropertiController.store);
router.put("/kategori_properti/:id", authenticateToken, authorize('Admin'), KategoriPropertiController.update);
router.delete("/kategori_properti/:id", authenticateToken, authorize('Admin'), KategoriPropertiController.destroy);

router.get("/properti", PropertiController.index);
router.get("/properti/:id", PropertiController.show);        
router.post("/properti", authenticateToken, PropertiController.store);
router.put("/properti/:id", authenticateToken, PropertiController.update);
router.delete("/properti/:id", authenticateToken, PropertiController.destroy);

router.get("/iklan", PaketIklanController.index); 
router.get("/iklan/:id", PaketIklanController.show);
router.post("/iklan", authenticateToken, authorize('Admin'), PaketIklanController.store);
router.put("/iklan/:id", authenticateToken, authorize('Admin'), PaketIklanController.update);
router.delete("/iklan/:id", authenticateToken, authorize('Admin'), PaketIklanController.destroy);

module.exports = router;