from django.db import models

# Create your models here.
class Example(models.Model):
	example_title = models.CharField(max_length=200)
	example_content = models.TextField()
	example_published = models.DateTimeField("data published")

	def __str__(self):
		return self.example_title
