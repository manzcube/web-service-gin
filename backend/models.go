package main

import "go.mongodb.org/mongo-driver/bson/primitive"

type product struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name     string             `json:"name" json:"name"`
	Price    float64            `bson:"price" json:"price"`
	Quantity int                `bson:"qty" json:"qty"`
	Foreign  bool               `bson:"foreign" json:"foreign"`
}
