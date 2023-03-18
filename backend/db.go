package main

import (
	"context"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB() (*mongo.Client, error) {
	// Load dotenv variables
	err := godotenv.Load()
	if err != nil {
		return nil, fmt.Errorf("an error ocurred loading evironment variables: %v", err)
	}

	// Take mongo URI
	mongoURI := os.Getenv("MONGO_URI")

	// Options
	clientOptions := options.Client().ApplyURI(mongoURI)

	// Connect to MONGODB
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return nil, fmt.Errorf("an error ocurred connecting to MongoDB: %v", err)
	}

	// If successfully connected
	fmt.Println("Connected to MongoDB")

	return client, nil
}
