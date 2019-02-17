import json
import os, time
import hurry.filesize  as hurryfile
import hashlib
from PIL import Image


def get_md5(filename):
    h = hashlib.md5()
    b  = bytearray(128*1024)
    mv = memoryview(b)
    with open(filename, 'rb', buffering=0) as f:
        for n in iter(lambda : f.readinto(mv), 0):
            h.update(mv[:n])
    return h.hexdigest()


def get_sha256(filename):
    h  = hashlib.sha256()
    b  = bytearray(128*1024)
    mv = memoryview(b)
    with open(filename, 'rb', buffering=0) as f:
        for n in iter(lambda : f.readinto(mv), 0):
            h.update(mv[:n])
    return h.hexdigest()

def get_sha1(filename):
    h  = hashlib.sha1()
    b  = bytearray(128*1024)
    mv = memoryview(b)
    with open(filename, 'rb', buffering=0) as f:
        for n in iter(lambda : f.readinto(mv), 0):
            h.update(mv[:n])
    return h.hexdigest()

def get_digest_image(path):

    (mode, ino, dev, nlink, uid, gid, size, atime, mtime, ctime)  = os.stat(path)
    mtime = time.ctime(mtime)
    ctime = time.ctime(ctime)
    atime = time.ctime(atime)
    print(size)
    size = hurryfile.size(size, system=hurryfile.si)
    md5 = get_md5(path)
    # md5 = ""
    sha1 = get_sha1(path)
    sha256 = get_sha256(path)
    with Image.open(path) as img:
        width, height = img.size
    strdict = {"Size":size,"Dimension":str(width)+" X "+str(height),"Last modified":mtime,"Last modified Metadata":atime,\
    "Most recent access":atime,"MD5":md5,"SHA1":sha1,"SHA256":sha256}
    string = ""
    for key in  strdict:
        value = strdict[key]
        if value != "0" and (key != "Exif.Photo.MakerNote" or key != "Exif.Photo.PrintImageMatching"):
            string += '{"a":"'+key+'","b":"'+value+'"},'
    string = string.replace("\\", "/")
    string = "["+string[:-1]+"]"
    # print (string)
    return json.loads(string, strict=False)

# path = "/home/pawan/Project/frogery-react/image-frogery-detection/backend/media/image.jpg"
# print(get_digest_image(path))
