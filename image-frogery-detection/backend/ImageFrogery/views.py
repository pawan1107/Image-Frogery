from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import json
from detection.meta import get_metadata_image
from detection.ela import ela_image
from detection.digest import get_digest_image
import os
from django.db import models
from django.core.files.storage import default_storage
import requests
import shutil
from PIL import Image
from PIL import ImageFile
from pathlib import Path


dirpath = str(Path().absolute())
path = str(Path().absolute())+"/media/image.jpg"
print(path)
# path = "/home/pawan/Project/frogery-react/image-frogery-detection/backend/media/image.jpg"

@api_view(['GET'])
def get_metadata(request):
   if request.method == 'GET':
    cwd = os.getcwd()+"/media/image.jpg"
    print(cwd)
    # path = "http://127.0.0.1:8000/media/image.jpg"
    metadata = get_metadata_image(path)
    print(metadata)
    # json_string = json.dumps(metadata)
    # print(metadata)
    # metadata = [{ "a": '123', "b": '1' },{ "a": 'cdd', 'b': 'edd'  },{ "a": '1333',"b": 'eee' }]

    return Response(metadata)
@api_view(['GET'])
def get_digest(request):
   if request.method == 'GET':
    cwd = os.getcwd()+"/media/image.jpg"
    # print(cwd)
    # path = "http://127.0.0.1:8000/media/image.jpg"
    metadata = get_digest_image(path)
    # print(metadata)
    # json_string = json.dumps(metadata)
    # print(metadata)
    # metadata = [{ "a": '123', "b": '1' },{ "a": 'cdd', 'b': 'edd'  },{ "a": '1333',"b": 'eee' }]

    return Response(metadata)

@api_view(['GET'])
def get_originalimg(request):
   if request.method == 'GET':
    return Response({'url': 'http://127.0.0.1:8000/media/image.jpg' })

@api_view(['GET'])
def get_ela(request):
   if request.method == 'GET':
    cwd = os.getcwd()
    ela_image(dirpath)
    return Response({'url': 'http://127.0.0.1:8000/media/ela.jpg' })

@api_view(['POST'])
def upload_image(request):
   if request.method == 'POST':
      img = request.FILES['image']
      # path = default_storage.save('tmp/somename.mp3', ContentFile(data.read()))
      # tmp_file = os.path.join(settings.MEDIA_ROOT, path)
      with default_storage.open(''+"image.jpg", 'wb+') as destination:
         for chunk in img.chunks():
            destination.write(chunk)
      return Response({})

@api_view(['POST'])
def upload_image_url(request):
   if request.method == 'POST':
      img = request.data['imageurl']
      r = requests.get(img, stream=True, headers={'User-agent': 'Mozilla/5.0'})
      cwd = os.getcwd()
      cwd+='/media/image.jpg'
      print(cwd)

      ImageFile.LOAD_TRUNCATED_IMAGES = True
      if r.status_code == 200:
          print("Success")
          with open(path, 'wb+') as f:
              r.raw.decode_content = True
              shutil.copyfileobj(r.raw, f)
              im = Image.open(path)
              rgb_im = im.convert('RGB')
              rgb_im.save(path)
      else:
          print("Failure")
      return Response({})
