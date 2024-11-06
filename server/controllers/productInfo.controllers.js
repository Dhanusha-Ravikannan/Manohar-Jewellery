
const express = require('express')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


const getAllProducts = async (req,res) => {
    try {
        const getProducts  = await prisma.product_info.findMany()
        res.status(200).json(getProducts)
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "No Products found"})
    }
}

const createNewProduct = async (req, res) => {
    try {
        const { weight_attribute_1, weight_attribute_2, weight_attribute_3, weight_attribute_4, weight_attribute_5 } = req.body;

        const latestProduct = await prisma.product_info.findFirst({
            orderBy: {
                created_at: 'desc'
            }
        });

        let newSerialNumber;

        if (latestProduct) {
            const lastSerialNumber = latestProduct.serial_number;
            const lastLetter = lastSerialNumber.charAt(0); 
            const lastDigits = parseInt(lastSerialNumber.slice(1), 10); 

            if (lastDigits < 99) {
                
                newSerialNumber = `${lastLetter}${(lastDigits + 1).toString().padStart(2, '0')}`;
            } else {
                newSerialNumber = `${String.fromCharCode(lastLetter.charCodeAt(0) + 1)}01`;
            }
        
        } else {
            newSerialNumber = 'A01';
        }

        const newProduct = await prisma.product_info.create({
            data: {
                serial_number: newSerialNumber,
                weight_attribute_1,
                weight_attribute_2,
                weight_attribute_3,
                weight_attribute_4,
                weight_attribute_5,
                created_at: new Date(),
            }
        });

        res.status(200).json({ message: "Product Successfully Created", newProduct });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Error Creating Product" });
    }
};


const UpdatingProduct = async (req,res) => {
    try {
        const {id} = req.params;
        const {serial_number,weight_attribute_1,weight_attribute_2,weight_attribute_3,weight_attribute_4,weight_attribute_5} = req.body;
         const updateProduct = await prisma.product_info.update({
            where : {
                id : parseInt(id)
            },
            data : {
                serial_number,
                weight_attribute_1,
                weight_attribute_2,
                weight_attribute_3,
                weight_attribute_4,
                weight_attribute_5,
                updated_at : new Date()
            }
         })
         res.status(200).json({message : "Updated Successfully",updateProduct})
    } catch (error) {
       console.log(error) 
       res.status(404).json({error : "Product not Updated"})
    }
}

const deleteProduct = async (req,res) => {
    try {
        const {id} = req.params;
        const delProduct = await prisma.product_info.delete({
            where : {
                id : parseInt(id)
            },
        })
        res.status(200).json({message : "Deleted Successfully",delProduct})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "Product is not deleted"})
    }
}

const deleteAllProduct = async (req,res) => {
    try {
        const deleteAllProducts = await prisma.product_info.deleteMany();
        res.status(200).json({message : "Deleted Successfully"})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "Can't delete All Product"})
    }
} 

module.exports = {getAllProducts,createNewProduct,UpdatingProduct,deleteProduct,deleteAllProduct}