from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):
    name = models.TextField()
    price = models.IntegerField()
    description = models.TextField()
    quantity = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Image(models.Model):
    path = models.TextField()
    name = models.TextField()
    product = models.ForeignKey("Product", on_delete=models.CASCADE)

# implement a Review class if there is time
# class Review(models.Model):
#     header = models.TextField()
#     body = models.TextField()
#     rating = models.IntegerField()
#     date = models.DateField()
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     product = models.ForeignKey("Product", on_delete=models.CASCADE)
