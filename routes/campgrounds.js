const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
    // .post(upload.array('image'), (req,res) => {
    //     console.log(req.body, req.files);
    //     res.send("IT Worked!")
    // })

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor,  upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))



module.exports = router;
// const express = require('express');
// const router = express.Router();
// const catchAsync = require('../utils/catchAsync');
// const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

// const Campground = require('../models/campground');

// // const validateCampground = (req, res, next) => {
// //     const { error } = campgroundSchema.validate(req.body);
// //     if (error) {
// //         const msg = error.details.map(el => el.message).join(',')
// //         throw new ExpressError(msg, 400)
// //     } else {
// //         next();
// //     }
// // }
// router.get('/', catchAsync(async (req, res) => {
// const campgrounds = await Campground.find({});
// res.render('campgrounds/index', { campgrounds })
// }));
// // app.get('/makecampground', async (req, res) => {
// //     const camp = new Campground({title: 'My Backyard', description: 'cheap camping!'});
// //     await camp.save();
// //     res.send(camp)
// // })

// router.get('/new',isLoggedIn, (req, res) => {
//     res.render('campgrounds/new');
// })

// router.post('/', validateCampground, catchAsync(async (req, res, next) => { //creating new campground
//     //if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
//     const campground = new Campground(req.body.campground);
//     campground.author = req.user._id;
//     await campground.save();
//     req.flash('success', 'Successfully made a new campground!');
//     res.redirect(`/campgrounds/${campground._id}`)
// }))

// router.get('/:id', catchAsync(async (req, res,) => {
//     const campground = await Campground.findById(req.params.id).populate({
//         path: 'reviews',
//         populate: {
//             path: 'author'
//         }
//     }).populate('author');
//     console.log(campground);
//     console.log('campground');
//     if (!campground) {
//         req.flash('error', 'Cannot find that campground!');
//         return res.redirect('/campgrounds');
//     }
//     res.render('campgrounds/show', { campground });
// }));

// router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(async (req, res) => {
//     const campground = await Campground.findById(req.params.id);
//     if (!campground) {
//         req.flash('error', 'Cannot find that campground!');
//         return res.redirect('/campgrounds');
//     }
//     res.render('campgrounds/edit', { campground });
// }));

// router.put('/:id',isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => { //updating campground
//     const { id } = req.params;
//     const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
//     req.flash('success', 'Successfully updated campground!');
//     res.redirect(`/campgrounds/${campground._id}`)
// }));

// router.delete('/:id',isLoggedIn, isAuthor, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     await Campground.findByIdAndDelete(id);
//     req.flash('success', 'Successfully deleted campground')
//     res.redirect('/campgrounds');
// }));

// module.exports = router