from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('products/', view=views.products, name="products"),
    path('images/', view=views.images, name="images"),
]