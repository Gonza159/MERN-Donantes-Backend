const { response } = require('express');
const Donante = require('../models/Donante');

const getDonantes = async( req, res = response ) => {

    const donantes = await Donante.find()
                                .populate('user','name');

    res.json({
        ok: true,
        donantes
    });
}

const crearDonante = async ( req, res = response ) => {

    const donante = new Donante( req.body );

    try {

        donante.user = req.uid;
        
        const donanteGuardado = await donante.save();

        res.json({
            ok: true,
            donante: donanteGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarDonante = async( req, res = response ) => {
    
    const donanteId = req.params.id;
    const uid = req.uid;

    try {

        const donante = await Donante.findById( donanteId );

        if ( !donante ) {
            return res.status(404).json({
                ok: false,
                msg: 'Donante no existe por ese id'
            });
        }

        // Quitar esto si no queremos que solo el mismo usuario que creo el Donante pueda modificarlo 
        if ( donante.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este Donante'
            });
        }

        const nuevoDonante = {
            ...req.body,
            user: uid
        }

        const donanteActualizado = await Donante.findByIdAndUpdate( donanteId, nuevoDonante, { new: true } );

        res.json({
            ok: true,
            donante: donanteActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarDonante = async( req, res = response ) => {

    const donanteId = req.params.id;
    const uid = req.uid;

    try {

        const donante = await Donante.findById( donanteId );

        if ( !donante ) {
            return res.status(404).json({
                ok: false,
                msg: 'Donante no existe por ese id'
            });
        }

        if ( donante.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este Donante'
            });
        }


        await Donante.findByIdAndDelete( donanteId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getDonantes,
    crearDonante,
    actualizarDonante,
    eliminarDonante
}