const Pig = require('pigcolor');
const Sets = require('../modules/sets');

exports.createSets = (req, res) => {
    Pig.box("CREATE: Sets");
    const newSets = Sets();
    newSets.setId = req.body.setId;
    newSets.setName = req.body.setName;
    newSets.setDescription = req.body.setDescription;
    newSets.setCategory = req.body.setCategory;
    newSets.setTitle = req.body.setTitle;
    newSets.setDifficulty = req.body.setDifficulty;
    newSets.setikes = req.body.setikes;
    newSets.setQuestions = req.body.setQuestions;
    newSets.save()
        .then((sets, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                sets: sets
            })
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            })
        })
}

exports.updateSets = (req, res) => {
    Pig.box("UPDATE: Sets");
    Sets.findById({ _id: req.body.sId })
        .then((sets, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            sets.setId = req.body.setId;
            sets.setName = req.body.setName;
            sets.setDescription = req.body.setDescription;
            sets.setCategory = req.body.setCategory;
            sets.setTitle = req.body.setTitle;
            sets.setDifficulty = req.body.setDifficulty;
            sets.setikes = req.body.setikes;
            sets.setQuestions = req.body.setQuestions;
            sets.save()
                .then((newsets, err) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        });
                    }
                    return res.json({
                        sets: newsets
                    })
                })
                .catch((err) => {
                    return res.status(400).json({
                        error: err
                    });
                });

        }).catch(err => {
            return res.status(400).json({
                error: err
            });
        });
}

exports.deleteSets = (req, res) => {
    Pig.box("DELETE: Sets");
    Sets.findByIdAndDelete({ _id: req.params.sId })
        .then((newsets, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.json({
                sets: newsets
            })
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        });
}

exports.getAllSets = (req, res) => {
    Pig.box("GET All: Sets");
    Sets.find({})
        .then((allSets, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.json({
                sets: allSets
            })
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });;
        })
}

exports.getASets = (req, res) => {
    Pig.box("GET A: Sets");
    Sets.findById({ _id: req.params.sId })
        .then((allSets, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.json({
                sets: allSets
            })
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });;
        })
}

exports.getAllSetsByCategory = (req, res) => {
    Pig.box("GET ALL BY: Category");
    Sets.find({ setCategory: req.params.categoryId })
        .then((allSets, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.json({
                allSets: allSets
            })
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            })
        });
}