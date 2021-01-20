const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post("/favoriteNumber", (req, res) => {
    // mongoDB에서 Favorite 숫자 가져오기
    Favorite.find({ "movieId" : req.body.movieId })
        .exec((err, info) => {
            if(err) return res.status(400).send(err);
            // front에 다시 숫자정보 보내주기
            return res.status(200).json({ success: true, favoriteNumber: info.length });
        }) 
})

router.post("/favorited", (req, res) => {
    // 내가 이 영화를 Favorite List에 넣었는지 정보를 DB에서 가져오기
    // mongoDB에서 Favorite 숫자 가져오기
    Favorite.find({ "movieId" : req.body.movieId , "userFrom" : req.body.userFrom})
        .exec((err, info) => {
            if(err) return res.status(400).send(err);
            // front에 다시 숫자정보 보내주기

            let result = false;
            if(info.length !== 0) {
                result = true;
            }

            return res.status(200).json({ success: true, favoriteNumber: result });
        }) 
})

router.post("/addFavorite", (req, res) => {
    // 인스턴스 생성
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({ success: true });
    })
})

router.post("/cancelFavorite", (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, doc })
        })
})

router.post("/getFavorited", (req, res) => {
    Favorite.find({ "userFrom": req.body.userFrom })
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, favorites })
        })
})

router.post("/deleteFavorite", (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, result) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true })
        })
})


module.exports = router;