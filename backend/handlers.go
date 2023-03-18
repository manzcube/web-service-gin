package main

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func getProducts(c *gin.Context, client *mongo.Client) {
	collection := client.Database("gin").Collection("products")

	// define a filter to match all documents
	filter := bson.M{}

	// execute the find query and get a cursor over te results
	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error on find": err.Error()})
		return
	}

	// If success, iterate over the docs and insert them into a slice
	var results []bson.M
	if err := cursor.All(context.Background(), &results); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// CORS
	// c.Header("Access-Control-Allow-Origin", "http://localhost:3000")

	// return the results as JSON
	c.IndentedJSON(http.StatusOK, results)
}

func getOneProduct(c *gin.Context, client *mongo.Client) {
	collection := client.Database("gin").Collection("products")

	// Get the id from params
	id := c.Param("id")

	// convert id string to objectid
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid ID"})
		return
	}

	// DEfine the filter
	filter := bson.M{"_id": objectId}

	// execute the find query and get a cursor over te results
	var result bson.M
	cursor := collection.FindOne(context.TODO(), filter)
	if err := cursor.Decode(&result); err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "not found bro"})
		return
	}
	// return the results as JSON
	c.IndentedJSON(http.StatusOK, result)
}

func createProduct(c *gin.Context, client *mongo.Client) {
	collection := client.Database("gin").Collection("products")

	// Create new product with body json
	var newProduct product
	if err := c.BindJSON(&newProduct); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := collection.InsertOne(context.TODO(), newProduct)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusCreated, gin.H{"insertedID": result.InsertedID})

}

func updateProduct(c *gin.Context, client *mongo.Client) {
	collection := client.Database("gin").Collection("products")

	// get the id
	id := c.Param("id")

	// convert id string to objectid
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid ID"})
		return
	}

	// DEfine the filter
	filter := bson.M{"_id": objectId}

	// Create new product with body json
	var updatedProduct product
	if err := c.BindJSON(&updatedProduct); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create the updated doc with $set operator
	update := bson.M{"$set": updatedProduct}

	// Get one
	var result bson.M
	options := options.FindOneAndUpdate().SetReturnDocument(options.After)
	cursor := collection.FindOneAndUpdate(context.TODO(), filter, update, options)
	if err := cursor.Decode(&result); err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "not found bro"})
		return
	}

	c.IndentedJSON(http.StatusCreated, gin.H{"updated": result})

}

func deleteProduct(c *gin.Context, client *mongo.Client) {
	collection := client.Database("gin").Collection("products")

	// get the id
	id := c.Param("id")

	// convert id string to objectid
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid ID"})
		return
	}

	// DEfine the filter
	filter := bson.M{"_id": objectId}

	// Get one
	var deletedDoc bson.M
	cursor := collection.FindOneAndDelete(context.TODO(), filter)
	if err := cursor.Decode(&deletedDoc); err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "not found bro"})
		return
	}

	c.IndentedJSON(http.StatusCreated, gin.H{"insertedID": deletedDoc})
}
