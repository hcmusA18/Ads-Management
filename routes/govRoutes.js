import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/LHQC_So', (req, res) => {
    res.render('LoaihinhQC_So')
})

router.get('/BCVP_Quan', (req, res) => {
    res.render('Baocao_Quan')
})


export default router;
