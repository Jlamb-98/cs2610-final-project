from django.shortcuts import render
from django.conf  import settings
import json
import os
import secrets
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpRequest
from .models import Product, Image
from pathlib import Path

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def products(req: HttpRequest):
    if req.method == "POST":
        name = req.POST.get('name')
        price = int(req.POST.get('price'))
        description = req.POST.get('description')
        quantity = int(req.POST.get('quantity'))

        # data validation
        if name == "":
            return JsonResponse({"success": False, "message": "No name provided"})
        if description == "":
            return JsonResponse({"success": False, "message": "No description provided"})
        if price < 1:
            return JsonResponse({"success": False, "message": "Price must be positive number"})
        if quantity < 1:
            return JsonResponse({"success": False, "message": "Quantity must be positive number"})

        # create product in database
        product = Product(
            name=name,
            price=price,
            description=description,
            quantity=quantity,
            user=req.user
        )
        product.save()

        # create image in database
        new_file_name = secrets.token_hex(16)
        extension = req.FILES["my_file"].name.split(".", maxsplit=1)[1]
        file_path = f"/product_images/{new_file_name}.{extension}"
        image = Image(
            name=req.FILES["my_file"].name,
            path=file_path,
            product=product
        )
        image.save()

        # save image to filesystem
        with open(f"{Path.cwd()}{file_path}", "ab+") as f:
            for chunk in req.FILES["my_file"].chunks():
                f.write(chunk)

        return JsonResponse({"success": True})

