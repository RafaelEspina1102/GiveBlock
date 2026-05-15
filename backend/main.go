package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"giveblock-backend/database"
	"giveblock-backend/handlers"
)

func main() {
	database.Connect()

	r := gin.Default()

	r.Use(cors.Default())

	r.POST("/campaigns", handlers.CreateCampaign)
	r.GET("/campaigns", handlers.GetCampaigns)

	r.Run(":8080")
}
