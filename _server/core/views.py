from django.shortcuts import render
from django.conf  import settings
import json
import os
import secrets
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpRequest
from .models import Product, Image

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
        body = json.loads(req.body)
        name = body["name"]
        price = int(body["price"])
        description = body["description"]
        quantity = int(body["quantity"])

        if name == "":
            return JsonResponse({"success": False, "message": "No name provided"})
        if price < 1:
            return JsonResponse({"success": False, "message": "Price must be positive number"})
        if description == "":
            return JsonResponse({"success": False, "message": "No description provided"})
        if quantity < 1:
            return JsonResponse({"success": False, "message": "Quantity must be positive number"})

        product = Product(
            name=name,
            price=price,
            description=description,
            quantity=quantity,
            user=req.user
        )
        product.save()

        return JsonResponse({"success": True})

@login_required
def images(req: HttpRequest):
    print(req.FILES["my_image"])
    new_image_name = secrets.token_hex(16)
    extension = req.FILES["my_image"].name.split(".", maxsplit=1)[1]
    file_path = f"/product_images/{new_image_name}.{extension}"
    image = Image(
        name=req.FILES["my_image"].name,
        path=file_path,
        # product=
    )
    return JsonResponse({"success": True})
