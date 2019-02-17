from PIL import Image, ImageChops, ImageEnhance
import sys, os.path
import os
from pathlib import Path

def ela_image(path):
    filename = path
    cwd = path+"/media"
    # print(cwd)
    resaved =cwd + '/resaved.jpg'
    ela = '/ela.jpg'
    # print(cwd+'/media/'+filename)
    im = Image.open(cwd+"/image.jpg")
    im.save(resaved, 'JPEG', quality=95)
    resaved_im = Image.open(resaved)

    ela_im = ImageChops.difference(im, resaved_im)
    extrema = ela_im.getextrema()
    max_diff = max([ex[1] for ex in extrema])
    scale = 255.0/max_diff

    ela_im = ImageEnhance.Brightness(ela_im).enhance(scale)

    # cwd = os.getcwd()
    # os.chdir("..")
    # cwd = os.getcwd()
    print ("Maximum difference was %d" % (max_diff))
    ela_im.save(cwd+ ela)
    # ela_im.show()
# ela_image("home.jpg")

# from PIL import Image, ImageChops


# #ORIG = './books-edited.jpg'
# ORIG = 'horse_blur.jpg'
# TEMP = 'temp.jpg'
# SCALE = 10


# def ELA():
#     original = Image.open(ORIG)
#     original.save(TEMP, quality=90)
#     temporary = Image.open(TEMP)

#     diff = ImageChops.difference(original, temporary)
#     d = diff.load()
#     WIDTH, HEIGHT = diff.size
#     for x in range(WIDTH):
#         for y in range(HEIGHT):
#             d[x, y] = tuple(k * SCALE for k in d[x, y])

#     diff.show()

# if __name__ == '__main__':
#     ELA()
