package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"giveblock-backend/database"
	"giveblock-backend/models"
)

func CreateCampaign(c *gin.Context) {
	var campaign models.Campaign

	if err := c.ShouldBindJSON(&campaign); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	query := `
	INSERT INTO campaigns(title, description)
	VALUES(?, ?)`

	_, err := database.DB.Exec(
		query,
		campaign.Title,
		campaign.Description,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Campaign created",
	})
}

func GetCampaigns(c *gin.Context) {
	rows, err := database.DB.Query(`
		SELECT id, title, description, created_at
		FROM campaigns
		ORDER BY created_at DESC
	`)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	defer rows.Close()

	var campaigns []models.Campaign

	for rows.Next() {
		var campaign models.Campaign

		err := rows.Scan(
			&campaign.ID,
			&campaign.Title,
			&campaign.Description,
			&campaign.CreatedAt,
		)

		if err != nil {
			continue
		}

		campaigns = append(campaigns, campaign)
	}

	c.JSON(http.StatusOK, campaigns)
}
