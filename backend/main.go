package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to DataBase
	client, err := ConnectDB()
	if err != nil {
		log.Printf("Error connecting to mongodb: %v", err)
	}

	// Create a context in order to disconnect
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	// Close connection
	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	// Set gin to release mode
	gin.SetMode(gin.ReleaseMode)

	// Initialize GIN router
	router := gin.Default()

	// Add CORS middleware
	router.Use(cors.Default())

	// Options
	router.ForwardedByClientIP = true
	router.SetTrustedProxies([]string{"127.0.0.1:3000"})

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

	// Comunicate
	fmt.Printf("GIN Server listening on port 8080\n")
	router.Run("localhost:8080")
}
