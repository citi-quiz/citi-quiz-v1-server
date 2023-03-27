const Pig = require('pigcolor');
const SubCategory = require('../../modules/setcategory');

exports.createSetCategory = (req, res) => {
    Pig.box("CREATE: Set Category");
    const newSubCategory = new SubCategory();
    newSubCategory.name = req.body.name;
    newSubCategory.save()
        .then((cate, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                cate: cate
            })
        })
        .catch((err) => {
            return res.json({
                error: err
            })
        });
}

exports.updateSetCategory = (req, res) => {
    Pig.box("UDATE: Set Category");
    SubCategory.findById({ _id: req.body.cateid })
        .then((cate, err) => {
            if (err)
                return res.status(400).json({
                    error: err
                })
            cate.name = req.body.name;
            cate.save().then((newcate, err) => {
                if (err)
                    return res.json({
                        cate: cate
                    })
                return res.json({
                    newcate: newcate
                })
            })
        }).catch(err => {
            return res.status(400).json({
                error: err
            })
        });
}

exports.deleteSetCategory = (req, res) => {
    Pig.box("DELETE: Set Category");
    SubCategory.findByIdAndDelete({ _id: req.body.cateid })
        .then((cate, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                cate: cate
            })
        }).catch(err => {
            return res.status(400).json({
                error: err
            })
        });
    // TODO: Fix Deleteing Issue

}

exports.getAllSubCategory = (req, res) => {
    Pig.box("GET ALL: Sub Category");
    SubCategory.find({})
        .then((allsubcategory, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                cate: allsubcategory
            })
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            })
        });

}

exports.getASubCategory = (req, res) => {
    Pig.box("GET A: Sub Category");
    const subcategoryId = req.params.subcategoryId;
    SubCategory.findById({ _id: subcategoryId })
        .then((subcategory, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                cate: subcategory
            })
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            })
        });
}