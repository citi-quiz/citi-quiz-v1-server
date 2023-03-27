const Pig = require('pigcolor');
const SubCategory = require('../../modules/setcategory');

exports.createSetCategory = (req, res) => {
    Pig.box("CREATE: Set Category");
    const newSubCategory = new SubCategory();
    newSubCategory.name = req.body.subcategory;
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
    SubCategory.findById({ id: req.body.cateid })
        .then((cate, err) => {
            if (err)
                return res.status(400).json({
                    error: err
                })
            return res.json({
                cate: cate
            })
        }).catch(err => {
            return res.status(400).json({
                error: err
            })
        });
}

exports.deleteSetCategory = (req, res) => {
    Pig.box("DELETE: Set Category");
}