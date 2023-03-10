package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// Load dotenv variables
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("err loading: %v", err)
	}

	// Take mongo URI
	mongoURI := os.Getenv("MONGO_URI")

	// Set a timeout for context
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Connect to MONGODB
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		panic(err)
	}
	fmt.Println("Connected to MongoDB")
	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	// Initialize GIN router

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
