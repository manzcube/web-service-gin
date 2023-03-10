package main

import (
	"context"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb+srv://manzcube:v83mPIximiGPKnvL@cluster0.vlidjnr.mongodb.net/?retryWrites=true&w=majority"))
	if err != nil {
		panic(err)
	}
	fmt.Println("Connected to MongoDB")
	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	router := gin.Default()
	router.GET("/products", func(c *gin.Context) {
		getProducts(c, client)
	})
	router.GET("/products/:id", func(c *gin.Context) {
		getOneProduct(c, client)
	})
	router.POST("/products", func(c *gin.Context) {
		createProduct(c, client)
	})
	router.PUT("/products/:id", func(c *gin.Context) {
		updateProduct(c, client)
	})
	router.DELETE("/products/:id", func(c *gin.Context) {
		deleteProduct(c, client)
	})

	router.Run("localhost:8080")
}
