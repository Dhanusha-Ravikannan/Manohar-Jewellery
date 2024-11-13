
// const express = require('express')
// const {PrismaClient} = require('@prisma/client')
// const prisma = new PrismaClient();


// const getAllBills = async (req,res) => {
//     try {
//         const allBills = await prisma.bills.findMany();
//         res.status(200).json(allBills)
//     } catch (error) {
//         console.log(error)
//         res.status(404).json({error : 'No bills'})
//     }
// }


// const createBills = async (req,res) => {
//     try {
            
//         const randomDigit = Math.floor(1000+ Math.random()*9000);
//         const time = Date.now();

//         const bill_number = `${randomDigit}${time}`

//         const newBill = await prisma.bills.create({
//             data : {
//                 bill_number,
//                 created_at : new Date()
//             }
//         })
//         res.status(200).json(newBill)
//     } catch (error) {
//        console.log(error)
//        res.status(404).json({error : 'No bills created '}) 
//     }
// }

// const deleteBills = async (req,res) => {
//     try {
//         const {id} = req.params;
        
//         const delBill = await prisma.bills.delete({
//             where : {
//                 id : parseInt(id)
//             }
//         })
//         res.status(200).json({message : "Deleted Successfully", delBill})
//     } catch (error) {
//         console.log(error)
//         res.status(404).json({error : "No Bills deleted"})
//     }
// }

// module.exports = {getAllBills,createBills,deleteBills}



const express = require('express')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
 
 
const getAllBills = async (req,res) => {
    try {
        const allBills = await prisma.bills.findMany();
        res.status(200).json(allBills)
    } catch (error) {
        console.log(error)
        res.status(404).json({error : 'No bills'})
    }
}
 
 
const createBills = async (req,res) => {
    try {
           
        const randomDigit = Math.floor(1000+ Math.random()*9000);
        const time = Date()
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
 
        const bill_number = `${year}-${month}-${day}----${randomDigit}`
 
 
        const newBill = await prisma.bills.create({
            data : {
                bill_number,
                created_at : new Date()
            }
        })
 
       
        res.status(200).json(newBill)
    } catch (error) {
       console.log(error)
       res.status(404).json({error : 'No bills created '})
    }
}
 
const deleteBills = async (req,res) => {
    try {
        const {id} = req.params;
       
        const delBill = await prisma.bills.delete({
            where : {
                id : parseInt(id)
            }
        })
        res.status(200).json({message : "Deleted Successfully", delBill})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "No Bills deleted"})
    }
}
 
module.exports = {getAllBills,createBills,deleteBills}