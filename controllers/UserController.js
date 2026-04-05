const User = require('../models/user');
class UserController {
    index(req, res) {
        User.getAll((err, result) => {
            if (err) {
                return res.json({message: 'Gagal mengambil data'});
            } else {
                return res.json({message: 'Berhasil mengambil data', data: result});
            }
        });
    }

    show(req, res) {
        const { id } = req.params;
        User.getById(id, (err, result) => {
            if (err) {
                return res.json({message: 'Gagal mengambil data'});
            } 
            res.json({message: 'Detail User', data: result[0]});
        });
    }

    store(req, res) {
        res.send("Add new User");
    }

    update(req, res) {
        const { id } = req.params;
        res.send(`Update User Id ${id}`);
    }

    destroy(req, res) {
        const { id } = req.params;
        res.send(`Delete User Id ${id}`);
    }
}

const object = new UserController();

module.exports = object;